package com.hospitaltender.server.service;

import com.hospitaltender.server.dto.request.CreateTenderCommissionRequest;
import com.hospitaltender.server.dto.response.TenderCommissionResponse;

import java.util.List;

public interface TenderCommissionService {

    TenderCommissionResponse addMember(CreateTenderCommissionRequest request);

    List<TenderCommissionResponse> getByTenderId(Long tenderId);

    List<TenderCommissionResponse> getByUserId(Long userId);

    void removeMember(Long id);
}
