package com.hospitaltender.server.service.impl;

import com.hospitaltender.server.dto.request.CreateOfficialBidRequest;
import com.hospitaltender.server.dto.response.OfficialBidResponse;
import com.hospitaltender.server.entity.OfficialBid;
import com.hospitaltender.server.entity.Supplier;
import com.hospitaltender.server.entity.TenderItem;
import com.hospitaltender.server.mapper.OfficialBidMapper;
import com.hospitaltender.server.repository.OfficialBidRepository;
import com.hospitaltender.server.repository.SupplierRepository;
import com.hospitaltender.server.repository.TenderItemRepository;
import com.hospitaltender.server.service.OfficialBidService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OfficialBidServiceImpl implements OfficialBidService {

    private final OfficialBidRepository bidRepository;
    private final TenderItemRepository tenderItemRepository;
    private final SupplierRepository supplierRepository;
    private final OfficialBidMapper bidMapper;

    @Override
    public OfficialBidResponse create(CreateOfficialBidRequest request) {
        TenderItem tenderItem = tenderItemRepository.findById(request.getTenderItemId())
                .orElseThrow(() -> new RuntimeException("Tender item not found with id: " + request.getTenderItemId()));

        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + request.getSupplierId()));

        // Check if supplier is blacklisted
        if (Boolean.TRUE.equals(supplier.getIsBlacklisted())) {
            throw new RuntimeException("Cannot accept bid from blacklisted supplier: " + supplier.getCompanyName());
        }

        // Check if supplier already has a bid for this item
        if (bidRepository.existsByTenderItemIdAndSupplierId(request.getTenderItemId(), request.getSupplierId())) {
            throw new RuntimeException("Supplier already has a bid for this tender item");
        }

        OfficialBid bid = bidMapper.toEntity(request, tenderItem, supplier);
        OfficialBid savedBid = bidRepository.save(bid);
        return bidMapper.toResponse(savedBid);
    }

    @Override
    @Transactional(readOnly = true)
    public OfficialBidResponse getById(Long id) {
        OfficialBid bid = bidRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Official bid not found with id: " + id));
        return bidMapper.toResponse(bid);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OfficialBidResponse> getByTenderItemId(Long tenderItemId) {
        return bidRepository.findByTenderItemId(tenderItemId)
                .stream()
                .map(bidMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<OfficialBidResponse> getValidBidsByTenderItemId(Long tenderItemId) {
        return bidRepository.findByTenderItemIdAndIsValidTrue(tenderItemId)
                .stream()
                .map(bidMapper::toResponse)
                .toList();
    }

    @Override
    public void delete(Long id) {
        if (!bidRepository.existsById(id)) {
            throw new RuntimeException("Official bid not found with id: " + id);
        }
        bidRepository.deleteById(id);
    }

    @Override
    public OfficialBidResponse evaluateBids(Long tenderItemId) {
        TenderItem tenderItem = tenderItemRepository.findById(tenderItemId)
                .orElseThrow(() -> new RuntimeException("Tender item not found with id: " + tenderItemId));

        BigDecimal approximateCost = tenderItem.getApproximateUnitCost();
        if (approximateCost == null) {
            throw new RuntimeException("Approximate cost not set for tender item. Please complete market research first.");
        }

        List<OfficialBid> bids = bidRepository.findByTenderItemId(tenderItemId);
        if (bids.isEmpty()) {
            throw new RuntimeException("No bids found for tender item with id: " + tenderItemId);
        }

        // Reset all bids - clear previous evaluation
        for (OfficialBid bid : bids) {
            bid.setIsWinningBid(false);
            // Don't reset isValid and rejectionReason for manually rejected bids
        }

        // Step 1: Reject bids that exceed approximate cost (if not already manually rejected)
        for (OfficialBid bid : bids) {
            if (Boolean.TRUE.equals(bid.getIsValid()) && bid.getBidPrice().compareTo(approximateCost) > 0) {
                bid.setIsValid(false);
                bid.setRejectionReason("Bid price exceeds approximate cost (Tavan Fiyat)");
            }
        }

        // Step 2: Find the lowest valid bid
        OfficialBid winningBid = bids.stream()
                .filter(bid -> Boolean.TRUE.equals(bid.getIsValid()))
                .min(Comparator.comparing(OfficialBid::getBidPrice))
                .orElse(null);

        if (winningBid == null) {
            bidRepository.saveAll(bids);
            throw new RuntimeException("No valid bids remaining after evaluation. All bids exceed the approximate cost.");
        }

        // Step 3: Mark the winner
        winningBid.setIsWinningBid(true);
        bidRepository.saveAll(bids);

        return bidMapper.toResponse(winningBid);
    }

    @Override
    public OfficialBidResponse rejectBid(Long bidId, String reason) {
        OfficialBid bid = bidRepository.findById(bidId)
                .orElseThrow(() -> new RuntimeException("Official bid not found with id: " + bidId));

        bid.setIsValid(false);
        bid.setIsWinningBid(false);
        bid.setRejectionReason(reason);

        OfficialBid updatedBid = bidRepository.save(bid);
        return bidMapper.toResponse(updatedBid);
    }
}
