package com.hospitaltender.server.mapper;

import com.hospitaltender.server.dto.request.CreateTenderRequest;
import com.hospitaltender.server.dto.request.UpdateTenderRequest;
import com.hospitaltender.server.dto.response.TenderResponse;
import com.hospitaltender.server.entity.Tender;
import com.hospitaltender.server.enums.TenderStatus;
import org.springframework.stereotype.Component;

@Component
public class TenderMapper {

    public Tender toEntity(CreateTenderRequest request) {
        Tender tender = new Tender();
        tender.setRegistrationNumber(request.getRegistrationNumber());
        tender.setApprovalNumber(request.getApprovalNumber());
        tender.setTitle(request.getTitle());
        tender.setDescription(request.getDescription());
        tender.setMethod(request.getMethod());
        tender.setStatus(TenderStatus.DRAFT);
        tender.setApprovalDate(request.getApprovalDate());
        tender.setMarketResearchDate(request.getMarketResearchDate());
        tender.setTenderDate(request.getTenderDate());
        tender.setContractDate(request.getContractDate());
        tender.setContractEndDate(request.getContractEndDate());
        return tender;
    }

    public void updateEntity(Tender tender, UpdateTenderRequest request) {
        if (request.getRegistrationNumber() != null) {
            tender.setRegistrationNumber(request.getRegistrationNumber());
        }
        if (request.getApprovalNumber() != null) {
            tender.setApprovalNumber(request.getApprovalNumber());
        }
        if (request.getTitle() != null) {
            tender.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            tender.setDescription(request.getDescription());
        }
        if (request.getMethod() != null) {
            tender.setMethod(request.getMethod());
        }
        if (request.getStatus() != null) {
            tender.setStatus(request.getStatus());
        }
        if (request.getApprovalDate() != null) {
            tender.setApprovalDate(request.getApprovalDate());
        }
        if (request.getMarketResearchDate() != null) {
            tender.setMarketResearchDate(request.getMarketResearchDate());
        }
        if (request.getTenderDate() != null) {
            tender.setTenderDate(request.getTenderDate());
        }
        if (request.getContractDate() != null) {
            tender.setContractDate(request.getContractDate());
        }
        if (request.getContractEndDate() != null) {
            tender.setContractEndDate(request.getContractEndDate());
        }
    }

    public TenderResponse toResponse(Tender tender) {
        return TenderResponse.builder()
                .id(tender.getId())
                .registrationNumber(tender.getRegistrationNumber())
                .approvalNumber(tender.getApprovalNumber())
                .title(tender.getTitle())
                .description(tender.getDescription())
                .method(tender.getMethod())
                .status(tender.getStatus())
                .approvalDate(tender.getApprovalDate())
                .marketResearchDate(tender.getMarketResearchDate())
                .tenderDate(tender.getTenderDate())
                .contractDate(tender.getContractDate())
                .contractEndDate(tender.getContractEndDate())
                .createdAt(tender.getCreatedAt())
                .updatedAt(tender.getUpdatedAt())
                .itemCount(tender.getItems() != null ? tender.getItems().size() : 0)
                .commissionMemberCount(tender.getCommissionMembers() != null ? tender.getCommissionMembers().size() : 0)
                .build();
    }
}
