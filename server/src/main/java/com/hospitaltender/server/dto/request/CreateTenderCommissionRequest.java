package com.hospitaltender.server.dto.request;

import com.hospitaltender.server.enums.CommissionRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTenderCommissionRequest {

    private Long tenderId;
    private Long userId;
    private CommissionRole role;
}
