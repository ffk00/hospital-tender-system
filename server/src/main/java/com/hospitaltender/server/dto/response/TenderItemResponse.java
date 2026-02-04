package com.hospitaltender.server.dto.response;

import com.hospitaltender.server.enums.UnitType;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class TenderItemResponse {

    private Long id;
    private Long tenderId;
    private String itemName;
    private BigDecimal quantity;
    private UnitType unit;
    private BigDecimal approximateUnitCost;
    private String specifications;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Summary counts
    private int marketResearchOfferCount;
    private int officialBidCount;
}
