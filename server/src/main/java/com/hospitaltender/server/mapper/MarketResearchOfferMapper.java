package com.hospitaltender.server.mapper;

import com.hospitaltender.server.dto.request.CreateMarketResearchOfferRequest;
import com.hospitaltender.server.dto.request.UpdateMarketResearchOfferRequest;
import com.hospitaltender.server.dto.response.MarketResearchOfferResponse;
import com.hospitaltender.server.entity.MarketResearchOffer;
import com.hospitaltender.server.entity.Supplier;
import com.hospitaltender.server.entity.TenderItem;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class MarketResearchOfferMapper {

    public MarketResearchOffer toEntity(CreateMarketResearchOfferRequest request, TenderItem tenderItem, Supplier supplier) {
        MarketResearchOffer offer = new MarketResearchOffer();
        offer.setTenderItem(tenderItem);
        offer.setSupplier(supplier);
        offer.setOfferedPrice(request.getOfferedPrice());
        offer.setOfferDate(request.getOfferDate() != null ? request.getOfferDate() : LocalDate.now());
        offer.setNotes(request.getNotes());
        return offer;
    }

    public void updateEntity(MarketResearchOffer offer, UpdateMarketResearchOfferRequest request) {
        if (request.getOfferedPrice() != null) {
            offer.setOfferedPrice(request.getOfferedPrice());
        }
        if (request.getOfferDate() != null) {
            offer.setOfferDate(request.getOfferDate());
        }
        if (request.getNotes() != null) {
            offer.setNotes(request.getNotes());
        }
    }

    public MarketResearchOfferResponse toResponse(MarketResearchOffer offer) {
        return MarketResearchOfferResponse.builder()
                .id(offer.getId())
                .tenderItemId(offer.getTenderItem().getId())
                .tenderItemName(offer.getTenderItem().getItemName())
                .supplierId(offer.getSupplier().getId())
                .supplierName(offer.getSupplier().getCompanyName())
                .offeredPrice(offer.getOfferedPrice())
                .offerDate(offer.getOfferDate())
                .notes(offer.getNotes())
                .createdAt(offer.getCreatedAt())
                .build();
    }
}
