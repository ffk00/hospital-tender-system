package com.hospitaltender.server.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class SupplierResponse {

    private Long id;
    private String companyName;
    private String taxNumber;
    private String taxOffice;

    // Bank Information
    private String bankName;
    private String bankBranch;
    private String iban;

    // Contact Information
    private String contactName;
    private String phone;
    private String email;
    private String address;

    private Boolean isBlacklisted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
