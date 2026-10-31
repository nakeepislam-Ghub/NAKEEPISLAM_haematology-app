# Interactive Diagnostic Haematology

An interactive learning app for Clinical Pathology postgraduate students (MSc and MD). It works in any browser, installs on phones from the link, and works offline after the first visit.

**Module 1: Normal blood and marrow cells** has lessons, a cell atlas, flashcards, an MCQ quiz, case studies, diagnostic workups and calculators, animations and slide decks. Modules 2 to 4 (red cell disorders, white cell disorders and leukaemia, haemostasis) are in preparation.

## Layout

- `src/` holds the source: `data.js` (all teaching content), `cells.js` (the cell illustrations), `app.js` (the app) and `shell.html` (layout and styles).
- `build.py` combines the source into one self-contained `docs/index.html`, plus the web manifest and the offline service worker.
- `docs/` is the published site, served by GitHub Pages.

## Updating

Edit the files in `src/`, run `python3 build.py`, and commit both `src/` and `docs/`.

## Publishing with GitHub Pages

In the repository's **Settings → Pages**, set the source to **Deploy from a branch**, branch `main`, folder `/docs`.

## Content and copyright

All text is original teaching material. Cell images are original drawings or openly licensed photos, credited in the app. The reference textbooks are cited as further reading.
