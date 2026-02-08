# Hospital Procurement Management System

> **A streamlined, modern procurement solution tailored for the operational reality of local hospitals.**

## Project Overview

This project provides a streamlined, modern procurement management solution tailored specifically for the operational realities of local and mid-sized healthcare facilities. By prioritizing process efficiency and user experience, the system bridges the gap between complex regulatory mandates and the day-to-day functional needs of hospital purchasing units.

## The Challenge

Standard Enterprise Resource Planning (ERP) and tender management systems currently utilized in the healthcare sector are engineered primarily for massive university or city hospitals. These systems strictly adhere to high-level bureaucratic structures, enforcing rigid workflows and mandatory data entry from multiple distinct departments. While these constraints are necessary for large-scale, high-stakes tenders, they often become **operational bottlenecks** in smaller administrative environments.

In local hospital settings, the procurement lifecycle is typically centralized within the **Purchasing Department** (Satın Alma Birimi). Legacy software often imposes "overkill" constraints—such as requiring cross-departmental approvals for minor steps—which leads to friction and inefficiency. Consequently, staff often abandon these complex official tools in favor of manual spreadsheets, resulting in data fragmentation and a loss of historical audit trails.

## The Solution

This project offers a specialized alternative by simplifying the procurement workflow without compromising institutional accountability. The system is built on a **role-specific architecture** that empowers purchasing officers to manage the end-to-end tender process within a single, unified interface.

By replacing clunky legacy desktop interfaces with a reactive web-based solution, the system eliminates artificial barriers that block progress in smaller teams. The focus is shifted from *"enforcing bureaucracy"* to *"facilitating procurement,"* allowing for greater operational agility while maintaining a modern technical foundation.

## Key Features

* **Dynamic Tender Management:** The system features a flexible, step-by-step wizard for tender initialization. Unlike legacy platforms that require absolute linear progression, this module allows for non-linear data entry to accommodate the fluctuating availability of information in local settings.
* **Operational Dashboard:** A centralized management console provides real-time visibility into active, pending, and completed tenders. This high-level overview allows purchasing officers to monitor their entire workload at a glance.
* **Security & Integrity:** While flexible, the system maintains strict data integrity and backend security protocols (JWT, Role-Based Access), preventing unauthorized manipulation and ensuring a secure audit trail.
* **Official Reporting (In Development):** To meet legal requirements, the project roadmap includes the integration of **JasperReports**. This module will automate the generation of government-compliant PDF documents, such as Offer Letters and Commission Decisions.

## Technical Stack

| Category | Technology |
| :--- | :--- |
| **Backend** | Java 17, Spring Boot 3, Spring Security (JWT), Spring Data JPA |
| **Frontend** | React (TypeScript), Vite, Material UI (MUI) |
| **Database** | PostgreSQL |
| **Infrastructure** | Docker, Docker Compose |
| **Reporting** | JasperReports (Engine) |

## Development Status

This project is currently in **active development**. The primary focus is on refining the core procurement workflow and finalizing the reporting engine to ensure full compliance with local health department regulations.