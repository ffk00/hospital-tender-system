# Hospital Procurement Management System

> **Procurement solution tailored for the operational reality of local hospitals in Türkiye.**

## Project Overview

This project provides a streamlined, modern procurement management solution tailored specifically for the operational realities of local and mid-sized healthcare facilities. By prioritizing process efficiency and user experience, the system bridges the gap between complex regulatory mandates and the day-to-day functional needs of hospital purchasing units.

## The Challenge

In Türkiye, most ERP and procurement tools in the healthcare sector are designed for very large university or city hospitals.These systems are built to follow complex administrative layers and strict government rules that fit massive organizations. While these rules are necessary for huge budgets, they often create unnecessary friction for smaller teams.

In local hospital settings, the procurement lifecycle is centralized within the Purchasing Department (Satın Alma Birimi). Yet, legacy software imposes "overkill" constraints like mandatory multi-department approvals for simple tasks. As a result, staff often revert to manual spreadsheets to get work done. This leads to a situation where expensive software licenses remain underused, creating a substantial financial burden for local institutions.

## The Solution

This project offers a specialized, open-source alternative that eliminates the financial burden of expensive, underutilized enterprise licenses. By simplifying the procurement workflow without compromising institutional accountability, it prevents the waste of public resources often spent on complex software that staff cannot effectively use.

By replacing clunky legacy desktop interfaces with a reactive web-based solution, the system eliminates artificial barriers that block progress in smaller teams. 
The focus is shifted from *"enforcing bureaucracy"* to *"facilitating procurement,"* allowing for better operational agility while maintaining a modern technical foundation.

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