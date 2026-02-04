package com.hospitaltender.server.controller;

import com.hospitaltender.server.dto.request.CreateOfficialBidRequest;
import com.hospitaltender.server.dto.response.OfficialBidResponse;
import com.hospitaltender.server.service.OfficialBidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/official-bids")
@RequiredArgsConstructor
public class OfficialBidController {

    private final OfficialBidService bidService;

    @PostMapping
    public ResponseEntity<OfficialBidResponse> create(@RequestBody CreateOfficialBidRequest request) {
        OfficialBidResponse response = bidService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OfficialBidResponse> getById(@PathVariable Long id) {
        OfficialBidResponse response = bidService.getById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/tender-item/{tenderItemId}")
    public ResponseEntity<List<OfficialBidResponse>> getByTenderItemId(@PathVariable Long tenderItemId) {
        List<OfficialBidResponse> responses = bidService.getByTenderItemId(tenderItemId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/tender-item/{tenderItemId}/valid")
    public ResponseEntity<List<OfficialBidResponse>> getValidBidsByTenderItemId(@PathVariable Long tenderItemId) {
        List<OfficialBidResponse> responses = bidService.getValidBidsByTenderItemId(tenderItemId);
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bidService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/tender-item/{tenderItemId}/evaluate")
    public ResponseEntity<OfficialBidResponse> evaluateBids(@PathVariable Long tenderItemId) {
        OfficialBidResponse winner = bidService.evaluateBids(tenderItemId);
        return ResponseEntity.ok(winner);
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<OfficialBidResponse> rejectBid(@PathVariable Long id, @RequestParam String reason) {
        OfficialBidResponse response = bidService.rejectBid(id, reason);
        return ResponseEntity.ok(response);
    }
}
