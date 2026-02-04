package com.hospitaltender.server.controller;

import com.hospitaltender.server.dto.request.CreateReportHistoryRequest;
import com.hospitaltender.server.dto.response.ReportHistoryResponse;
import com.hospitaltender.server.service.ReportHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/report-histories")
@RequiredArgsConstructor
public class ReportHistoryController {

    private final ReportHistoryService reportHistoryService;

    @PostMapping
    public ResponseEntity<ReportHistoryResponse> create(@RequestBody CreateReportHistoryRequest request) {
        ReportHistoryResponse response = reportHistoryService.saveReportHistory(
                request.getTenderId(),
                request.getReportType(),
                request.getFileName()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/tender/{tenderId}")
    public ResponseEntity<List<ReportHistoryResponse>> getByTenderId(@PathVariable Long tenderId) {
        List<ReportHistoryResponse> responses = reportHistoryService.getHistoryByTenderId(tenderId);
        return ResponseEntity.ok(responses);
    }
}
