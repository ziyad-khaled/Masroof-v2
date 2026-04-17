# Masroof v3 — مصروف 💸
Personal spending tracker PWA — installable on Android & iPhone, built around my financial plan.

---

## Features

### 🏠 Home
- Live budget bars for Needs, Wants, and Sinking Fund — turn amber at 80%, red at overflow
- **Smart Quick Add** — one-tap buttons driven by a 6-month recommendation engine (frequency × recency scoring). No manual setup needed; the more you use the app, the better it knows your habits.
- Summary stats: entries, cash total, digital total
- Full expense list with Needs/Wants badges per entry

### ➕ Add
- Cash / Digital / Sinking Fund type toggle
- Arabic name support (auto right-to-left)
- 16 emoji categories 
- Over-budget warning flashes if a Wants entry would exceed your cap

### 📊 Stats
- 6-month spending trend bar chart
- Needs / Wants / Sinking split vs. caps
- Category breakdown for current month
- Daily spending chart

### 🐷 Sinking Fund
- Running balance (contributions minus all withdrawals, ever)
- Monthly progress bar toward your contribution target
- Log withdrawals separately (don't pollute Wants budget)
- Wishlist with checkboxes (pre-loaded with your items: shoes, clothes, license, gift, pull-up bar, weights)
- Full transaction history

### 🎯 Goals
- 608,000 EGP marriage/house goal tracker
- % progress bar, remaining amount, estimated completion date
- Manually update your saved balance (for MNT-Halan/Thndr)
- Savings allocation breakdown: 🪙 Gold 50% / 📈 Stocks 20% / 🏦 Bank 30%

### 📤 Export
- Excel (.xlsx) export matching your original April/March/May file format
- CSV export
- Full JSON backup and restore (preserves all expenses, sinking fund, wishlist, goal)

### ⚙️ Settings 
- **Edit Needs / Wants / Sinking Fund budget caps** — all budget bars and warnings update instantly
- **Category → Needs/Wants mapping** — reclassify any emoji category to Needs or Wants
- **Smart Quick Add preview** — see what the recommendation engine has selected and refresh on demand
- Insight card shows your most frequent category over 6 months

---

## How the Smart Quick Add works

The recommendation engine scores every unique item you've ever logged using:

```
score = sum of (recencyWeight) per occurrence
recencyWeight = 1.0 (this month) → 0.5 (6 months ago)
```

Items you buy often AND recently score highest. Items you bought a lot but stopped buying fade out naturally. The top 5 scored items appear as Quick Add chips on the Home screen. The engine re-runs every time you add an expense — no manual curation needed.

---

## How to host (free, 2 minutes)

### Option 1 — Netlify Drop (easiest, no account needed)
1. Go to **https://app.netlify.com/drop**
2. Unzip and drag the `spending-pwa` folder onto the page
3. You get a URL like `https://random-name.netlify.app`
4. Open on your phone → install

### Option 2 — GitHub Pages
1. Create a GitHub account → New repo → Upload all 6 files
2. Settings → Pages → Deploy from main branch
3. URL: `https://yourusername.github.io/masroof`

---

## Install on your phone

**Android (Chrome):**
1. Open the hosted URL in Chrome
2. Banner appears at top: "Install app on home screen" → tap Install
3. Or: Chrome menu (⋮) → "Add to Home Screen"

**iPhone (Safari only):**
1. Open URL in Safari
2. Share button (□↑) → scroll down → "Add to Home Screen" → Add

---

## Auto-detect bank SMS on Android (MacroDroid)

1. Install **MacroDroid** from Play Store (free)
2. New Macro → Trigger: **SMS Received** from your bank (CIB, NBE, Banque Misr)
3. Action: **Launch Website** with URL:
   ```
   https://your-app-url/?amount={EXTRACTED_AMOUNT}&name=Digital+Payment
   ```
4. Use MacroDroid's variable extraction on the SMS body
5. SMS regex for most Egyptian banks: `EGP ([\d,]+\.?\d*)`
6. The app opens with amount pre-filled in Digital mode, ready to confirm

---

## What to do next (recommended roadmap)

### Phase 1 — Right now (no code needed)
- Host on Netlify (5 min) and install on your phone
- Add your first few real expenses to seed the Quick Add recommendations
- Update your current savings balance in the Goals tab
- Tick off any wishlist items you've already bought

### Phase 2 — After 1 month of data
- Review the Stats page: check if Wants is consistently near the cap — if yes, either raise the cap in Settings or cut a category
- The Quick Add chips will now reflect your actual habits; compare them to your defaults

### Phase 3 — Android automation (when ready)
- Set up MacroDroid for bank SMS parsing — this closes the biggest tracking gap (digital payments currently need manual entry)
- Test with one bank first, then add more

### Phase 4 — Future features to consider
- **Income logging**: add a 💰 Income tab to track salary and freelance deposits; unlocks automatic savings rate calculation
- **Month-over-month comparison**: "You spent 340 EGP more on Wants in April vs March"
- **Sinking fund forecasting**: show how many months until your wishlist is fully funded at current withdrawal rate
- **Recurring expenses**: mark items like Internet/phone bill as recurring so they auto-appear each month
- **Currency converter**: if freelance income arrives in USD, auto-convert at current rate

---

## File structure
```
spending-pwa/
├── index.html      ← Full app (all HTML, CSS, JS in one file)
├── sw.js           ← Service worker (offline support)
├── manifest.json   ← PWA manifest (install metadata)
├── icon-192.svg    ← App icon (home screen)
├── icon-512.svg    ← App icon (splash screen)
└── README.md       ← This file
```
