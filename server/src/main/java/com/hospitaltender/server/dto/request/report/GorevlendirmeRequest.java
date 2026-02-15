package com.hospitaltender.server.dto.request.report;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GorevlendirmeRequest {
    private String documentNumber;
    private String documentDate;
    private String purposeText;
    private String chiefPhysicianName;
    private String adminManagerName;
}
