# WebScraperAPI Technical Test Solution

---

## Table of Contents

- [Introduction](#introduction)
- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
- [Behind the Scenes](#behind-the-scenes)
  - [Getting Sentiment Right](#getting-sentiment-right)
  - [Scraping & Screenshotting](#scraping--screenshotting)
  - [The Face of the App](#the-face-of-the-app)
- [How to Get it Running](#how-to-get-it-running)
- [Tailwind and My Takeaways](#tailwind-and-my-takeaways)
- [Ideas to Make It Even Better](#ideas-to-make-it-even-better)
- [The Cool Thing I Added](#the-cool-thing-i-added)

---

## Introduction

So, I built this as a solution for the technical test over at WebScraperAPI. It’s a neat mix of a web scraper, a sentiment analysis tool, a REST API, and a user-friendly interface. The tech stack? Nest.js, Next.js, and Tailwind.

---

## API Documentation

### Endpoints

- **POST /scrape**

  - **What it does:** Give it a URL, and it'll fetch the web content for you.
  - **Input:** A `url` in the JSON body.
  - **What you get:** Multiple tidy JSONs with:
    - `title`
    - `short_description`
    - `long_description`
    - `category`
    - `sentiment`
    - `words` (how many words are there)
    - `publisher` details like:
      - `name`
      - `description`
      - `image`

- **POST /browser/screenshot**
  - **What it does:** Takes a quick snap of the webpage you specify.
  - **Input:** A `url` in the JSON body.
  - **What you get:** A base64 encoded image of the page.

And yeah, for those who like it detailed, there’s Swagger documentation at **GET /api**.

---

## Behind the Scenes

### Getting Sentiment Right

I whipped up the SentimentAnalysisService to gauge blog post sentiments.

Here’s the breakdown:

- **Lexicon & Word List:** I pulled together a lexicon, getting words straight from the blog posts. Each word has a sentiment score attached.
- **Cleaning Up Text:** I clean up the text by getting rid of punctuation and making everything lowercase.
- **Splitting the Text:** The cleaned text is split into individual words or 'tokens'.
- **Going Through Words & Phrases:** I first looked at n-grams (phrases), calculated their sentiment, then moved on to individual words (unigrams), making sure I'm not counting anything twice.
- **Scoring:** Words or phrases are matched against the lexicon. If there's a match, the sentiment score gets adjusted.
- **The Final Touch:** I normalize scores between [-1, 1] and categorize the text based on some thresholds (0.5 and -0.5) I picked.

**Pros:**

- Custom-built for this content, it’s pretty accurate.
- The mix of phrases and single words captures sentiment nuances.

**Cons:**

- Since it’s tailored for this content, it might not be spot on for other sources.

### Scraping & Screenshotting

The BrowserService does two things: screenshots and HTML fetching. It's built to handle one type of hiccup: if a site can’t be reached.

Then there's the ScraperService that does the heavy lifting of extracting website content. I made it resilient, so if web devs change class names, no biggie.

### The Face of the App

Even though it’s not a massive app, I opted for Next.js with Tailwind and I added dependency injection via `tsyringe`, and for forms, I went with `react-hook-form` and `yup`. I rolled my own JsonViewer - it’s interactive, lets you view JSON, play with it, and even grab parts of it or export it. The interface starts with a URL input, a screenshot confirmation, and finally, a neat JSON viewer. Oh, and I added notifications because why not?

---

Got it! Here's the more concise and README-style section:

---

## How to Get it Running

- **Setup Environment Variables:**

  - Dive into both the `backend/` and `frontend/` directories.
  - Do a quick `cp .env.example .env` to configure the necessary environment variables.

- **Install the Goodies:**

  - While still in those directories, hit `yarn` to fetch all the packages.

- **Fire it Up:**
  - In the `frontend/`, kick things off with `yarn build && yarn start`.
  - In the `backend/`, a simple `yarn start` will do the trick.

Oh, and make sure that puppeteer plays nice on your machine.

---

## Tailwind and My Takeaways

Delving into Tailwind was a breeze. Its documentation is solid, and using it was quite the treat.

---

## Ideas to Make It Even Better

- **Jazzing up the JsonViewer:** Adding search, in-place edits, and more export options.
- **Visual Touch:** Presenting data in graphs or charts for a snazzier look.

---

## The Cool Thing I Added

**Screenshot Confirmation:** Here's something unique - before scraping, you get a screenshot of the page. It’s like a quick peek before diving in, ensuring you're looking at the right content. A small touch, but it adds a nice layer of confidence.

---
