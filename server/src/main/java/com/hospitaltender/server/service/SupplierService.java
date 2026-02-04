package com.hospitaltender.server.service;

import com.hospitaltender.server.dto.request.CreateSupplierRequest;
import com.hospitaltender.server.dto.request.UpdateSupplierRequest;
import com.hospitaltender.server.dto.response.SupplierResponse;

import java.util.List;

public interface SupplierService {

    SupplierResponse create(CreateSupplierRequest request);

    SupplierResponse getById(Long id);

    List<SupplierResponse> getAll();

    List<SupplierResponse> getActiveSuppliers();

    SupplierResponse update(Long id, UpdateSupplierRequest request);

    void delete(Long id);
}
