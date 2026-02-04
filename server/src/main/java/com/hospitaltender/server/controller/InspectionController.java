package com.hospitaltender.server.controller;

import com.hospitaltender.server.dto.request.CreateInspectionRequest;
import com.hospitaltender.server.dto.request.UpdateInspectionRequest;
import com.hospitaltender.server.dto.response.InspectionResponse;
import com.hospitaltender.server.enums.InspectionStatus;
import com.hospitaltender.server.service.InspectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inspections")
@RequiredArgsConstructor
public class InspectionController {

    private final InspectionService inspectionService;

    @PostMapping
    public ResponseEntity<InspectionResponse> create(@RequestBody CreateInspectionRequest request) {
        InspectionResponse response = inspectionService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InspectionResponse> getById(@PathVariable Long id) {
        InspectionResponse response = inspectionService.getById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/tender/{tenderId}")
    public ResponseEntity<List<InspectionResponse>> getByTenderId(@PathVariable Long tenderId) {
        List<InspectionResponse> responses = inspectionService.getByTenderId(tenderId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<InspectionResponse>> getByStatus(@PathVariable InspectionStatus status) {
        List<InspectionResponse> responses = inspectionService.getByStatus(status);
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InspectionResponse> update(@PathVariable Long id, @RequestBody UpdateInspectionRequest request) {
        InspectionResponse response = inspectionService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<InspectionResponse> updateStatus(@PathVariable Long id, @RequestParam InspectionStatus status) {
        InspectionResponse response = inspectionService.updateStatus(id, status);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        inspectionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
