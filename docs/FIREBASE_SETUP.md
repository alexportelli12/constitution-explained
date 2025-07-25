# Firebase Environment Configuration

This document explains how Firebase environment variables are configured for both development and production environments.

## Environment Files

### `.env.local` (Development)
- Used for local development
- Contains Firebase configuration for development/testing
- **Should NOT be committed to git** (already in `.gitignore`)

### `.env.production` (Production)
- Used when building for production deployment
- Contains Firebase configuration for the live application
- Safe to commit as these are client-side identifiers (not secrets)

### `.env.example` (Template)
- Template file showing required environment variables
- Copy to `.env.local` and fill in your Firebase project details

## Required Environment Variables

All Firebase configuration requires these environment variables:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com  
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Security Considerations

### Client-Side Variables
- All `VITE_*` variables are **client-side** and will be visible in the built application
- These Firebase config values are **not secrets** - they're public identifiers for your Firebase project
- Firebase security is handled by **Firestore Security Rules** and **Firebase Auth**, not by hiding these config values

### What IS Secure
- Firestore Security Rules (configured in Firebase Console)
- Firebase project permissions and IAM roles
- Server-side Firebase Admin SDK keys (not used in this project)

## Build Scripts

### Development
```bash
npm run dev          # Uses .env.local
npm start           # Uses .env.local  
```

### Production
```bash
npm run build.production    # Uses .env.production
npm run deploy             # Build + deploy to Firebase
npm run deploy.hosting     # Deploy only hosting (faster)
```

## Firebase Project Setup

1. **Create Firebase Project**: Go to [Firebase Console](https://console.firebase.google.com/)
2. **Enable Firestore**: Database → Create database → Start in production mode
3. **Configure Security Rules**: See `firestore.rules` for analytics collection rules
4. **Get Config Values**: Project Settings → General → Your apps → Firebase SDK snippet

## Firestore Integration

The application uses Firestore for:
- **Analytics Events**: User interaction tracking
- **Anonymous Data**: No personal information stored

### Collections Used
- `analytics_events`: Page views and button clicks

### Security Rules
Analytics data is write-only from client, read-only for authenticated admin users.

## Troubleshooting

### Missing Environment Variables
If Firebase initialization fails, check:
1. All `VITE_FIREBASE_*` variables are set in your `.env.local`
2. No trailing spaces or quotes in environment variable values
3. Firebase project is active and Firestore is enabled

### Production Deployment Issues
1. Ensure `.env.production` has correct values for your Firebase project
2. Run `npm run build.production` to test production build locally
3. Check Firebase project quotas and billing if needed

### Local Development
- Firebase config automatically detects localhost and disables analytics tracking
- No data will be written to Firestore when running on `localhost:*`