# WordSense AI - Premium English-to-Urdu Dictionary

WordSense AI is a complete, production-ready, globally deployable Next.js web application that leverages state-of-the-art AI to translate English words into beautifully rendered, culturally context-aware Urdu translations.

---

## 🌟 Key Features

*   **English-to-Urdu Dictionary**: Provides Urdu meanings and usage examples in both English and Urdu with native pronunciations.
*   **Intelligent Autocomplete & Autocorrect**: Holds a list of 35,000 common English words and calculates Levenshtein distance on every keystroke (debounced 150ms) to show the 5 closest spelling matches in a fully keyboard-accessible dropdown.
*   **Premium AI Engine**: Integrated with OpenAI's `gpt-3.5-turbo` using strict JSON schemas to enrich vocabulary lookups dynamically.
*   **Performance Optimization**: Utilizes server-side caching (24-hour LRU cache), debounced client requests, and pre-rendered offline results to minimize API latencies.
*   **Sliding Window Rate Limiting**: Built-in sliding window rate limiter allowing up to 10 requests per minute per IP to protect the API.
*   **Beautiful Urdu Typography**: Styled exclusively with the Google Font `Noto Nastaliq Urdu` loaded dynamically via Next.js Font Optimization.
*   **Words Bank Page**: Displays 50+ pre-stored core vocabulary words in a responsive CSS Grid with client-side real-time filtering.
*   **Text-to-Speech (TTS)**: Built-in speaker buttons triggering browser speech synthesis (utilizing `en-US` and native `ur-PK` Urdu voices with voice-presence tooltips and pulse animations).
*   **Perfect Dark Mode Support**: Complete transitions between light and dark modes using `next-themes` and Tailwind CSS styles.
*   **Full Accessibility & SEO**: Complete ARIA attribute structures, keyboard navigation, dynamic Open Graph cards, Twitter metadata, and structured JSON-LD schema search indicators.

---

## 🛠️ Tech Stack

*   **Core**: Next.js 14+ (App Router), TypeScript, React 19
*   **Styling**: Tailwind CSS
*   **State & Animations**: Framer Motion
*   **Icons**: React Icons (`HiOutlineSearch` & `FiVolume2`)
*   **Notifications**: React Hot Toast
*   **Validation**: Zod
*   **Spelling Distance**: Fast Levenshtein

---

## 🚀 Local Setup

### Prerequisites

*   Node.js (v18 or higher)
*   NPM or Yarn
*   An OpenAI API Key

### Installation

1. Clone the repository and navigate to the directory:
   ```bash
   git clone <repository-url>
   cd meaning_word
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🐳 Deployment to Google Cloud Run (Docker)

This repository includes a multi-stage `Dockerfile` optimized for building a minimal Next.js standalone container.

1.  **Build the Docker Image**:
    ```bash
    docker build -t wordsense-ai .
    ```

2.  **Run the Container Locally**:
    ```bash
    docker run -p 3000:3000 -e OPENAI_API_KEY="your_api_key" wordsense-ai
    ```

3.  **Deploy to Google Cloud Run**:
    *   Push the built image to Google Artifact Registry (GAR).
    *   Deploy the service to Cloud Run:
        ```bash
        gcloud run deploy wordsense-ai \
          --image gcr.io/your-project-id/wordsense-ai \
          --platform managed \
          --region us-central1 \
          --allow-unauthenticated \
          --set-env-vars="OPENAI_API_KEY=your_openai_api_key"
        ```

---

## ⚡ Deployment to Vercel

1. Install the Vercel CLI or link your repository to GitHub:
   ```bash
   npm install -g vercel
   ```

2. Run the command from the root directory:
   ```bash
   vercel
   ```

3. Add your environment variables in the Vercel dashboard settings:
   *   `OPENAI_API_KEY`: Your OpenAI ChatGPT API key.
   *   `NEXT_PUBLIC_SITE_URL`: The production domain URL (e.g., `https://wordsense-ai.vercel.app`).

4. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## 📁 File Structure

```
├── app/
│   ├── api/
│   │   └── meaning/
│   │       └── route.ts         # OpenAI API + cache + rate limiter
│   ├── about/
│   │   └── page.ts              # Explains the application mission
│   ├── words-bank/
│   │   └── page.tsx             # Pre-stored core vocabulary grid
│   ├── globals.css              # Custom font classes + float keyframes
│   ├── layout.tsx               # Noto Nastaliq font + SEO metadata
│   ├── page.tsx                 # Main search card layout
│   ├── manifest.ts              # PWA manifest
│   ├── robots.ts                # Dynamic robots.txt
│   └── sitemap.ts               # Dynamic XML sitemap
├── components/
│   ├── Footer.tsx               # Branding & Copyright elements
│   ├── Navbar.tsx               # Navigation items & Dark Mode toggle
│   ├── RecentSearches.tsx       # localStorage logs & Random word trigger
│   ├── SearchBar.tsx            # Debounced Levenshtein autocomplete input
│   ├── SkeletonCard.tsx         # Animated loading visual
│   ├── WordCard.tsx             # Result card with audio, share, & copy
│   └── WordsCard.tsx            # Words grid item component
├── data/
│   └── words.json               # Pre-stored 50+ Urdu entries database
├── hooks/
│   └── useSpeech.ts             # Audio synthesis & voice availability hook
├── lib/
│   ├── cache.ts                 # LRU Cache implementation
│   ├── logger.ts                # Server-side audit logging
│   ├── randomWords.ts           # Curated list of 100 random words
│   ├── rateLimiter.ts           # Sliding Window rate limiting mechanism
│   └── wordList.ts              # Autocorrect corpus (35k English words)
├── Dockerfile                   # Containerized image optimizer
└── README.md                    # Operational manual
```

---

## 🔒 License

Distributed under the MIT License. See `LICENSE` for more information.
