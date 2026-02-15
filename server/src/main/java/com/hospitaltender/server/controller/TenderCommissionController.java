package com.hospitaltender.server.controller;

import com.hospitaltender.server.dto.request.CreateTenderCommissionRequest;
import com.hospitaltender.server.dto.response.TenderCommissionResponse;
import com.hospitaltender.server.service.TenderCommissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tender-commissions")
@RequiredArgsConstructor
public class TenderCommissionController {

    private final TenderCommissionService commissionService;

    @PostMapping
    public ResponseEntity<TenderCommissionResponse> addMember(@RequestBody CreateTenderCommissionRequest request) {
        TenderCommissionResponse response = commissionService.addMember(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/tender/{tenderId}")
    public ResponseEntity<List<TenderCommissionResponse>> getByTenderId(@PathVariable Long tenderId) {
        List<TenderCommissionResponse> responses = commissionService.getByTenderId(tenderId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TenderCommissionResponse>> getByUserId(@PathVariable Long userId) {
        List<TenderCommissionResponse> responses = commissionService.getByUserId(userId);
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeMember(@PathVariable Long id) {
        commissionService.removeMember(id);
        return ResponseEntity.noContent().build();
    }
}
