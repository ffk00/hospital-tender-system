package com.hospitaltender.server.mapper;

import com.hospitaltender.server.dto.request.CreateTenderCommissionRequest;
import com.hospitaltender.server.dto.response.TenderCommissionResponse;
import com.hospitaltender.server.entity.Tender;
import com.hospitaltender.server.entity.TenderCommission;
import com.hospitaltender.server.entity.User;
import org.springframework.stereotype.Component;

@Component
public class TenderCommissionMapper {

    public TenderCommission toEntity(CreateTenderCommissionRequest request, Tender tender, User user) {
        TenderCommission commission = new TenderCommission();
        commission.setTender(tender);
        commission.setUser(user);
        commission.setRole(request.getRole());
        return commission;
    }

    public TenderCommissionResponse toResponse(TenderCommission commission) {
        User user = commission.getUser();
        String fullName = user.getFirstName() + " " + user.getLastName();

        return TenderCommissionResponse.builder()
                .id(commission.getId())
                .tenderId(commission.getTender().getId())
                .userId(user.getId())
                .userFullName(fullName)
                .userTitle(user.getTitle())
                .tenderTitle(commission.getTender().getTitle())
                .role(commission.getRole())
                .createdAt(commission.getCreatedAt())
                .build();
    }
}
