# Hospital Tender System - Backend API Documentation

## Overview

OpenMedProcure is an open-source Hospital Procurement & Tender Management System. The backend is built with Spring Boot 4.x and provides RESTful APIs for managing the complete procurement lifecycle.

**Base URL:** `http://localhost:8080/api`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Users](#users)
3. [Suppliers](#suppliers)
4. [Tenders](#tenders)
5. [Tender Items](#tender-items)
6. [Tender Commissions](#tender-commissions)
7. [Market Research Offers](#market-research-offers)
8. [Official Bids](#official-bids)
9. [Inspections](#inspections)
10. [Error Handling](#error-handling)
11. [Enums](#enums)

---

## Authentication

All endpoints except `/api/auth/**` require JWT authentication.

### Headers
```
Authorization: Bearer <token>
```

### Register
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "title": "string (optional)",
  "email": "string",
  "password": "string",
  "role": "ADMIN | USER | COMMISSIONER"
}
```

**Response:** `201 Created`
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "userId": 1,
  "email": "john@example.com",
  "fullName": "John Doe",
  "role": "ADMIN"
}
```

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "userId": 1,
  "email": "john@example.com",
  "fullName": "John Doe",
  "role": "ADMIN"
}
```

---

## Users

### Create User
```http
POST /api/users
```

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "title": "string (optional)",
  "email": "string",
  "password": "string",
  "role": "ADMIN | USER | COMMISSIONER"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "title": "Procurement Manager",
  "email": "john@example.com",
  "role": "ADMIN",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### Get User by ID
```http
GET /api/users/{id}
```

**Response:** `200 OK` - Returns UserResponse

### Get All Users
```http
GET /api/users
```

**Response:** `200 OK` - Returns array of UserResponse

### Update User
```http
PUT /api/users/{id}
```

**Request Body:**
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "title": "string (optional)",
  "email": "string (optional)",
  "role": "ADMIN | USER | COMMISSIONER (optional)",
  "isActive": "boolean (optional)"
}
```

**Response:** `200 OK` - Returns updated UserResponse

### Delete User
```http
DELETE /api/users/{id}
```

**Response:** `204 No Content`

---

## Suppliers

### Create Supplier
```http
POST /api/suppliers
```

**Request Body:**
```json
{
  "companyName": "string",
  "taxNumber": "string",
  "taxOffice": "string (optional)",
  "bankName": "string (optional)",
  "bankBranch": "string (optional)",
  "iban": "string (optional)",
  "contactName": "string (optional)",
  "phone": "string (optional)",
  "email": "string (optional)",
  "address": "string (optional)"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "companyName": "Medical Supplies Co.",
  "taxNumber": "1234567890",
  "taxOffice": "Istanbul",
  "bankName": "Bank A",
  "bankBranch": "Main Branch",
  "iban": "TR123456789012345678901234",
  "contactName": "Jane Smith",
  "phone": "+90 555 123 4567",
  "email": "contact@medical.com",
  "address": "123 Medical Street, Istanbul",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### Get Supplier by ID
```http
GET /api/suppliers/{id}
```

### Get All Suppliers
```http
GET /api/suppliers
```

### Update Supplier
```http
PUT /api/suppliers/{id}
```

### Delete Supplier
```http
DELETE /api/suppliers/{id}
```

---

## Tenders

### Create Tender
```http
POST /api/tenders
```

**Request Body:**
```json
{
  "registrationNumber": "string (IKN - optional)",
  "approvalNumber": "string (optional)",
  "title": "string",
  "description": "string (optional)",
  "method": "OPEN_TENDER | DIRECT_PROCUREMENT | BARGAINING",
  "approvalDate": "2024-01-15 (optional)",
  "marketResearchDate": "2024-01-20 (optional)",
  "tenderDate": "2024-02-01T10:00:00 (optional)",
  "contractDate": "2024-02-15 (optional)",
  "contractEndDate": "2024-12-31 (optional)"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "registrationNumber": "IKN-2024-001",
  "approvalNumber": "ONY-2024-001",
  "title": "Medical Equipment Procurement",
  "description": "Annual medical equipment procurement",
  "method": "OPEN_TENDER",
  "status": "DRAFT",
  "approvalDate": "2024-01-15",
  "marketResearchDate": "2024-01-20",
  "tenderDate": "2024-02-01T10:00:00",
  "contractDate": "2024-02-15",
  "contractEndDate": "2024-12-31",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00",
  "itemCount": 0,
  "commissionMemberCount": 0
}
```

### Get Tender by ID
```http
GET /api/tenders/{id}
```

### Get All Tenders
```http
GET /api/tenders
```

### Get Tenders by Status
```http
GET /api/tenders/status/{status}
```

**Path Parameters:**
- `status`: `DRAFT | MARKET_RESEARCH | PUBLISHED | EVALUATION | COMPLETED | CANCELLED`

### Update Tender
```http
PUT /api/tenders/{id}
```

### Update Tender Status
```http
PATCH /api/tenders/{id}/status?status={status}
```

### Delete Tender
```http
DELETE /api/tenders/{id}
```

---

## Tender Items

### Create Tender Item
```http
POST /api/tender-items
```

**Request Body:**
```json
{
  "tenderId": 1,
  "itemName": "string",
  "quantity": 100.00,
  "unit": "PIECE | BOX | KG | LITER | PACK | METER | PAIR",
  "specifications": "string (optional)"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "tenderId": 1,
  "itemName": "Surgical Gloves",
  "quantity": 1000.00,
  "unit": "BOX",
  "approximateUnitCost": null,
  "specifications": "Latex-free, Size M",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00",
  "marketResearchOfferCount": 0,
  "officialBidCount": 0
}
```

### Get Tender Item by ID
```http
GET /api/tender-items/{id}
```

### Get Items by Tender ID
```http
GET /api/tender-items/tender/{tenderId}
```

### Update Tender Item
```http
PUT /api/tender-items/{id}
```

### Delete Tender Item
```http
DELETE /api/tender-items/{id}
```

---

## Tender Commissions

### Add Commission Member
```http
POST /api/tender-commissions
```

**Request Body:**
```json
{
  "tenderId": 1,
  "userId": 2,
  "role": "PRESIDENT | MEMBER"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "tenderId": 1,
  "userId": 2,
  "userFullName": "Jane Smith",
  "userTitle": "Department Head",
  "role": "PRESIDENT",
  "createdAt": "2024-01-15T10:30:00"
}
```

### Get Commission Members by Tender ID
```http
GET /api/tender-commissions/tender/{tenderId}
```

### Remove Commission Member
```http
DELETE /api/tender-commissions/{id}
```

---

## Market Research Offers

Used during the market research phase to collect price quotes and calculate approximate cost.

### Create Market Research Offer
```http
POST /api/market-research-offers
```

**Request Body:**
```json
{
  "tenderItemId": 1,
  "supplierId": 1,
  "offeredPrice": 150.00,
  "offerDate": "2024-01-20 (optional, defaults to today)",
  "notes": "string (optional)"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "tenderItemId": 1,
  "tenderItemName": "Surgical Gloves",
  "supplierId": 1,
  "supplierName": "Medical Supplies Co.",
  "offeredPrice": 150.00,
  "offerDate": "2024-01-20",
  "notes": "Valid for 30 days",
  "createdAt": "2024-01-15T10:30:00"
}
```

> **Note:** When an offer is created, updated, or deleted, the `approximateUnitCost` of the tender item is automatically recalculated as the average of all offers.

### Get Offer by ID
```http
GET /api/market-research-offers/{id}
```

### Get Offers by Tender Item ID
```http
GET /api/market-research-offers/tender-item/{tenderItemId}
```

### Update Offer
```http
PUT /api/market-research-offers/{id}
```

### Delete Offer
```http
DELETE /api/market-research-offers/{id}
```

### Calculate Approximate Cost (Manual Trigger)
```http
POST /api/market-research-offers/tender-item/{tenderItemId}/calculate-cost
```

**Response:** `200 OK`
```json
145.50
```

---

## Official Bids

Used during the bidding phase to collect sealed bids and evaluate winners.

### Create Official Bid
```http
POST /api/official-bids
```

**Request Body:**
```json
{
  "tenderItemId": 1,
  "supplierId": 1,
  "bidPrice": 140.00
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "tenderItemId": 1,
  "tenderItemName": "Surgical Gloves",
  "supplierId": 1,
  "supplierName": "Medical Supplies Co.",
  "bidPrice": 140.00,
  "isValid": true,
  "isWinningBid": false,
  "rejectionReason": null,
  "createdAt": "2024-01-15T10:30:00"
}
```

### Get Bid by ID
```http
GET /api/official-bids/{id}
```

### Get Bids by Tender Item ID
```http
GET /api/official-bids/tender-item/{tenderItemId}
```

### Get Valid Bids by Tender Item ID
```http
GET /api/official-bids/tender-item/{tenderItemId}/valid
```

### Delete Bid
```http
DELETE /api/official-bids/{id}
```

### Evaluate Bids (Select Winner)
```http
POST /api/official-bids/tender-item/{tenderItemId}/evaluate
```

**Business Logic:**
1. Rejects all bids that exceed the `approximateUnitCost` (Tavan Fiyat)
2. Selects the lowest valid bid as the winner
3. Sets `isWinningBid = true` on the winning bid

**Response:** `200 OK` - Returns the winning bid
```json
{
  "id": 2,
  "tenderItemId": 1,
  "tenderItemName": "Surgical Gloves",
  "supplierId": 3,
  "supplierName": "Healthcare Products Inc.",
  "bidPrice": 135.00,
  "isValid": true,
  "isWinningBid": true,
  "rejectionReason": null,
  "createdAt": "2024-01-15T10:30:00"
}
```

### Manually Reject Bid
```http
PATCH /api/official-bids/{id}/reject?reason={reason}
```

**Query Parameters:**
- `reason`: Rejection reason text

**Response:** `200 OK` - Returns the rejected bid

---

## Inspections

Post-tender delivery inspections.

### Create Inspection
```http
POST /api/inspections
```

**Request Body:**
```json
{
  "tenderId": 1,
  "supplierId": 1,
  "reportNumber": "string (optional)",
  "inspectionDate": "2024-03-01 (optional)",
  "invoiceNumber": "string (optional)",
  "committeeReport": "string (optional)"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "tenderId": 1,
  "tenderTitle": "Medical Equipment Procurement",
  "supplierId": 1,
  "supplierName": "Medical Supplies Co.",
  "reportNumber": "INS-2024-001",
  "inspectionDate": "2024-03-01",
  "invoiceNumber": "INV-2024-001",
  "committeeReport": "All items delivered as specified.",
  "status": null,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### Get Inspection by ID
```http
GET /api/inspections/{id}
```

### Get Inspections by Tender ID
```http
GET /api/inspections/tender/{tenderId}
```

### Get Inspections by Status
```http
GET /api/inspections/status/{status}
```

**Path Parameters:**
- `status`: `ACCEPTED | REJECTED`

### Update Inspection
```http
PUT /api/inspections/{id}
```

### Update Inspection Status
```http
PATCH /api/inspections/{id}/status?status={status}
```

### Delete Inspection
```http
DELETE /api/inspections/{id}
```

---

## Error Handling

All errors follow a consistent format:

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "User not found with id: 123",
  "path": "/api/users/123"
}
```

### HTTP Status Codes

| Status | Description | When Used |
|--------|-------------|-----------|
| `200` | OK | Successful GET, PUT, PATCH |
| `201` | Created | Successful POST |
| `204` | No Content | Successful DELETE |
| `400` | Bad Request | Business rule violation, validation error |
| `401` | Unauthorized | Missing or invalid JWT token |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Duplicate resource (e.g., email already exists) |
| `500` | Internal Server Error | Unexpected server error |

### Validation Errors

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "One or more fields have invalid values",
  "path": "/api/users",
  "fieldErrors": [
    {
      "field": "email",
      "message": "must not be blank"
    },
    {
      "field": "firstName",
      "message": "must not be blank"
    }
  ]
}
```

---

## Enums

### UserRole
| Value | Description |
|-------|-------------|
| `ADMIN` | System administrator |
| `USER` | Procurement staff |
| `COMMISSIONER` | Commission member |

### TenderMethod
| Value | Description |
|-------|-------------|
| `OPEN_TENDER` | Açık İhale |
| `DIRECT_PROCUREMENT` | Doğrudan Temin |
| `BARGAINING` | Pazarlık |

### TenderStatus
| Value | Description |
|-------|-------------|
| `DRAFT` | Initial state |
| `MARKET_RESEARCH` | Collecting price quotes |
| `PUBLISHED` | Open for bidding |
| `EVALUATION` | Evaluating bids |
| `COMPLETED` | Tender finished |
| `CANCELLED` | Tender cancelled |

### UnitType
| Value | Description |
|-------|-------------|
| `PIECE` | Adet |
| `BOX` | Kutu |
| `KG` | Kilogram |
| `LITER` | Litre |
| `PACK` | Paket |
| `METER` | Metre |
| `PAIR` | Çift |

### CommissionRole
| Value | Description |
|-------|-------------|
| `PRESIDENT` | Başkan |
| `MEMBER` | Üye |

### InspectionStatus
| Value | Description |
|-------|-------------|
| `ACCEPTED` | Kabul |
| `REJECTED` | Red |

---

## Business Flow

```
1. DRAFT
   └── Create tender
   └── Add tender items
   └── Assign commission members

2. MARKET_RESEARCH
   └── Collect market research offers from suppliers
   └── System calculates average → approximateUnitCost (Tavan Fiyat)

3. PUBLISHED
   └── Tender opens for official bidding
   └── Suppliers submit sealed bids

4. EVALUATION
   └── Commission evaluates bids
   └── System rejects bids > approximateUnitCost
   └── Lowest valid bid wins

5. COMPLETED
   └── Contract signed with winner
   └── Inspections track deliveries
```

---

## Configuration

### application.properties

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/hospital_tender_db
spring.datasource.username=postgres
spring.datasource.password=****

# JWT
jwt.secret=<base64-encoded-secret>
jwt.expiration=86400000  # 24 hours in milliseconds

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### CORS

Allowed origins:
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (React)

---

## Tech Stack

- **Framework:** Spring Boot 4.x
- **Database:** PostgreSQL
- **Security:** Spring Security + JWT
- **ORM:** Spring Data JPA / Hibernate
- **Build:** Maven
- **Java:** 17+
