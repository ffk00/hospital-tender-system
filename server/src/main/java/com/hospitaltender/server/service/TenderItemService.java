package com.hospitaltender.server.service;

import com.hospitaltender.server.dto.request.CreateTenderItemRequest;
import com.hospitaltender.server.dto.request.UpdateTenderItemRequest;
import com.hospitaltender.server.dto.response.TenderItemResponse;

import java.util.List;

public interface TenderItemService {

    TenderItemResponse create(CreateTenderItemRequest request);

    TenderItemResponse getById(Long id);

    List<TenderItemResponse> getByTenderId(Long tenderId);

    TenderItemResponse update(Long id, UpdateTenderItemRequest request);

    void delete(Long id);
}
