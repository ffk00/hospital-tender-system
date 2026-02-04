package com.hospitaltender.server.mapper;

import com.hospitaltender.server.dto.request.CreateTenderItemRequest;
import com.hospitaltender.server.dto.request.UpdateTenderItemRequest;
import com.hospitaltender.server.dto.response.TenderItemResponse;
import com.hospitaltender.server.entity.Tender;
import com.hospitaltender.server.entity.TenderItem;
import org.springframework.stereotype.Component;

@Component
public class TenderItemMapper {

    public TenderItem toEntity(CreateTenderItemRequest request, Tender tender) {
        TenderItem item = new TenderItem();
        item.setTender(tender);
        item.setItemName(request.getItemName());
        item.setQuantity(request.getQuantity());
        item.setUnit(request.getUnit());
        item.setSpecifications(request.getSpecifications());
        return item;
    }

    public void updateEntity(TenderItem item, UpdateTenderItemRequest request) {
        if (request.getItemName() != null) {
            item.setItemName(request.getItemName());
        }
        if (request.getQuantity() != null) {
            item.setQuantity(request.getQuantity());
        }
        if (request.getUnit() != null) {
            item.setUnit(request.getUnit());
        }
        if (request.getSpecifications() != null) {
            item.setSpecifications(request.getSpecifications());
        }
    }

    public TenderItemResponse toResponse(TenderItem item) {
        return TenderItemResponse.builder()
                .id(item.getId())
                .tenderId(item.getTender().getId())
                .itemName(item.getItemName())
                .quantity(item.getQuantity())
                .unit(item.getUnit())
                .approximateUnitCost(item.getApproximateUnitCost())
                .specifications(item.getSpecifications())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .marketResearchOfferCount(item.getMarketResearchOffers() != null ? item.getMarketResearchOffers().size() : 0)
                .officialBidCount(item.getOfficialBids() != null ? item.getOfficialBids().size() : 0)
                .build();
    }
}
