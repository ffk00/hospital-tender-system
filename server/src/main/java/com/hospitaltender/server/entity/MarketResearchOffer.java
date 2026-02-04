package com.hospitaltender.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "market_research_offers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MarketResearchOffer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tender_item_id", nullable = false)
    private TenderItem tenderItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @Column(name = "offered_price", precision = 19, scale = 2, nullable = false)
    private BigDecimal offeredPrice;

    @Column(name = "offer_date")
    private LocalDate offerDate = LocalDate.now();

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
}
