package com.hospitaltender.server.dto.response;

import com.hospitaltender.server.enums.CommissionRole;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class TenderCommissionResponse {

    private Long id;
    private Long tenderId;
    private Long userId;
    private String userFullName;
    private String userTitle;
    private CommissionRole role;
    private LocalDateTime createdAt;
}
