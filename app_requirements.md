# App Requirements — Home Credit Default Risk Prediction Platform

## 1. Project Summary
A full-stack web application that wraps a Home Credit Default Risk ML model in a **premium fintech-startup-grade product**, not a "college project" looking UI. The end product should feel like a polished SaaS dashboard (think Stripe/Linear-level visual quality) — dark theme, glassmorphism, smooth motion, modern charts, and confident typography/spacing throughout.

This document defines requirements for the **agent building the frontend, backend, and API integration layer**. The ML/Data Science side (EDA, preprocessing, feature engineering, model training, testing, SHAP explainability) is owned separately and will be delivered as a REST API. Treat the ML API as an external dependency with a contract defined below (subject to change once the real model is ready — build against a mock first).

---

## 2. Scope Boundaries

| Area | Owner | In scope for this agent? |
|---|---|---|
| EDA, preprocessing, feature engineering | Teammate (ML) | No |
| Model training/testing | Teammate (ML) | No |
| SHAP explainability generation | Teammate (ML) | No (consume output only) |
| ML inference API (Python/FastAPI or Flask) | Teammate (ML) | No (consume only) |
| Frontend (UI/UX, all pages) | This agent | Yes |
| Backend (Node/Express, auth, DB, API integration) | This agent | Yes |
| Admin panel | This agent | Yes (nice-to-have / stretch) |

---

## 3. Tech Stack

- **Frontend:** React + Tailwind CSS
  - Charting: Recharts (or Chart.js) for dashboard/analytics graphs
  - Animation: Framer Motion for transitions/micro-interactions
- **Backend:** Node.js + Express
- **Database:** Not yet decided — pick PostgreSQL (relational, good fit for users/predictions/history) or MongoDB (faster to prototype). Default assumption: **PostgreSQL** unless the agent has a strong reason to prefer Mongo. Flag this as an open decision.
- **Auth:** JWT-based sessions (access + refresh token pattern), protected routes on frontend
- **ML Service:** External Python service (FastAPI/Flask), reached from the Node backend, not directly from the frontend
- **Deployment target:** Not specified — assume Vercel (frontend) + Render/Railway (backend) as a reasonable default, but don't hard-lock architecture to a specific host

---

## 4. Design Direction

- **Theme:** Dark by default. Consider optional light-mode toggle as stretch, not required.
- **Visual language:** Glassmorphism cards (frosted glass panels, subtle borders, soft glow), gradient accents, generous whitespace.
- **Motion:** Smooth page transitions, hover states, skeleton loaders instead of plain spinners, animated number counters on dashboard cards.
- **Typography:** Modern sans-serif, clear hierarchy, avoid default Tailwind/Bootstrap "template" look.
- **Charts:** Styled to match dark theme (no default white chart backgrounds), consistent color system for risk levels (e.g., green = Low, amber = Medium, red = High).
- **North star:** Should read as a fintech company's live product, not a demo. Avoid generic stock icons/illustrations — prefer custom iconography (lucide-react is fine) and intentional color system.

---

## 5. Pages & Features

### 5.1 Landing Page (public)
- Hero section: project name, one-line pitch, CTA (Login/Register)
- Features section: what the platform does (risk scoring, explainability, analytics, etc.)
- Tech stack showcase (visual badges/icons of stack used, including the ML stack)
- Team section (names/roles/photos placeholders)

### 5.2 Auth
- Login page
- Register page
- JWT-based session handling, protected route wrapper for everything post-login
- Basic validation + error states (wrong password, existing email, etc.)

### 5.3 Dashboard (post-login, protected)
- Summary cards (animated counters):
  - Total Predictions
  - High Risk count
  - Medium Risk count
  - Low Risk count
  - Average Default Probability
- Chart section below cards (e.g., risk distribution pie/donut, recent trend line)

### 5.4 New Prediction Page
- Form capturing loan applicant details (fields depend on final ML feature set — build with a reasonable placeholder field set now, make the form config-driven so fields can be swapped later without a rewrite)
- "Predict" button → sends payload to backend → backend calls ML API
- Loading state while waiting on ML response
- Error handling (ML service down, validation errors, timeout)

