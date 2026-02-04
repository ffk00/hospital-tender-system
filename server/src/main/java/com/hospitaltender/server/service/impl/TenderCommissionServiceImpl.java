package com.hospitaltender.server.service.impl;

import com.hospitaltender.server.dto.request.CreateTenderCommissionRequest;
import com.hospitaltender.server.dto.response.TenderCommissionResponse;
import com.hospitaltender.server.entity.Tender;
import com.hospitaltender.server.entity.TenderCommission;
import com.hospitaltender.server.entity.User;
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
                .orElseThrow(() -> new RuntimeException("Tender not found with id: " + request.getTenderId()));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + request.getUserId()));

        // Check if user is already a member of this commission
        if (commissionRepository.existsByTenderIdAndUserId(request.getTenderId(), request.getUserId())) {
            throw new RuntimeException("User is already a member of this tender commission");
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
            throw new RuntimeException("Commission member not found with id: " + id);
        }
        commissionRepository.deleteById(id);
    }
}
