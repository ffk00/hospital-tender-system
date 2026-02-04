package com.hospitaltender.server.service.impl;

import com.hospitaltender.server.dto.request.CreateTenderRequest;
import com.hospitaltender.server.dto.request.UpdateTenderRequest;
import com.hospitaltender.server.dto.response.TenderResponse;
import com.hospitaltender.server.entity.Tender;
import com.hospitaltender.server.enums.TenderStatus;
import com.hospitaltender.server.mapper.TenderMapper;
import com.hospitaltender.server.repository.TenderRepository;
import com.hospitaltender.server.service.TenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TenderServiceImpl implements TenderService {

    private final TenderRepository tenderRepository;
    private final TenderMapper tenderMapper;

    @Override
    public TenderResponse create(CreateTenderRequest request) {
        Tender tender = tenderMapper.toEntity(request);
        Tender savedTender = tenderRepository.save(tender);
        return tenderMapper.toResponse(savedTender);
    }

    @Override
    @Transactional(readOnly = true)
    public TenderResponse getById(Long id) {
        Tender tender = tenderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tender not found with id: " + id));
        return tenderMapper.toResponse(tender);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TenderResponse> getAll() {
        return tenderRepository.findAll()
                .stream()
                .map(tenderMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TenderResponse> getByStatus(TenderStatus status) {
        return tenderRepository.findByStatus(status)
                .stream()
                .map(tenderMapper::toResponse)
                .toList();
    }

    @Override
    public TenderResponse update(Long id, UpdateTenderRequest request) {
        Tender tender = tenderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tender not found with id: " + id));
        tenderMapper.updateEntity(tender, request);
        Tender updatedTender = tenderRepository.save(tender);
        return tenderMapper.toResponse(updatedTender);
    }

    @Override
    public TenderResponse updateStatus(Long id, TenderStatus status) {
        Tender tender = tenderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tender not found with id: " + id));
        tender.setStatus(status);
        Tender updatedTender = tenderRepository.save(tender);
        return tenderMapper.toResponse(updatedTender);
    }

    @Override
    public void delete(Long id) {
        if (!tenderRepository.existsById(id)) {
            throw new RuntimeException("Tender not found with id: " + id);
        }
        tenderRepository.deleteById(id);
    }
}
