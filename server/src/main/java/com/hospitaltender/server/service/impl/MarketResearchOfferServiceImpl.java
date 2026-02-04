package com.hospitaltender.server.service.impl;

import com.hospitaltender.server.dto.request.CreateMarketResearchOfferRequest;
import com.hospitaltender.server.dto.request.UpdateMarketResearchOfferRequest;
import com.hospitaltender.server.dto.response.MarketResearchOfferResponse;
import com.hospitaltender.server.entity.MarketResearchOffer;
import com.hospitaltender.server.entity.Supplier;
import com.hospitaltender.server.entity.TenderItem;
import com.hospitaltender.server.exception.ResourceNotFoundException;
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
                .orElseThrow(() -> new ResourceNotFoundException("TenderItem", request.getTenderItemId()));

        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier", request.getSupplierId()));

        MarketResearchOffer offer = offerMapper.toEntity(request, tenderItem, supplier);
        MarketResearchOffer savedOffer = offerRepository.save(offer);

        calculateAndUpdateApproximateCost(request.getTenderItemId());

        return offerMapper.toResponse(savedOffer);
    }

    @Override
    @Transactional(readOnly = true)
    public MarketResearchOfferResponse getById(Long id) {
        MarketResearchOffer offer = offerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MarketResearchOffer", id));
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
                .orElseThrow(() -> new ResourceNotFoundException("MarketResearchOffer", id));

        Long tenderItemId = offer.getTenderItem().getId();
        offerMapper.updateEntity(offer, request);
        MarketResearchOffer updatedOffer = offerRepository.save(offer);

        calculateAndUpdateApproximateCost(tenderItemId);

        return offerMapper.toResponse(updatedOffer);
    }

    @Override
    public void delete(Long id) {
        MarketResearchOffer offer = offerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MarketResearchOffer", id));

        Long tenderItemId = offer.getTenderItem().getId();
        offerRepository.deleteById(id);

        calculateAndUpdateApproximateCost(tenderItemId);
    }

    @Override
    public BigDecimal calculateAndUpdateApproximateCost(Long tenderItemId) {
        TenderItem tenderItem = tenderItemRepository.findById(tenderItemId)
                .orElseThrow(() -> new ResourceNotFoundException("TenderItem", tenderItemId));

        BigDecimal averagePrice = offerRepository.calculateAveragePrice(tenderItemId);

        if (averagePrice != null) {
            averagePrice = averagePrice.setScale(2, RoundingMode.HALF_UP);
            tenderItem.setApproximateUnitCost(averagePrice);
        } else {
            tenderItem.setApproximateUnitCost(null);
        }
        tenderItemRepository.save(tenderItem);

        return averagePrice;
    }
}
