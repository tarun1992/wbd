# WBD Martech Engineering – User Journey Tracking Platform

# 1. Project Overview & Problem Statement

I implemnted a user journey tracking platform that captures user events. I have also used Mongo db cloud to store the collections and created REST API's to retrieve analytics and user journeys. It includes a React frontend for search and insights.

Backend: Node.js + TypeScript + Express

Database: MongoDB Cloud

Frontend: React + Vite

DevOps Level: Local setup + GitHub repo (no cloud deployment implemented)


# 2. Levels Covered 

| Area             | Level Implemented | Notes                                                                      |
| - | -- | -- |
| **Database**     | **L3**            | Schema design → Implementation on MongoDB Atlas → Integration with backend |
| **Backend/API**  | **L3**            | Event ingestion, journey API, analytics API, service-layer architecture    |
| **Frontend**     | **L3**            | Search, journey view, analytics view                                       |
| **Cloud/DevOps** | **L2**            | MongoDB Atlas + environment configs + GitHub repo                          |
| **Monitoring**   | **L1**            | Basic logging & structure for future metrics                               |



# ## 3. Challenges Addressed & High-Level Approach

### **Challenge:** Track user journeys with multiple event types

**Approach:**

* Flattened event model stored in MongoDB
* Query events by userId ordered by timestamp
* Enriched metadata inside events (pageId, itemId, timeSpent)

### **Challenge:** Support scalable ingestion (~5× daily events growth)

**Approach:**

* Simple JSON-based ingestion endpoint
* MongoDB Atlas cluster which auto-scales storage
* Event data model that supports indexing on `userId` and `timestamp`

### **Challenge:** Provide analytics

**Approach:**

* Aggregation endpoints (top pages / event counts) using MongoDB aggregation pipeline



# ## 4. High-Level Architecture Description

The system is divided into four logical components:

1. **Frontend (React + Vite)**

   * Search user journeys
   * Visualize analytics
   * Connects to backend via REST APIs

2. **Backend (Node.js + TypeScript, Express)**

   * Event ingestion
   * Analytics computation
   * User journey API
   * Connects to MongoDB Atlas

3. **Database (MongoDB Atlas)**

   * Stores events, users, articles
   * Indexed for query performance

4. **Future Cloud Layer (Not Implemented)**

   * Placeholder for AWS Lambda/API Gateway, CloudWatch, S3, EventBridge
   * README explains how it *would* be done



# ## 5. System Architecture Diagram (ASCII)

```
                   ┌──────────────────────┐
                   │      Frontend        │
                   │   React + Vite UI    │
                   └──────────┬───────────┘
                              │ REST API calls
                              ▼
                   ┌──────────────────────┐
                   │      Backend         │
                   │ Node.js + Express    │
                   │  Routes / Services   │
                   └──────────┬───────────┘
                              │ Mongoose ODM
                              ▼
                   ┌──────────────────────┐
                   │   MongoDB Atlas      │
                   │  (Events, Users)     │
                   └──────────────────────┘

Future (Not Implemented):
- AWS Lambda / API Gateway
- S3 export storage
- CloudWatch metrics and dashboards
```



# ## 6. Database Design

### ### Collections Implemented

#### **1. users**

```
{
  userId: string,
  profile: { name, email, country },
  createdAt: Date
}
```

#### **2. events**

```
{
  userId: string,
  eventType: "PAGE_VIEW" | "ITEM_VIEW" | "SESSION_START" | "SESSION_END",
  metadata: { pageId?, itemId?, timeSpent? },
  timestamp: Date
}
```

#### **3. articles**

*(Used for demonstrating external system integration)*



## ### ERD (Text Representation)

```
User (1) - (N) Events
User (1) - (N) Sessions   [implicit via SESSION_START/END]
Articles separate, imported externally
```



## ### Indexing Strategy

Indexes created:

```
events: { userId: 1, timestamp: 1 }
events: { eventType: 1 }
users:  { userId: 1 }
```

These support:

* Efficient user journey queries
* Fast chronological sorting
* Fast analytics filtering



# ## 7. Backend / API Documentation

### ### Base URLs

Local backend runs at:

```
http://localhost:4000
```

### ### Core Endpoints Implemented

#### **1. POST /api/events**

Ingest single or batch events.

**Request:**

```json
[
  {
    "userId": "user-1",
    "eventType": "PAGE_VIEW",
    "metadata": { "pageId": "home", "timeSpent": 12 },
    "timestamp": "2025-12-06T08:00:10Z"
  }
]
```

**Response:**

```json
{ "inserted": 1 }
```



#### **2. GET /api/users/:userId/journey**

Returns ordered user events.

**Response:**

```json
{
  "userId": "user-1",
  "events": [
    { "eventType": "SESSION_START", "timestamp": "..." },
    { "eventType": "PAGE_VIEW", "metadata": { "pageId": "home" }, "timestamp": "..." }
  ]
}
```



#### **3. GET /api/analytics/top-pages**

Aggregation example.

**Response:**

```json
[
  { "pageId": "home", "count": 10 },
  { "pageId": "product", "count": 5 }
]
```



### **4. GET /api/health**

Simple healthcheck endpoint.



# ## 8. Frontend Design

### ### Views Implemented

1. **Search Page**

   * Enter `userId`
   * Navigate to Journey view

2. **User Journey Page**

   * Displays chronological events
   * Simple timeline representation

3. **Analytics Page**

   * Shows Top Pages



## ### User Stories

**As an analyst**,
I want to search for a user ID
So I can see all events performed by that user.

**As a product owner**,
I want to see the pages most frequently visited
So I can understand engagement.

# ## 9. Monitoring & Dashboards

### Implemented:

* Console logging
* Error boundaries in backend

### Not Implemented:

* AWS CloudWatch metrics
* Grafana dashboard
* S3 export logs
* Alerts / alarms



# ## 10. Installation & Local Setup

### ### Prerequisites

* Node.js 18+
* npm
* MongoDB Atlas connection string



### ### Setup Steps

#### **Backend**

```bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI
npm run dev
```

#### **Frontend**

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```



# ## 11. Deployment Details 

### **Not Implemented**

* AWS Lambda / API Gateway
* AWS S3
* AWS EventBridge
* AWS CloudWatch dashboards


As a beginner in AWS, I focused on delivering complete local functionality with clear documentation.

### **If deployed in future, the flow would be:**

```
Frontend → API Gateway → Lambda → MongoDB Atlas
Daily Export → Lambda → S3
Monitoring → CloudWatch Metrics & Alarms
```



# ## 12. CI/CD Notes

GitHub repository includes:

* `.github/workflows` folder prepared for future pipelines
* Ready structure for:

  * Linting
  * Testing
  * Deployment steps when cloud hosting is added



# ## 13. Design Decisions & Patterns

1. **Layered Architecture**

   * Routes → Controllers → Services → Database Models

2. **Flexible Event Model**

   * Metadata-based → easy to extend to new event types

3. **MongoDB Atlas**

   * No setup overhead
   * Scalable document model

4. **React + Vite**

   * Fast dev environment
   * Simple routing



# ## 14. Repository Structure

```
wbd-martech-assessment/
│
├── backend/
│   ├── src/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── pages/
│   └── vite.config.ts
│
├── scripts/
│   └── seed-events.js
│
└── README.md