### 5.5 Result Page
Display for a single prediction, not just a binary label:
- Default / No Default outcome
- Probability (%)
- Risk Level (Low / Medium / High) — visually color-coded
- Confidence score
- **Explanation section** — SHAP-based feature contribution visualization (e.g., horizontal bar chart of top features pushing risk up/down). Build this as a component that takes a generic `shap_values` array so it doesn't need rework when real SHAP output arrives.

### 5.6 Prediction History Page
- Table/list of past predictions for the logged-in user
- Search (by applicant ID/name if applicable)
- Filters (risk level, date range, outcome)
- Click into a row → reopen that prediction's Result view

### 5.7 Analytics Page
- Risk distribution chart (aggregate across all predictions)
- Prediction trends over time (line/area chart)
- Additional breakdowns as useful (e.g., average probability over time, volume per week)

### 5.8 User Profile Page
- View/edit basic profile info
- Change password
- Maybe: account creation date, total predictions made by this user

### 5.9 Admin Panel (stretch goal, lower priority)
- List of all registered users
- List of all prediction logs across users
- Basic filtering/search
- No need for granular role management beyond a simple `isAdmin` flag unless time permits

---

## 6. ML API Integration Contract (placeholder — confirm once ML side is ready)

Backend should isolate all ML calls behind a single service module so the contract can change without touching frontend code.

```
POST /predict
Request body: { ...applicant_features }   // exact schema TBD from ML side
Response: {
  prediction: "Default" | "No Default",
  probability: number,        // 0–1 or 0–100, confirm scale
  risk_level: "Low" | "Medium" | "High",
  confidence: number,
  shap_values: [
    { feature: string, value: number, impact: "positive" | "negative" }
  ]
}
```

Until the real model is ready:
- Build the Node backend's `/api/predict` endpoint against a **mocked version** of this response.
- Keep the applicant-detail form fields configurable (array/schema-driven) since the actual feature list isn't finalized yet.

---

## 7. Data Flow

```
Frontend (New Prediction form)
   -> Node/Express backend (/api/predict)
      -> validates input, attaches user context
      -> calls Python ML API (/predict)
      -> stores result in DB (linked to user)
   <- returns prediction result to frontend
Frontend (Result page) renders response
Frontend (History/Analytics/Dashboard) reads from DB via backend, not directly from ML API
```

---

## 8. Non-Functional Requirements

- Fully responsive (desktop-first, but usable on tablet/mobile)
- No visible "student project" defaults — no unstyled Bootstrap, no placeholder Lorem Ipsum left in final pages
- Fast perceived performance: skeleton loaders, lazy-loaded chart components
- Input validation on both frontend and backend
- Basic rate limiting / abuse protection on the `/predict` endpoint
- Passwords hashed (bcrypt or similar), JWT secrets in env vars, no secrets committed to repo

---

## 9. Suggested Repo Structure

```
/frontend
  /src
    /pages        (Landing, Login, Register, Dashboard, NewPrediction, Result, History, Analytics, Profile, Admin)
    /components   (cards, charts, form fields, shap explanation viz, nav/sidebar)
    /context      (auth context)
    /api          (axios/fetch client wrapper)
/backend
  /src
    /routes       (auth, predictions, users, admin)
    /controllers
    /services     (ml-api-client.js — isolates ML integration)
    /models       (User, Prediction)
    /middleware   (auth, error handling, rate limiter)
```

---

## 10. Open Questions / Assumptions (flag to user before/while building)

1. **Database choice** — defaulting to PostgreSQL unless told otherwise.
2. **Exact applicant feature schema** — unknown until ML side finalizes preprocessing; build the prediction form and SHAP viz as schema-driven/generic so this is a config change later, not a rewrite.
3. **Probability scale** (0–1 vs 0–100) and **risk-level thresholds** — need confirmation from ML side.
4. **Deployment target** — not specified, assumed Vercel + Render/Railway.
5. **Admin panel depth** — treated as stretch goal; confirm if it's required for the deliverable or genuinely optional.

---

## 11. Suggested Build Phases

1. **Phase 1:** Landing page, Auth (login/register), app shell/navigation, dark theme + design system setup
2. **Phase 2:** Dashboard, New Prediction form, Result page — all wired to a **mocked** ML response
3. **Phase 3:** Prediction History, Analytics page, User Profile
4. **Phase 4:** Swap mock for real ML API once teammate delivers it; Admin panel; polish, animations, responsive QA
