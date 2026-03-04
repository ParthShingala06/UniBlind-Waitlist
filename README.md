# UniBlind — Landing Page

Verified anonymous community for university students.

## Deploy to Vercel (2 minutes)

### Option A: GitHub + Vercel (recommended)
```bash
# 1. Create repo on GitHub, then:
git init
git add .
git commit -m "UniBlind landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/uniblind-site.git
git push -u origin main

# 2. Go to vercel.com → New Project → Import your repo → Deploy
```

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Local Development
```bash
npm install
npm run dev
# → http://localhost:3000
```

## Tech
- Next.js 14 (App Router)
- React 18
- Google Fonts (Plus Jakarta Sans, Space Grotesk)
- Zero dependencies beyond Next.js
