package com.hospitaltender.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "official_bids")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfficialBid extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tender_item_id", nullable = false)
    private TenderItem tenderItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @Column(name = "bid_price", precision = 19, scale = 2, nullable = false)
    private BigDecimal bidPrice;

    @Column(name = "is_valid")
    private Boolean isValid = true;

    @Column(name = "is_winning_bid")
    private Boolean isWinningBid = false;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;
}
