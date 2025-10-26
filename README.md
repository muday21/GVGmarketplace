# GVG Marketplace - Next.js Application

A modern marketplace application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🌐 Deployment

This project is configured for deployment on:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **GitHub Pages**

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── contexts/           # React contexts
├── data/              # Mock data and constants
├── i18n/              # Internationalization
└── types/              # TypeScript type definitions
```

## 🌍 Internationalization

Supports multiple languages:
- English (en)
- Amharic (am)
- Oromo (om)
- Tigrinya (ti)

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Icons:** Lucide React
- **State Management:** React Context
