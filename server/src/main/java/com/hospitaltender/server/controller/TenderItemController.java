package com.hospitaltender.server.controller;

import com.hospitaltender.server.dto.request.CreateTenderItemRequest;
import com.hospitaltender.server.dto.request.UpdateTenderItemRequest;
import com.hospitaltender.server.dto.response.TenderItemResponse;
import com.hospitaltender.server.service.TenderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tender-items")
@RequiredArgsConstructor
public class TenderItemController {

    private final TenderItemService tenderItemService;

    @PostMapping
    public ResponseEntity<TenderItemResponse> create(@RequestBody CreateTenderItemRequest request) {
        TenderItemResponse response = tenderItemService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TenderItemResponse> getById(@PathVariable Long id) {
        TenderItemResponse response = tenderItemService.getById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/tender/{tenderId}")
    public ResponseEntity<List<TenderItemResponse>> getByTenderId(@PathVariable Long tenderId) {
        List<TenderItemResponse> responses = tenderItemService.getByTenderId(tenderId);
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TenderItemResponse> update(@PathVariable Long id, @RequestBody UpdateTenderItemRequest request) {
        TenderItemResponse response = tenderItemService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tenderItemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
