package com.hospitaltender.server.dto.request;

import com.hospitaltender.server.enums.UnitType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class UpdateTenderItemRequest {

    private String itemName;
    private BigDecimal quantity;
    private UnitType unit;
    private String specifications;
}
