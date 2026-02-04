package com.hospitaltender.server.entity;

import com.hospitaltender.server.enums.InspectionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "inspections")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Inspection extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tender_id", nullable = false)
    private Tender tender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @Column(name = "report_number", length = 50)
    private String reportNumber;

    @Column(name = "inspection_date")
    private LocalDate inspectionDate;

    @Column(name = "invoice_number", length = 50)
    private String invoiceNumber;

    @Column(name = "committee_report", columnDefinition = "TEXT")
    private String committeeReport;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private InspectionStatus status;
}
