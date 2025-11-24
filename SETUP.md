# Sports Match App - Setup Guide

This guide will help you set up both the frontend (React Native/Expo) and backend (Node.js/PostgreSQL).

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

## Backend Setup

### 1. Install PostgreSQL

If you don't have PostgreSQL installed:

**macOS (using Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Or use Postgres.app:**
Download from https://postgresapp.com/

### 2. Create Database

```bash
createdb sports_match
```

### 3. Configure Backend

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` and update with your database credentials:
```
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/sports_match
NODE_ENV=development
```

For default PostgreSQL on Mac, you can use:
```
DATABASE_URL=postgresql://localhost:5432/sports_match
```

### 4. Initialize Database Schema

```bash
psql -d sports_match -f src/config/schema.sql
```

### 5. Create a Test User (Optional)

Open PostgreSQL:
```bash
psql sports_match
```

Insert a test user:
```sql
INSERT INTO users (name, email) VALUES ('Test User', 'test@example.com');
```

Exit psql:
```
\q
```

### 6. Start Backend Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

Test it by visiting: `http://localhost:3000`

You should see: `{"message":"Sports Match API is running"}`

## Frontend Setup

### 1. Install Dependencies

From the project root directory:
```bash
npm install
```

### 2. Configure API URL

The `.env` file should already exist with:
```
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

**Note for iOS Simulator:** `localhost` works fine.

**Note for Physical Device:** Replace `localhost` with your computer's local IP address:
```
EXPO_PUBLIC_API_URL=http://192.168.1.x:3000/api
```

To find your IP:
- Mac: `ifconfig | grep "inet " | grep -v 127.0.0.1`
- Windows: `ipconfig`

### 3. Start Expo

```bash
npx expo start
```

Press:
- `i` for iOS Simulator
- `a` for Android Emulator
- Scan QR code for physical device

## Testing the App

### 1. Create a Match

1. Open the app
2. Select "Football" or "Padel"
3. Tap "Create Match" button
4. Fill in the form:
   - Match Name: "Weekend Game"
   - Address: "123 Main St"
   - Date: "2025-12-01"
   - Time: "15:00:00"
   - Max Players: "10"
   - Skill Level: "Intermediate"
   - Description: "Fun casual match"
5. Tap "Create Match"

### 2. View Matches

- The match should appear in the list
- Tap on it to view details

### 3. Join/Leave Match

- In the match detail modal, tap "Join"
- The participants list will update
- Tap "Leave" to remove yourself

### 4. Delete Match

- In the match detail modal, tap "Delete"
- Confirm the deletion

## API Endpoints

All endpoints are prefixed with `http://localhost:3000/api`

### Users
- `POST /users` - Create user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID

### Matches
- `POST /matches` - Create match
- `GET /matches?sport=football` - Get matches (optional sport filter)
- `GET /matches/:id` - Get match by ID
- `DELETE /matches/:id` - Delete match
- `GET /matches/:id/participants` - Get match participants
- `POST /matches/:id/join` - Join match
- `POST /matches/:id/leave` - Leave match

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running: `pg_isready`
- Verify database exists: `psql -l | grep sports_match`
- Check `.env` DATABASE_URL is correct

### Frontend can't connect to backend
- Verify backend is running on port 3000
- Check `.env` EXPO_PUBLIC_API_URL
- For physical devices, use your computer's IP address

### Database errors
- Re-run schema: `psql -d sports_match -f backend/src/config/schema.sql`
- Check PostgreSQL logs

### "No matches found"
- Verify backend is running
- Check console for API errors
- Create a test match through the API:
```bash
curl -X POST http://localhost:3000/api/matches \
  -H "Content-Type: application/json" \
  -d '{
    "sport": "football",
    "name": "Test Match",
    "address": "123 Main St",
    "date": "2025-12-01",
    "time": "15:00:00",
    "maxPlayers": 10,
    "skillLevel": "Beginner",
    "description": "Test match",
    "createdBy": 1
  }'
```

## Development Notes

- User authentication is not implemented yet. All operations use a hardcoded user ID of 1.
- When creating matches, make sure to insert a user first or use `createdBy: 1` after creating a test user.
- The app uses mock user ID for join/leave operations until auth is implemented.

## Next Steps

- [ ] Implement user authentication
- [ ] Add edit match functionality
- [ ] Add date/time pickers
- [ ] Add push notifications
- [ ] Add chat functionality
- [ ] Add user profiles
