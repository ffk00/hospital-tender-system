package com.hospitaltender.server.service.impl;

import com.hospitaltender.server.dto.request.CreateTenderItemRequest;
import com.hospitaltender.server.dto.request.UpdateTenderItemRequest;
import com.hospitaltender.server.dto.response.TenderItemResponse;
import com.hospitaltender.server.entity.Tender;
import com.hospitaltender.server.entity.TenderItem;
import com.hospitaltender.server.exception.ResourceNotFoundException;
import com.hospitaltender.server.mapper.TenderItemMapper;
import com.hospitaltender.server.repository.TenderItemRepository;
import com.hospitaltender.server.repository.TenderRepository;
import com.hospitaltender.server.service.TenderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TenderItemServiceImpl implements TenderItemService {

    private final TenderItemRepository tenderItemRepository;
    private final TenderRepository tenderRepository;
    private final TenderItemMapper tenderItemMapper;

    @Override
    public TenderItemResponse create(CreateTenderItemRequest request) {
        Tender tender = tenderRepository.findById(request.getTenderId())
                .orElseThrow(() -> new ResourceNotFoundException("Tender", request.getTenderId()));

        TenderItem item = tenderItemMapper.toEntity(request, tender);
        TenderItem savedItem = tenderItemRepository.save(item);
        return tenderItemMapper.toResponse(savedItem);
    }

    @Override
    @Transactional(readOnly = true)
    public TenderItemResponse getById(Long id) {
        TenderItem item = tenderItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TenderItem", id));
        return tenderItemMapper.toResponse(item);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TenderItemResponse> getByTenderId(Long tenderId) {
        return tenderItemRepository.findByTenderId(tenderId)
                .stream()
                .map(tenderItemMapper::toResponse)
                .toList();
    }

    @Override
    public TenderItemResponse update(Long id, UpdateTenderItemRequest request) {
        TenderItem item = tenderItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TenderItem", id));
        tenderItemMapper.updateEntity(item, request);
        TenderItem updatedItem = tenderItemRepository.save(item);
        return tenderItemMapper.toResponse(updatedItem);
    }

    @Override
    public void delete(Long id) {
        if (!tenderItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("TenderItem", id);
        }
        tenderItemRepository.deleteById(id);
    }
}
