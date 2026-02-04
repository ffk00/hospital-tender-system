package com.hospitaltender.server.service;

import com.hospitaltender.server.dto.request.CreateTenderRequest;
import com.hospitaltender.server.dto.request.UpdateTenderRequest;
import com.hospitaltender.server.dto.response.TenderResponse;
import com.hospitaltender.server.enums.TenderStatus;

import java.util.List;

public interface TenderService {

    TenderResponse create(CreateTenderRequest request);

    TenderResponse getById(Long id);

    List<TenderResponse> getAll();

    List<TenderResponse> getByStatus(TenderStatus status);

    TenderResponse update(Long id, UpdateTenderRequest request);

    TenderResponse updateStatus(Long id, TenderStatus status);

    void delete(Long id);
}
