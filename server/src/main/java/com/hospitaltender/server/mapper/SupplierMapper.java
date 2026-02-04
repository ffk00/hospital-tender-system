package com.hospitaltender.server.mapper;

import com.hospitaltender.server.dto.request.CreateSupplierRequest;
import com.hospitaltender.server.dto.request.UpdateSupplierRequest;
import com.hospitaltender.server.dto.response.SupplierResponse;
import com.hospitaltender.server.entity.Supplier;
import org.springframework.stereotype.Component;

@Component
public class SupplierMapper {

    public Supplier toEntity(CreateSupplierRequest request) {
        Supplier supplier = new Supplier();
        supplier.setCompanyName(request.getCompanyName());
        supplier.setTaxNumber(request.getTaxNumber());
        supplier.setTaxOffice(request.getTaxOffice());
        supplier.setBankName(request.getBankName());
        supplier.setBankBranch(request.getBankBranch());
        supplier.setIban(request.getIban());
        supplier.setContactName(request.getContactName());
        supplier.setPhone(request.getPhone());
        supplier.setEmail(request.getEmail());
        supplier.setAddress(request.getAddress());
        return supplier;
    }

    public void updateEntity(Supplier supplier, UpdateSupplierRequest request) {
        if (request.getCompanyName() != null) {
            supplier.setCompanyName(request.getCompanyName());
        }
        if (request.getTaxNumber() != null) {
            supplier.setTaxNumber(request.getTaxNumber());
        }
        if (request.getTaxOffice() != null) {
            supplier.setTaxOffice(request.getTaxOffice());
        }
        if (request.getBankName() != null) {
            supplier.setBankName(request.getBankName());
        }
        if (request.getBankBranch() != null) {
            supplier.setBankBranch(request.getBankBranch());
        }
        if (request.getIban() != null) {
            supplier.setIban(request.getIban());
        }
        if (request.getContactName() != null) {
            supplier.setContactName(request.getContactName());
        }
        if (request.getPhone() != null) {
            supplier.setPhone(request.getPhone());
        }
        if (request.getEmail() != null) {
            supplier.setEmail(request.getEmail());
        }
        if (request.getAddress() != null) {
            supplier.setAddress(request.getAddress());
        }
    }

    public SupplierResponse toResponse(Supplier supplier) {
        return SupplierResponse.builder()
                .id(supplier.getId())
                .companyName(supplier.getCompanyName())
                .taxNumber(supplier.getTaxNumber())
                .taxOffice(supplier.getTaxOffice())
                .bankName(supplier.getBankName())
                .bankBranch(supplier.getBankBranch())
                .iban(supplier.getIban())
                .contactName(supplier.getContactName())
                .phone(supplier.getPhone())
                .email(supplier.getEmail())
                .address(supplier.getAddress())
                .createdAt(supplier.getCreatedAt())
                .updatedAt(supplier.getUpdatedAt())
                .build();
    }
}
