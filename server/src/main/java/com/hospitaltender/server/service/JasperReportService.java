package com.hospitaltender.server.service;

import net.sf.jasperreports.engine.JRDataSource;

import java.util.Map;

public interface JasperReportService {

    byte[] generateReport(String templateName, Map<String, Object> parameters, JRDataSource dataSource);
}
