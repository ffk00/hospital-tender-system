package com.hospitaltender.server.dto.request.report;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeklifMektubuRequest {
    private String documentNumber;
    private Long supplierId;
    private String chiefPhysicianName;
}
