package com.hospitaltender.server.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateSupplierRequest {

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
}
