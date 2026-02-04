package com.hospitaltender.server.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class CreateMarketResearchOfferRequest {

    private Long tenderItemId;
    private Long supplierId;
    private BigDecimal offeredPrice;
    private LocalDate offerDate;
    private String notes;
}
