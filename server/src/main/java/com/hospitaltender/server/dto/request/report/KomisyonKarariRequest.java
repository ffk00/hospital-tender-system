package com.hospitaltender.server.dto.request.report;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KomisyonKarariRequest {
    private String decisionNumber;
    private String decisionDate;
    private String hospitalName;
    private String purposeText;
}
