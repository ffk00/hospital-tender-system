package com.hospitaltender.server.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CreateOfficialBidRequest {

    private Long tenderItemId;
    private Long supplierId;
    private BigDecimal bidPrice;
}
