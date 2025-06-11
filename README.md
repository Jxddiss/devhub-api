## Firebase Setup

This application uses Firebase Admin SDK for authentication with environment variables configuration.

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard to create your project

### 2. Enable Authentication

1. In your Firebase project, go to **Authentication** > **Sign-in method**
2. Enable the following sign-in providers:
   - **Email/Password**
   - **Google** (for Google OAuth)

### 3. Get Firebase Configuration

#### From Firebase Console:
1. Go to **Project Settings** > **General**
2. In "Your apps" section, click on your web app or create one
3. Copy the Firebase configuration values

#### From Service Account:
1. Go to **Project Settings** > **Service accounts**
2. Click "Generate new private key"
3. Download the JSON file and extract the `private_key` value

### 4. Environment Variables

Add the following Firebase configuration to your `.env` file:

```env
# Environment configuration
NODE_ENV=development

# Database configuration
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

# Firebase configuration
FIREBASE_API_KEY=
FIREBASE_PRIVATE_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=

# JWT configuration
JWT_SECRET=
JWT_EXPIRES_IN=

# MINIO or S3 configuration
MINIO_ENDPOINT=
MINIO_PORT=
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
MINIO_BUCKET=
MINIO_USE_SSL=
```

### 6. Important Notes

**Private Key Format:**
- The `FIREBASE_PRIVATE_KEY` should include the full private key with `\n` characters
- Example: `"-----BEGIN PRIVATE KEY-----\nMIIEvQIBAD...\n-----END PRIVATE KEY-----\n"`

### 7. Authentication Endpoints
The application provides these authentication endpoints:

```bash
# Sign up with email/password
POST /api/v1/auth/signup
{
  "firstName": "John",
  "lastName": "Doe", 
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}

# Login with email/password
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

# Google OAuth login
POST /api/v1/auth/google-login
{
  "idToken": "firebase-id-token-from-client"
}

# Refresh access token
POST /api/v1/auth/refresh
{
  "refreshToken": "your-refresh-token"
}

# Logout
POST /api/v1/auth/logout
Authorization: Bearer <access-token>
{
  "refreshToken": "your-refresh-token"
}

# Get current user
GET /api/v1/auth/me
Authorization: Bearer <access-token>
```

### 8. Frontend Integration

For your frontend application, use these environment variables:

```javascript
// Firebase client configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
```

### 9. Security Best Practices

- **Never commit `.env` files** to version control
- **Use different Firebase projects** for development, staging, and production
- **Rotate your JWT secret** regularly
- **Set proper Firebase security rules** for your database and storage
- **Enable Firebase App Check** for additional security

### 10. Troubleshooting

**Error: "Private key must be a string"**
- Ensure `FIREBASE_PRIVATE_KEY` is properly escaped with `\n` characters
- Check that the private key includes the BEGIN and END markers

**Error: "Invalid project ID"**
- Verify `FIREBASE_PROJECT_ID` matches your actual Firebase project ID
- Ensure the project is active in Firebase Console

**Error: "Service account not found"**
- Check that your service account email is correct
- Ensure the service account has the necessary permissions in Firebase Console
