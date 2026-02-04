package com.hospitaltender.server.entity;

import com.hospitaltender.server.enums.ReportType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "report_histories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tender_id", nullable = false)
    private Tender tender;

    @Enumerated(EnumType.STRING)
    @Column(name = "report_type", length = 50, nullable = false)
    private ReportType reportType;

    @Column(name = "file_name", length = 255)
    private String fileName;
}
