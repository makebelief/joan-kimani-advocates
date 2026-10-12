# Joan Kimani & Company Advocates — Website v2

Faithfully follow the C.O. Were reference website structure: navy/gold, image-led hero, photographic legal practice cards, and familiar navigation and footer. The advocate portrait appears **once on the homepage** (Our Advocate section) and **once on the Our Advocate page**. Original 4K transparent brand logo, cropped without downscaling, appears in navigation and footer.

Practice-area/hero/insight images are linked to Pexels image URLs. A network connection is required to render these images. No images were generated for the rebuild.

## Deploy replacement into existing repo

Unzip the file, go into the extracted `joan-kimani-advocates` folder, and run:

```bash
git add -A && git commit -m "Match reference design, fix imagery and transparent 4K branding" && git push origin main && npx vercel --prod
```

If your existing checkout has a different history, copy the updated site files into the existing linked repository before running the commands.

The contact form opens an email composition, and WhatsApp links to 254716337451.


### 2026 Reference-layout revision
The full hero image now sits behind overlaid text and uses a licensed-for-free-use Pexels image of Black legal professionals. The WhatsApp icon mirrors the small circular fixed control on the reference site. Header logo uses `assets/joan-kimani-logo-transparent-4k.png` (3840 pixels wide). Footer uses `assets/joan-kimani-logo-footer-4k.png` (3840 pixels wide) to retain transparent background and show white lettering on navy. The white background variant is also included. Photos are requested directly from Pexels over HTTPS and require internet access.


### Distinct images and WhatsApp fix
22 different Pexels photo IDs are mapped to the hero, about photo, 6 home practice tiles, 3 insight cards, and 11 practice-area pages. See `PHOTO-SOURCES.md`. No repeated stock images in these placements. The only intentionally repeated photograph is the firm's advocate portrait: once on the homepage, once on the Our Advocate page. The old floating WhatsApp pill was removed, leaving one round, SVG-only, Were-style WhatsApp button. Its number is +254 716 337 451.
