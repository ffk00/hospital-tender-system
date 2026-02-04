package com.hospitaltender.server.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class OfficialBidResponse {

    private Long id;
    private Long tenderItemId;
    private String tenderItemName;
    private Long supplierId;
    private String supplierName;
    private BigDecimal bidPrice;
    private Boolean isValid;
    private Boolean isWinningBid;
    private String rejectionReason;
    private LocalDateTime createdAt;
}
