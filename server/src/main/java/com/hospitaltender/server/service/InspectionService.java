package com.hospitaltender.server.service;

import com.hospitaltender.server.dto.request.CreateInspectionRequest;
import com.hospitaltender.server.dto.request.UpdateInspectionRequest;
import com.hospitaltender.server.dto.response.InspectionResponse;
import com.hospitaltender.server.enums.InspectionStatus;

import java.util.List;

public interface InspectionService {

    InspectionResponse create(CreateInspectionRequest request);

    InspectionResponse getById(Long id);

    List<InspectionResponse> getByTenderId(Long tenderId);

    List<InspectionResponse> getByStatus(InspectionStatus status);

    InspectionResponse update(Long id, UpdateInspectionRequest request);

    InspectionResponse updateStatus(Long id, InspectionStatus status);

    void delete(Long id);
}
