# AI-Ready Website Service

**Schema markup, structured content, and monthly maintenance to make your website visible to AI-generated search results.**

## Files

- **index.html** — Main landing page with pricing, T&Cs modal, and discount code input
- **terms.html** — Full Terms & Conditions page
- **admin/index.html** — BDM partner dashboard for generating and managing discount codes

## How It Works

### 1. Customer Journey

1. Customer visits `/websites/`
2. Sees the pitch: schema markup + structured content service (£995/month)
3. Can enter a **BDM discount code** to reduce the price (£495–£995)
4. Must read and accept T&Cs before checkout
5. Redirected to Stripe checkout with the correct amount

### 2. BDM Discount Flow

1. BDM partner signs into `/websites/admin/`
2. Generates discount codes with custom prices (£495–£995)
3. Shares codes with prospects
4. When prospect enters code on main page, price updates
5. Prospect pays via Stripe

### 3. Pricing Structure

- **Standard rate:** £995/month
- **BDM floor:** £495/month
- **Revenue split:** Standard rate minus BDM rate = revenue commission

## Setup Instructions

### Phase 1: Static Pages (Live Now)

The main landing page and T&Cs are fully functional as static HTML. No backend needed yet.

**Deployed at:** `https://installsmart.ai/websites/`

### Phase 2: Dynamic Discount Validation (TODO)

The main page currently accepts discount codes but **does not validate them yet**. You need to build a backend API for:

1. **Discount Code Validation** - Check if code is valid, not expired, not exceeded max uses
2. **Dynamic Pricing** - Return adjusted price based on code
3. **Stripe Checkout Session** - Generate Stripe link with correct amount

#### Backend Endpoint Example

```
POST /api/checkout
{
  "discountCode": "BDM123ABC",  // optional
  "email": "customer@example.com"
}

Response:
{
  "sessionId": "cs_live_...",
  "price": 49500,  // in pence
  "discount": 495,  // amount saved
  "checkoutUrl": "https://checkout.stripe.com/pay/cs_live_..."
}
```

#### Option A: Use Stripe Discount Codes Natively

1. Create discount codes in Stripe dashboard
2. Validate against Stripe API
3. Reference in checkout session

**Pros:** Simple, Stripe handles everything  
**Cons:** Limited to Stripe's UI for creating codes

#### Option B: Custom Backend Service

Deploy a serverless function (AWS Lambda, Vercel, Render) that:

1. Validates code against database
2. Queries Stripe for price ID
3. Creates checkout session with coupon
4. Returns checkout URL

**Pros:** Full control over BDM pricing tiers, UI, reporting  
**Cons:** Requires backend infrastructure

### Phase 3: BDM Admin Dashboard (Live Now)

Located at `/websites/admin/`

**Current Implementation:** Mock authentication with localStorage (for demo)

**Real Implementation TODO:**

1. Replace localStorage with real database (Firebase, PostgreSQL, etc.)
2. Add real auth (Firebase Auth, OAuth, etc.)
3. Connect to backend API for code validation
4. Real reporting on code usage and revenue

## Stripe Integration

### Required Setup

1. Create Stripe products:
   - Product ID: `prod_websites`
   - Price (standard): `price_websites_995` (£995/month)
   - Price (keep multiple prices for different BDM tiers or use dynamic pricing)

2. Create Stripe API keys (already in MEMORY.md)
3. Set up webhooks for subscription events

### Checkout Flow

1. Customer clicks "Proceed to Checkout"
2. Frontend calls `/api/checkout` with discount code
3. Backend validates code, gets correct price, creates Stripe session
4. Redirects to Stripe checkout
5. After payment, webhook updates your database
6. Send welcome email to customer

## Implementation Roadmap

**Week 1:** Backend API for discount validation + Stripe integration  
**Week 2:** Wire up discount codes to main page  
**Week 3:** Connect BDM admin dashboard to real database  
**Week 4:** QA, testing with real BDM partners  

## Questions?

- **Discount logic:** sat@installsmart.ai
- **Stripe setup:** See MEMORY.md for API keys
- **BDM partnerships:** Contact Sat directly

---

**Last Updated:** April 2026  
**Status:** Static pages live, dynamic pricing in development
# Last updated: Mon Apr 13 10:40:03 BST 2026
<!-- Rebuild trigger Tue Apr 14 19:42:00 BST 2026 -->
