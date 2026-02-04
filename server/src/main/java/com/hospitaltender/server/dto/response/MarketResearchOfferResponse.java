package com.hospitaltender.server.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class MarketResearchOfferResponse {

    private Long id;
    private Long tenderItemId;
    private String tenderItemName;
    private Long supplierId;
    private String supplierName;
    private BigDecimal offeredPrice;
    private LocalDate offerDate;
    private String notes;
    private LocalDateTime createdAt;
}
