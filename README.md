# Holly Poppins — Availability & Booking Site

A personal booking and availability site with a Firebase-backed admin panel. Built as a reusable template — `site-config.js` holds everything specific to one site.

## Stack

- Static HTML/CSS/JS — no build step
- Firebase Firestore for settings, bookings and testimonial submissions
- Firebase Auth (email/password) for admin login
- PHP endpoints for email, calendar push and iCal sync
- GitHub Actions SFTP deploy with an SSH key

## Setting up a new site

### 1. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a project
2. Add a **Web app** and copy the config object
3. Enable **Firestore** (start in production mode)
4. Enable **Authentication → Email/Password**
5. **Turn off public sign-ups:** Authentication → Settings → User actions → uncheck **Enable create (sign-up)**. Otherwise anyone can create an account using the site's public API key.
6. Create the admin user under Authentication → Users, and copy their **User UID**
7. Add your domain to **Authentication → Settings → Authorized domains**

### 2. Make that user an admin

In Firestore → Data, create a collection named `admins` with one document whose **document ID is the admin's User UID**. Fields don't matter; add one such as `name` = `Holly`.

Only users listed here can use the admin panel, read bookings or calendar credentials, or call the admin-only PHP endpoints. Being signed in is not enough.

### 3. Publish the Firestore security rules

Copy the contents of [`firestore.rules`](firestore.rules) into Firestore → Rules and click **Publish** (or run `firebase deploy --only firestore:rules`). Do step 2 first, or the admin panel will lock you out.

The rules:

- let anyone read the public `config` settings
- let visitors **create** bookings and testimonials, but only well-formed ones with sensible lengths, a valid email and status `pending` / `approved: false`
- keep `bookings`, `testimonials`, `private` (calendar credentials) and config writes admin-only

### 4. Edit site-config.js

```js
const SITE_CONFIG = {
    firebase: { /* paste your Firebase config here */ },

    siteName: "Your Name",
    navEmoji: "☂",
    tagline:  "Your tagline here",
    heroDesc: "A short description of what you offer.",

    colors: { navy: "#1B2A4A", navyLight: "#2C3E6B", gold: "#D4AF37", goldLight: "#F0D060", cream: "#FAF6ED" },

    defaultServices: [ /* edit or replace */ ],
    defaultTestimonials: [],   // real ones are approved in the admin panel
    defaultFaq: [ /* edit or replace */ ],
};
```

The PHP endpoints read `projectId` and `siteName` from this file too, so there is nothing to configure on the server.

Until the first testimonial is approved, the Testimonials section shows a short "kind words … will be shared here soon" note, so the space is held without inventing reviews.

### 5. Deploy key (SSH)

The deploy signs in to the server with an SSH key, not a password.

1. Create a key pair for this site only (no passphrase, since GitHub Actions uses it unattended):
   ```sh
   ssh-keygen -t ed25519 -N "" -C "hollypoppins-deploy (GitHub Actions)" -f ~/.ssh/hollypoppins_dreamhost
   ```
2. Install the **public** key on the server for the SFTP user (asks for that user's password once; the user needs shell access, or use your host's panel to add the key):
   ```sh
   cat ~/.ssh/hollypoppins_dreamhost.pub | ssh USER@hollypoppins.com "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
   ```
3. Add the **private** key as a GitHub secret:
   ```sh
   gh secret set SSH_PRIVATE_KEY < ~/.ssh/hollypoppins_dreamhost
   ```
4. Push. Once a deploy succeeds with the key, delete the `SFTP_PASSWORD` secret.

The server's host keys are pinned in [`.github/known_hosts`](.github/known_hosts), so the deploy refuses to upload anywhere else. If your host ever changes its keys, refresh that file with `ssh-keyscan hollypoppins.com`.

### 6. GitHub secrets

| Secret | Value |
|---|---|
| `SFTP_USER` | Your hosting (SFTP) username |
| `SSH_PRIVATE_KEY` | The deploy key from step 5 |
| `SFTP_PASSWORD` | Optional. Only used if the key is refused; delete it once the key works |

For a new domain, update the hostname and path in `.github/workflows/deploy.yml` and regenerate `.github/known_hosts`.

### 7. Push to deploy

```sh
git push
```

GitHub Actions uploads the site files to the server. The admin panel is at `/admin.html`.

## Files

| File | Purpose |
|---|---|
| `site-config.js` | Everything specific to one site |
| `index.html` | Public site |
| `admin.html` | Password-protected admin panel |
| `mailer.php` | Sends the emails for form submissions, built from the saved templates |
| `cal-push.php` | Adds confirmed bookings to a calendar: email (.ics), Google Calendar, Apple iCloud/CalDAV. Admin only |
| `ical-proxy.php` | Fetches an iCal feed for "Sync from Calendar" (works around CORS). Admin only |
| `hp-lib.php` | Shared PHP helpers: admin check, rate limits, Firestore reads |
| `email-templates.json` | Default email templates, shared by `mailer.php` and the admin editor |
| `umbrella.png` | Hero image |
| `firestore.rules` | Firestore security rules (publish in the Firebase console; not deployed to the server) |
| `.github/workflows/deploy.yml` | Auto-deploy on push to `main` |
| `.github/known_hosts` | Pinned SSH host keys for the server |

## Admin features

- **Settings** — email, Venmo, Cash App, Zelle, iCal sync URL, email templates, auto-add to calendar
- **Calendar** — click-to-toggle availability, import from Google/Apple/Outlook, and booking requests
- **Services** — toggle on/off, edit icon, name, description
- **Rates** — private reference rates (shown publicly only if you choose)
- **Testimonials** — approve or dismiss submitted ones, edit or remove approved ones
- **FAQ** — add, edit, delete questions and answers

## Security and spam protection

- **Email can't be used as a relay.** The page only tells `mailer.php` which form was sent and what the visitor typed. The server picks the recipients: notifications go only to the contact email in Settings, and confirmations only to the visitor's own address, using the saved templates. Confirm/decline emails need a signed-in admin.
- **Rate limits.** Each visitor IP can trigger 5 form emails an hour, with a ceiling of 100 a day for the whole site.
- **Spam trap.** Each form has a hidden field that people never see but bots fill in, and submissions made within 3 seconds of loading the page are ignored.
- **Database validation.** The Firestore rules reject malformed or oversized bookings and testimonials.
- **Admin-only endpoints.** `cal-push.php` and `ical-proxy.php` require the signed-in admin's Firebase token, which the server checks against the `admins` list. They only make HTTPS requests.
- **Escaping.** Everything visitors submit is escaped before it is shown, on both the public site and the admin panel.

If spam still gets through, the next step is **Firebase App Check** with reCAPTCHA (Firebase console → App Check), which blocks requests that don't come from the real site.
