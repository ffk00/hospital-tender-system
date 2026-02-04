package com.hospitaltender.server.controller;

import com.hospitaltender.server.dto.request.CreateMarketResearchOfferRequest;
import com.hospitaltender.server.dto.request.UpdateMarketResearchOfferRequest;
import com.hospitaltender.server.dto.response.MarketResearchOfferResponse;
import com.hospitaltender.server.service.MarketResearchOfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/market-research-offers")
@RequiredArgsConstructor
public class MarketResearchOfferController {

    private final MarketResearchOfferService offerService;

    @PostMapping
    public ResponseEntity<MarketResearchOfferResponse> create(@RequestBody CreateMarketResearchOfferRequest request) {
        MarketResearchOfferResponse response = offerService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarketResearchOfferResponse> getById(@PathVariable Long id) {
        MarketResearchOfferResponse response = offerService.getById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/tender-item/{tenderItemId}")
    public ResponseEntity<List<MarketResearchOfferResponse>> getByTenderItemId(@PathVariable Long tenderItemId) {
        List<MarketResearchOfferResponse> responses = offerService.getByTenderItemId(tenderItemId);
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MarketResearchOfferResponse> update(@PathVariable Long id, @RequestBody UpdateMarketResearchOfferRequest request) {
        MarketResearchOfferResponse response = offerService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        offerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/tender-item/{tenderItemId}/calculate-cost")
    public ResponseEntity<BigDecimal> calculateApproximateCost(@PathVariable Long tenderItemId) {
        BigDecimal averageCost = offerService.calculateAndUpdateApproximateCost(tenderItemId);
        return ResponseEntity.ok(averageCost);
    }
}
