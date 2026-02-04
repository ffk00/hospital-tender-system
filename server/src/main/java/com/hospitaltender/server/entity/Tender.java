package com.hospitaltender.server.entity;

import com.hospitaltender.server.enums.TenderMethod;
import com.hospitaltender.server.enums.TenderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tenders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tender extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "registration_number", length = 50)
    private String registrationNumber; // IKN

    @Column(name = "approval_number", length = 50)
    private String approvalNumber;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "method", nullable = false)
    private TenderMethod method;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TenderStatus status = TenderStatus.DRAFT;

    // Date Fields
    @Column(name = "approval_date")
    private LocalDate approvalDate;

    @Column(name = "market_research_date")
    private LocalDate marketResearchDate;

    @Column(name = "tender_date")
    private LocalDateTime tenderDate;

    @Column(name = "contract_date")
    private LocalDate contractDate;

    @Column(name = "contract_end_date")
    private LocalDate contractEndDate;

    // Relationships
    @OneToMany(mappedBy = "tender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TenderItem> items = new ArrayList<>();

    @OneToMany(mappedBy = "tender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TenderCommission> commissionMembers = new ArrayList<>();
}
