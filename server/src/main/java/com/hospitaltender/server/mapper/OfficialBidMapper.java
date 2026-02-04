package com.hospitaltender.server.mapper;

import com.hospitaltender.server.dto.request.CreateOfficialBidRequest;
import com.hospitaltender.server.dto.response.OfficialBidResponse;
import com.hospitaltender.server.entity.OfficialBid;
import com.hospitaltender.server.entity.Supplier;
import com.hospitaltender.server.entity.TenderItem;
import org.springframework.stereotype.Component;

@Component
public class OfficialBidMapper {

    public OfficialBid toEntity(CreateOfficialBidRequest request, TenderItem tenderItem, Supplier supplier) {
        OfficialBid bid = new OfficialBid();
        bid.setTenderItem(tenderItem);
        bid.setSupplier(supplier);
        bid.setBidPrice(request.getBidPrice());
        bid.setIsValid(true);
        bid.setIsWinningBid(false);
        return bid;
    }

    public OfficialBidResponse toResponse(OfficialBid bid) {
        return OfficialBidResponse.builder()
                .id(bid.getId())
                .tenderItemId(bid.getTenderItem().getId())
                .tenderItemName(bid.getTenderItem().getItemName())
                .supplierId(bid.getSupplier().getId())
                .supplierName(bid.getSupplier().getCompanyName())
                .bidPrice(bid.getBidPrice())
                .isValid(bid.getIsValid())
                .isWinningBid(bid.getIsWinningBid())
                .rejectionReason(bid.getRejectionReason())
                .createdAt(bid.getCreatedAt())
                .build();
    }
}
