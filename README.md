# Interactive Diagnostic Haematology

An interactive learning app for Clinical Pathology postgraduate students (MSc and MD). It works in any browser, installs on phones from the link, and works offline after the first visit.

Four modules (normal blood and marrow cells, red cell disorders, white cell disorders and leukaemia, haemostasis and thrombosis), each with lessons, an atlas, flashcards, an MCQ quiz, case studies, diagnostic workups and calculators, animations and slide decks.

## Layout

- `src/` holds the source: `data.js` and `m2-data.js` to `m4-data.js` (teaching content), `myimages.js` (the My images feature), `cells.js` (the cell illustrations), `app.js` (the app) and `shell.html` (layout and styles).
- `build.py` combines the source into one self-contained `docs/index.html`, plus the web manifest and the offline service worker.
- `docs/` is the published site, served by GitHub Pages.

## Updating

Edit the files in `src/`, run `python3 build.py`, and commit both `src/` and `docs/`.

## Publishing with GitHub Pages

In the repository's **Settings → Pages**, set the source to **Deploy from a branch**, branch `main`, folder `/docs`.

## Content and copyright

All text is original teaching material. Cell images are original drawings or openly licensed photos, credited in the app. The reference textbooks are cited as further reading.

**My images.** Inside the app you can attach your own pictures (for example photos or screenshots of textbook figures) to any atlas cell or case study. They are stored only in your browser on your device (IndexedDB), never uploaded or committed, and can be moved between devices with the backup file on the My images page.
