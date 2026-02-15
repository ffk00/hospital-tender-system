package com.hospitaltender.server.dto.request.report;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LuzumMuzekkeresiRequest {
    private String documentNumber;
    private String documentDate;
    private String requestSubject;
    private String serviceManager1;
    private String serviceManager2;
    private String pharmacistName;
    private String warehouseManagerName;
    private String adminManagerName;
    private String chiefPhysicianName;
}
