# **WBD Martech Engineering – User Journey Tracking Platform**

This project is a small end-to-end system that captures user events, stores them in MongoDB Atlas, and exposes APIs to fetch user journeys and basic analytics.
A simple React UI is included for searching a user and viewing their journey/top pages.

I focused on building a clean, working solution that can run locally and is easy to understand.

---

## **1. What’s Included**

* Backend (Node.js + TypeScript + Express)
* Frontend (React + Vite)
* MongoDB Atlas database
* API endpoints for events, journeys, and analytics
* Basic UI to search a user and see results
* Documentation and sample data

I did not implement AWS deployment, but the structure allows it to be added later.

---

## **2. Levels Covered (per the assessment structure)**

| Area         | Level  | Notes                                          |
| ------------ | ------ | ---------------------------------------------- |
| Database     | **L3** | Collections, indexes, Atlas setup, integration |
| Backend/API  | **L3** | Ingestion, journey API, analytics API          |
| Frontend     | **L3** | Search page, journey view, simple analytics    |
| Cloud/DevOps | **L2** | Atlas cloud DB + environment setup + GitHub    |
| Monitoring   | **L1** | Console logs and basic error handling          |

---

## **3. My Approach (Short Summary)**

### **Event tracking**

I used a single `events` collection with metadata so new event types can be added easily.
Each event includes a timestamp so journeys can be reconstructed in order.

### **Scaling considerations**

Even though this is a small demo, I added indexes on `userId` and `timestamp` so queries stay fast even if event volume grows.

### **Analytics**

Used MongoDB’s aggregation pipeline to calculate things like “top pages”.

### **Frontend**

Kept the UI simple:

* Search by user ID
* Show chronological events
* Basic analytics page

---

## **4. Architecture (High level)**

```
Frontend (React)
   ↓
Backend API (Express + TS)
   ↓
MongoDB Atlas (Events + Users)
```

Future cloud components (not implemented):
API Gateway, Lambda, S3 exports, CloudWatch dashboards.

---

## **5. Database Design**

### **Collections**

* **users** → basic profile info
* **events** → all tracked events
* **articles** → used just to show another data source

### **Event document example**

```json
{
  "userId": "user-1",
  "eventType": "PAGE_VIEW",
  "metadata": { "pageId": "home" },
  "timestamp": "2025-12-06T10:00:00Z"
}
```

### **Indexes**

```
events: { userId: 1, timestamp: 1 }
events: { eventType: 1 }
users:  { userId: 1 }
```

These improve journey and analytics queries.

---

## **6. API Endpoints**

**POST /api/events**
Insert events (single or batch)

**GET /api/users/:userId/journey**
Fetch ordered journey for a user

**GET /api/analytics/top-pages**
Return frequently viewed pages

Base URL (local):

```
http://localhost:4000
```

---

## **7. Frontend (React)**

### **Pages**

* **Search** – enter a user ID
* **User Journey** – timeline-style list of events
* **Analytics** – simple top pages output

### **User stories**

* As an analyst, I want to see what a user did on the platform.
* As a product owner, I want to know which pages are used the most.

---

## **8. Monitoring**

Only basic logging and error messages are included.
AWS CloudWatch / dashboards were not implemented.

---

## **9. Running the Project Locally**

### **Backend**

npm run dev
```

### **Frontend**

npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## **10. Deployment Notes**

Cloud deployment (AWS Lambda, API Gateway, S3, etc.) is not included.
I have described a possible flow if this were extended:

```
Frontend → API Gateway → Lambda → MongoDB Atlas
Daily exports → Lambda → S3
Monitoring → CloudWatch
```

---

## **12. Design Choices**

* Simple layered backend structure (routes → controllers → services → models)
* JSON-based event model for flexibility
* MongoDB Atlas so database works out-of-the-box without local installation
* Minimal UI focused on demonstrating core functionality

---

## **13. Repository Structure**

```
wbd-martech-assessment/
│
├── backend/
├── frontend/
└── README.md
```


