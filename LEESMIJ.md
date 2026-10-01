# OUI.E Photography: website

Statische website (HTML/CSS/JS, geen build nodig). Open `index.html` of zet de map online bij een host (Netlify, Vercel, Combell, one.com, …).

## Structuur
- `index.html`: Home (hero, values, services, quote)
- `diensten.html`: Events · Portraits · Lifestyle + werkwijze
- `portfolio.html`: galerij met de beste beelden + lightbox
- `contact.html`: contactgegevens + formulier
- `assets/logo/`: originele logobestanden uit de brand kit (niet aangepast)
- `assets/img/`: foto's van Instagram @oui.e_photography

## Foto toevoegen aan het portfolio
Zet de foto in `assets/img/` en kopieer in `portfolio.html` een regel `<figure class="reveal"><img …></figure>` binnen `<div class="gallery">`.
Tip: gebruik de originele bestanden uit Lightroom (max. ± 2000 px breed) in plaats van Instagram-downloads, voor de beste kwaliteit.

## Contactformulier
Opent nu het mailprogramma van de bezoeker (mailto naar info@ouie.be).
Wil je dat berichten rechtstreeks verstuurd worden, koppel dan een dienst zoals Formspree of Netlify Forms.
