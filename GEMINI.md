# Project Prompt: WordSense AI

Create a modern, responsive, and professional web application called **"WordSense AI"**.

## Project Overview

WordSense AI is an English-to-Urdu word meaning application powered by the ChatGPT API. Users can search for English words and instantly get:

* Urdu meaning
* One-line English example sentence
* One-line Urdu translation of the example sentence
* Text-to-speech for both English and Urdu
* Smart search with autocorrect suggestions

The UI should be elegant, premium, fast, and mobile-friendly.

---

## Core Features

### 1. English to Urdu Dictionary

When a user searches for an English word, display:

* English Word
* Urdu Meaning
* English Example Sentence (one line)
* Urdu Translation of Example Sentence (one line)

Example:

Word: Tolerance

Meaning: برداشت

Example (English):
Tolerance helps people respect different opinions.

Example (Urdu):
برداشت لوگوں کو مختلف رائے کا احترام کرنا سکھاتی ہے۔

---

### 2. Smart Search Bar

Implement:

* Real-time search
* Autocomplete suggestions
* Spelling correction
* Typo detection
* Search history (optional)

Examples:

If user types:

* tolernce → suggest "Tolerance"
* happines → suggest "Happiness"
* inteligent → suggest "Intelligent"

---

### 3. Color Scheme

Display:

* English searched word in Blue color
* Urdu meaning in Black color
* Example sentences in Dark Gray

Use a clean and premium educational design.

---

### 4. Typography

Use high-quality fonts.

Requirements:

English Font:

* Poppins
* Inter
* Montserrat

Urdu Font:

* Noto Nastaliq Urdu
* Jameel Noori Nastaleeq
* Noto Sans Arabic

Urdu text must be highly readable and properly rendered.

---

### 5. Text-to-Speech

Add speaker icons beside:

* English word
* Urdu meaning
* English example sentence
* Urdu example sentence

Features:

* English voice pronunciation
* Urdu voice pronunciation
* One-click play button
* Use browser SpeechSynthesis API or equivalent

---

### 6. ChatGPT API Integration

Use ChatGPT API for generating:

* Urdu meanings
* Example sentences
* Urdu translations
* Smart word explanations

Requirements:

* Secure API integration
* Environment variable support
* Error handling
* Loading states

---

### 7. Local JSON Word Database

Create a separate page called:

"Built-in Dictionary"

Store predefined words inside a JSON file.

Example:

[
{
"word": "Tolerance",
"meaning": "برداشت"
},
{
"word": "Integrity",
"meaning": "دیانت داری"
}
]

Requirements:

* Dedicated page for JSON words
* Search within JSON words
* Pagination if dataset becomes large
* Clean table/grid layout

---

### 8. Pages

#### Home Page

* Search bar
* Search results
* TTS buttons
* Premium hero section

#### Built-in Dictionary Page

* Display all JSON words
* Search and filter

#### About Page

* Project description
* Technology stack

---

### 9. Technology Stack

Frontend:

* Next.js
* React
* TypeScript
* Tailwind CSS

Backend:

* Next.js API Routes

AI:

* OpenAI ChatGPT API

Database:

* JSON file initially
* Structure ready for future database migration

---

### 10. UI Requirements

Design Style:

* Premium
* Modern
* Clean
* Educational
* Fast

Features:

* Responsive design
* Dark Mode
* Light Mode
* Smooth animations
* Loading skeletons
* Error handling
* SEO optimized

---

### 11. Deliverables

Generate:

* Complete source code
* Folder structure
* API integration
* Sample JSON dataset
* Responsive UI
* Production-ready project

Project Name:
WordSense AI
