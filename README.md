# AI Video Tool

## 🧠 Features
- Script Generation via OpenAI
- Video Generation via RunwayML/Sora
- OAuth Login for YouTube & TikTok
- Autoposting Scheduler
- Media Library & Video Player

## 🚀 Deploy
- [![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/YOUR_GITHUB_USERNAME/ai-video-tool)
- [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/Vp3yyP)

## 🛠 Environment Variables
```
OPENAI_API_KEY=
RUNWAY_API_KEY=
DATABASE_URL=
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REDIRECT_URI=
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
TIKTOK_REDIRECT_URI=
```

## 📦 Scripts
```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm run start       # Run production build
npm run autopost    # Run scheduled posting logic
```