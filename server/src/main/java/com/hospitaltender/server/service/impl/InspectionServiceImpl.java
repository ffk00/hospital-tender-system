package com.hospitaltender.server.service.impl;

import com.hospitaltender.server.dto.request.CreateInspectionRequest;
import com.hospitaltender.server.dto.request.UpdateInspectionRequest;
import com.hospitaltender.server.dto.response.InspectionResponse;
import com.hospitaltender.server.entity.Inspection;
import com.hospitaltender.server.entity.Supplier;
import com.hospitaltender.server.entity.Tender;
import com.hospitaltender.server.enums.InspectionStatus;
import com.hospitaltender.server.exception.ResourceNotFoundException;
import com.hospitaltender.server.mapper.InspectionMapper;
import com.hospitaltender.server.repository.InspectionRepository;
import com.hospitaltender.server.repository.SupplierRepository;
import com.hospitaltender.server.repository.TenderRepository;
import com.hospitaltender.server.service.InspectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class InspectionServiceImpl implements InspectionService {

    private final InspectionRepository inspectionRepository;
    private final TenderRepository tenderRepository;
    private final SupplierRepository supplierRepository;
    private final InspectionMapper inspectionMapper;

    @Override
    public InspectionResponse create(CreateInspectionRequest request) {
        Tender tender = tenderRepository.findById(request.getTenderId())
                .orElseThrow(() -> new ResourceNotFoundException("Tender", request.getTenderId()));

        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier", request.getSupplierId()));

        Inspection inspection = inspectionMapper.toEntity(request, tender, supplier);
        Inspection savedInspection = inspectionRepository.save(inspection);
        return inspectionMapper.toResponse(savedInspection);
    }

    @Override
    @Transactional(readOnly = true)
    public InspectionResponse getById(Long id) {
        Inspection inspection = inspectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inspection", id));
        return inspectionMapper.toResponse(inspection);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InspectionResponse> getByTenderId(Long tenderId) {
        return inspectionRepository.findByTenderId(tenderId)
                .stream()
                .map(inspectionMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<InspectionResponse> getByStatus(InspectionStatus status) {
        return inspectionRepository.findByStatus(status)
                .stream()
                .map(inspectionMapper::toResponse)
                .toList();
    }

    @Override
    public InspectionResponse update(Long id, UpdateInspectionRequest request) {
        Inspection inspection = inspectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inspection", id));
        inspectionMapper.updateEntity(inspection, request);
        Inspection updatedInspection = inspectionRepository.save(inspection);
        return inspectionMapper.toResponse(updatedInspection);
    }

    @Override
    public InspectionResponse updateStatus(Long id, InspectionStatus status) {
        Inspection inspection = inspectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inspection", id));
        inspection.setStatus(status);
        Inspection updatedInspection = inspectionRepository.save(inspection);
        return inspectionMapper.toResponse(updatedInspection);
    }

    @Override
    public void delete(Long id) {
        if (!inspectionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Inspection", id);
        }
        inspectionRepository.deleteById(id);
    }
}
