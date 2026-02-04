package com.hospitaltender.server.service.impl;

import com.hospitaltender.server.dto.request.CreateMarketResearchOfferRequest;
import com.hospitaltender.server.dto.request.UpdateMarketResearchOfferRequest;
import com.hospitaltender.server.dto.response.MarketResearchOfferResponse;
import com.hospitaltender.server.entity.MarketResearchOffer;
import com.hospitaltender.server.entity.Supplier;
import com.hospitaltender.server.entity.TenderItem;
import com.hospitaltender.server.mapper.MarketResearchOfferMapper;
import com.hospitaltender.server.repository.MarketResearchOfferRepository;
import com.hospitaltender.server.repository.SupplierRepository;
import com.hospitaltender.server.repository.TenderItemRepository;
import com.hospitaltender.server.service.MarketResearchOfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MarketResearchOfferServiceImpl implements MarketResearchOfferService {

    private final MarketResearchOfferRepository offerRepository;
    private final TenderItemRepository tenderItemRepository;
    private final SupplierRepository supplierRepository;
    private final MarketResearchOfferMapper offerMapper;

    @Override
    public MarketResearchOfferResponse create(CreateMarketResearchOfferRequest request) {
        TenderItem tenderItem = tenderItemRepository.findById(request.getTenderItemId())
                .orElseThrow(() -> new RuntimeException("Tender item not found with id: " + request.getTenderItemId()));

        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + request.getSupplierId()));

        // Check if supplier is blacklisted
        if (Boolean.TRUE.equals(supplier.getIsBlacklisted())) {
            throw new RuntimeException("Cannot add offer from blacklisted supplier: " + supplier.getCompanyName());
        }

        MarketResearchOffer offer = offerMapper.toEntity(request, tenderItem, supplier);
        MarketResearchOffer savedOffer = offerRepository.save(offer);

        // Automatically recalculate approximate cost after adding new offer
        calculateAndUpdateApproximateCost(request.getTenderItemId());

        return offerMapper.toResponse(savedOffer);
    }

    @Override
    @Transactional(readOnly = true)
    public MarketResearchOfferResponse getById(Long id) {
        MarketResearchOffer offer = offerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Market research offer not found with id: " + id));
        return offerMapper.toResponse(offer);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MarketResearchOfferResponse> getByTenderItemId(Long tenderItemId) {
        return offerRepository.findByTenderItemId(tenderItemId)
                .stream()
                .map(offerMapper::toResponse)
                .toList();
    }

    @Override
    public MarketResearchOfferResponse update(Long id, UpdateMarketResearchOfferRequest request) {
        MarketResearchOffer offer = offerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Market research offer not found with id: " + id));

        Long tenderItemId = offer.getTenderItem().getId();
        offerMapper.updateEntity(offer, request);
        MarketResearchOffer updatedOffer = offerRepository.save(offer);

        // Recalculate approximate cost after update
        calculateAndUpdateApproximateCost(tenderItemId);

        return offerMapper.toResponse(updatedOffer);
    }

    @Override
    public void delete(Long id) {
        MarketResearchOffer offer = offerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Market research offer not found with id: " + id));

        Long tenderItemId = offer.getTenderItem().getId();
        offerRepository.deleteById(id);

        // Recalculate approximate cost after deletion
        calculateAndUpdateApproximateCost(tenderItemId);
    }

    @Override
    public BigDecimal calculateAndUpdateApproximateCost(Long tenderItemId) {
        TenderItem tenderItem = tenderItemRepository.findById(tenderItemId)
                .orElseThrow(() -> new RuntimeException("Tender item not found with id: " + tenderItemId));

        BigDecimal averagePrice = offerRepository.calculateAveragePrice(tenderItemId);

        if (averagePrice != null) {
            // Round to 2 decimal places
            averagePrice = averagePrice.setScale(2, RoundingMode.HALF_UP);
            tenderItem.setApproximateUnitCost(averagePrice);
            tenderItemRepository.save(tenderItem);
        } else {
            // No offers, set to null
            tenderItem.setApproximateUnitCost(null);
            tenderItemRepository.save(tenderItem);
        }

        return averagePrice;
    }
}
