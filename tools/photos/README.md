# Cell photos

`src/photos.js` is generated. Do not edit it by hand.

- `selections.json` lists the chosen photo for each cell id, the crop box (fractions of the image), and the caption.
- `sources.json` holds each photo's Wikimedia Commons title, licence, author and page.
- `make_photos.py selections.json sources.json ../../src/photos.js` crops each image to a square, resizes it, embeds it as a JPEG data URI and keeps the credit fields. It reads the downloaded images from `data/th/<label>.jpg`.

Rules: use only CC0, public domain, CC BY or CC BY-SA images. Every photo shows a credit line (author, licence, source link) in the cell panel, and the full list is on the Sources page. Textbook figures, the ASH Image Bank, BloodLine and the Mindray atlas are link-only, because their terms don't allow republishing.
