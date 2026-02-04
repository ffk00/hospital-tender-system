package com.hospitaltender.server.controller;

import com.hospitaltender.server.dto.request.CreateTenderRequest;
import com.hospitaltender.server.dto.request.UpdateTenderRequest;
import com.hospitaltender.server.dto.response.TenderResponse;
import com.hospitaltender.server.enums.TenderStatus;
import com.hospitaltender.server.service.TenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenders")
@RequiredArgsConstructor
public class TenderController {

    private final TenderService tenderService;

    @PostMapping
    public ResponseEntity<TenderResponse> create(@RequestBody CreateTenderRequest request) {
        TenderResponse response = tenderService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TenderResponse> getById(@PathVariable Long id) {
        TenderResponse response = tenderService.getById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<TenderResponse>> getAll() {
        List<TenderResponse> responses = tenderService.getAll();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<TenderResponse>> getByStatus(@PathVariable TenderStatus status) {
        List<TenderResponse> responses = tenderService.getByStatus(status);
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TenderResponse> update(@PathVariable Long id, @RequestBody UpdateTenderRequest request) {
        TenderResponse response = tenderService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TenderResponse> updateStatus(@PathVariable Long id, @RequestParam TenderStatus status) {
        TenderResponse response = tenderService.updateStatus(id, status);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tenderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
