package com.hospitaltender.server.service.impl;

import com.hospitaltender.server.dto.request.CreateTenderCommissionRequest;
import com.hospitaltender.server.dto.response.TenderCommissionResponse;
import com.hospitaltender.server.entity.Tender;
import com.hospitaltender.server.entity.TenderCommission;
import com.hospitaltender.server.entity.User;
import com.hospitaltender.server.exception.DuplicateResourceException;
import com.hospitaltender.server.exception.ResourceNotFoundException;
import com.hospitaltender.server.mapper.TenderCommissionMapper;
import com.hospitaltender.server.repository.TenderCommissionRepository;
import com.hospitaltender.server.repository.TenderRepository;
import com.hospitaltender.server.repository.UserRepository;
import com.hospitaltender.server.service.TenderCommissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TenderCommissionServiceImpl implements TenderCommissionService {

    private final TenderCommissionRepository commissionRepository;
    private final TenderRepository tenderRepository;
    private final UserRepository userRepository;
    private final TenderCommissionMapper commissionMapper;

    @Override
    public TenderCommissionResponse addMember(CreateTenderCommissionRequest request) {
        Tender tender = tenderRepository.findById(request.getTenderId())
                .orElseThrow(() -> new ResourceNotFoundException("Tender", request.getTenderId()));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", request.getUserId()));

        if (commissionRepository.existsByTenderIdAndUserId(request.getTenderId(), request.getUserId())) {
            throw new DuplicateResourceException("User is already a member of this tender commission");
        }

        TenderCommission commission = commissionMapper.toEntity(request, tender, user);
        TenderCommission savedCommission = commissionRepository.save(commission);
        return commissionMapper.toResponse(savedCommission);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TenderCommissionResponse> getByTenderId(Long tenderId) {
        return commissionRepository.findByTenderId(tenderId)
                .stream()
                .map(commissionMapper::toResponse)
                .toList();
    }

    @Override
    public void removeMember(Long id) {
        if (!commissionRepository.existsById(id)) {
            throw new ResourceNotFoundException("TenderCommission", id);
        }
        commissionRepository.deleteById(id);
    }
}
