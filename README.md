# AdSync AI 🚀

**AI-Powered Landing Page Personalization Engine**

AdSync AI is a structured AI system that aligns landing page content with ad intent to improve message match and conversion potential.

Instead of generating new pages, it intelligently **rewrites key sections of an existing landing page** while preserving structure and meaning.

---

## ✨ Demo

🔗 Live Demo: https://adsyncai.vercel.app

---

## 🧠 Problem

Ad campaigns often drive traffic to landing pages that don’t match the messaging of the ad.

This leads to:

* ❌ Poor user experience
* ❌ Lower conversion rates
* ❌ High drop-offs

---

## 💡 Solution

AdSync AI analyzes:

* The **ad creative**
* The **landing page content**

…and generates a **personalized version of the same page**, ensuring:

* ✅ Message alignment
* ✅ Consistent tone
* ✅ Improved CTA relevance

---

## ⚙️ How It Works

The system follows a structured AI pipeline:

```text
Ad Input → Analyze → Extract Page → Generate → Verify → Output
```

### 🔹 1. Planner (Ad Analysis)

Extracts:

* Audience
* Offer
* Tone
* Intent

### 🔹 2. Analyzer (Page Parsing)

Scrapes and extracts:

* Headline
* CTA
* Key paragraph

### 🔹 3. Executor (Content Generation)

Rewrites content while:

* Keeping structure intact
* Preserving meaning
* Improving alignment

### 🔹 4. Verifier (Validation Layer)

Checks:

* Relevance to ad
* Tone consistency
* No hallucinated claims

If invalid → **regenerates once**

---

## 🧩 Tech Stack

* **Frontend:** Next.js (App Router), Tailwind CSS, Framer Motion
* **Backend:** Next.js API Routes
* **AI:** Groq API (LLaMA 3)
* **Scraping:** Axios + Cheerio

---

## 🛡️ Guardrails & Design Decisions

### ✅ Controlled Output

* Strict JSON responses
* No free-form generation

### ✅ No UI Breakage

* Only text is modified
* No DOM structure changes

### ✅ Hallucination Prevention

* Prompt constraints
* Verifier checks
* Retry mechanism

### ✅ Reliability Over Perfection

* Graceful error handling
* Fallback extraction strategies

---

## ⚠️ Limitations

* JS-heavy pages may not be fully parsed
* Some websites block scraping
* AI output is not deterministic

---

## 🧪 Testing Approach

Testing was done using **scenario-based validation**, focusing on:

* Input handling
* Output relevance
* Error handling
* Edge cases (invalid URL, vague ad, unreachable pages)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/dharanshetty05/adsync-ai.git
cd adsync-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env.local` file:

```env
GROQ_API_KEY=your_api_key_here
```

### 4. Run the app

```bash
npm run dev
```

---

## 📦 Deployment

Deployed on **Vercel** using serverless architecture:

* Frontend → CDN
* API Routes → Serverless Functions
* AI → Groq API

---

## 🧠 Key Takeaways

This project demonstrates:

* Building a **multi-step AI pipeline**
* Applying **validation layers to unreliable systems**
* Designing with **guardrails instead of blind generation**
* Prioritizing **consistency, safety, and usability**

---

## 👨‍💻 Author

**Dharan Shetty**
Built as part of an AI system design assignment.

---

## 📌 Final Note

This is not just an AI feature.

It is a **controlled system that manages AI uncertainty** to produce reliable, usable outputs.

---
