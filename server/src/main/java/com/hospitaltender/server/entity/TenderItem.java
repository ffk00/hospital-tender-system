package com.hospitaltender.server.entity;

import com.hospitaltender.server.enums.UnitType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tender_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TenderItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tender_id", nullable = false)
    private Tender tender;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "quantity", precision = 10, scale = 2, nullable = false)
    private BigDecimal quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit", nullable = false)
    private UnitType unit;

    @Column(name = "approximate_unit_cost", precision = 19, scale = 2)
    private BigDecimal approximateUnitCost;

    @Column(name = "specifications", columnDefinition = "TEXT")
    private String specifications;

    // Relationships
    @OneToMany(mappedBy = "tenderItem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MarketResearchOffer> marketResearchOffers = new ArrayList<>();

    @OneToMany(mappedBy = "tenderItem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OfficialBid> officialBids = new ArrayList<>();
}
