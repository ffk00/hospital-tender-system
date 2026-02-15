package com.hospitaltender.server.service.impl;

import com.hospitaltender.server.service.JasperReportService;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.pdf.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.pdf.SimplePdfExporterConfiguration;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class JasperReportServiceImpl implements JasperReportService {

    private final ConcurrentHashMap<String, JasperReport> compiledReportCache = new ConcurrentHashMap<>();

    @Override
    public byte[] generateReport(String templateName, Map<String, Object> parameters, JRDataSource dataSource) {
        try {
            JasperReport jasperReport = getCompiledReport(templateName);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
            return exportToPdf(jasperPrint);
        } catch (JRException e) {
            log.error("Error generating report: {}", templateName, e);
            throw new RuntimeException("Rapor oluşturulurken hata oluştu: " + templateName, e);
        }
    }

    private JasperReport getCompiledReport(String templateName) {
        return compiledReportCache.computeIfAbsent(templateName, name -> {
            try {
                String resourcePath = "reports/" + name + ".jrxml";
                InputStream inputStream = getClass().getClassLoader().getResourceAsStream(resourcePath);
                if (inputStream == null) {
                    throw new RuntimeException("Rapor şablonu bulunamadı: " + resourcePath);
                }
                return JasperCompileManager.compileReport(inputStream);
            } catch (JRException e) {
                log.error("JRXML compilation failed for template: {}", name, e);
                throw new RuntimeException("Rapor derlenirken hata oluştu: " + name, e);
            }
        });
    }

    private byte[] exportToPdf(JasperPrint jasperPrint) throws JRException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        JRPdfExporter exporter = new JRPdfExporter();
        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));

        SimplePdfExporterConfiguration configuration = new SimplePdfExporterConfiguration();
        exporter.setConfiguration(configuration);

        exporter.exportReport();
        return outputStream.toByteArray();
    }
}
