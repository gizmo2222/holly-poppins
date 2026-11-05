# Holly Poppins — hollypoppins.com

Holly's availability and booking site. This repo is a **theme** of [GroveMinder](https://github.com/gizmo2222/groveminder): it holds only what is specific to hollypoppins.com. The pages, `site-core.js`, the PHP endpoints, the email templates and the Firestore rules are GroveMinder's, fetched at a pinned version on every deploy, so nothing here is a copy of the product.

## Files

| File | Purpose |
|---|---|
| `site-config.js` | Everything specific to this site: Firebase project, name, tagline, theme, wording, default services and FAQ. Data only |
| `umbrella.png` | Hero image (named by `heroImage` in `site-config.js`) |
| `.github/workflows/deploy.yml` | Deploys on push to `main`; pins the GroveMinder version (`ref`) |
| `.github/known_hosts` | Pinned SSH host keys for hollypoppins.com |

To change how the site looks or works beyond these files (layout, forms, admin panel, emails), change GroveMinder, tag a new version there, then upgrade this site (below).

## Editing the site

Edit `site-config.js`. The options are documented in the GroveMinder README under [Making a theme](https://github.com/gizmo2222/groveminder#4-making-a-theme). For this site:

- `theme: "coastal"` is Holly's palette: navy `#1B2A4A`, gold `#D4AF37`, cream `#FAF6ED`. Add a key to `colors` only to move one colour away from the preset.
- `themePicker: false` fixes the site on that theme and hides the Appearance section in the admin panel. Remove the line to let the admin switch between GroveMinder's presets.
- `heroImage: "umbrella.png"` shows the umbrella in the hero. The deploy uploads the file named here; list any other images in `THEME_FILES` in `deploy.yml`.
- `copy` holds Holly's wording (nav labels "Book Me" / "Ask Holly", form placeholders, the rates intro). Anything left out uses GroveMinder's neutral default.
- Keep `projectId` and `siteName` in double quotes: the PHP endpoints read them from this file.

Services, FAQ, testimonials, contact and payment details are managed in the admin panel (`/admin.html`) and saved in Firestore; the defaults in `site-config.js` only show until the admin has saved something.

## Preview

With this repo and a GroveMinder checkout side by side (needs Python), from this folder:

```powershell
..\groveminder\tools\preview.ps1 -Theme .
```

Then open `http://localhost:8080/` and `http://localhost:8080/admin.html` (add `-Port 8123` for another port). The preview uses the GroveMinder files as they are in that checkout, which may be newer than the pinned version. PHP is not run, so no emails are sent, but the pages talk to the real `holly-poppins` Firebase project: a form you submit, or a change you save in the admin, is real.

## Deploy

```powershell
git push
```

A push to `main` (or **Run workflow** on the Actions tab) checks out this repo and GroveMinder at the pinned version, then GroveMinder's `tools/deploy.sh` uploads the product's pages and PHP, this repo's `site-config.js` and `umbrella.png` to hollypoppins.com over SFTP.

GitHub secrets on this repo:

| Secret | Value |
|---|---|
| `SFTP_USER` | The hosting (SFTP) username |
| `SSH_PRIVATE_KEY` | The deploy key (see [Deploy key](https://github.com/gizmo2222/groveminder#5-deploy-key-ssh) in the GroveMinder README) |
| `SFTP_PASSWORD` | Optional. Only used if the key is refused; delete it once the key works |

The deploy refuses to upload to a server whose keys are not in `.github/known_hosts`. If the host ever changes its keys, refresh the file:

```powershell
cmd /c "ssh-keyscan hollypoppins.com > .github\known_hosts"
```

## Upgrading GroveMinder

The version is pinned in `.github/workflows/deploy.yml`:

```yaml
ref: v1.0.0
```

Change `ref` to the new GroveMinder tag (or a commit SHA), preview, and push. If the new version changed `firestore.rules`, publish the new rules too (Firebase console → Firestore → Rules, or `firebase deploy --only firestore:rules` from the GroveMinder folder). A push to GroveMinder itself never changes this site.

## Firebase

The site uses the `holly-poppins` Firebase project (Firestore and email/password Auth). Project setup, the `admins` collection, the security rules, the admin features and the spam protection are described in the [GroveMinder README](https://github.com/gizmo2222/groveminder#setting-up-a-new-site).
