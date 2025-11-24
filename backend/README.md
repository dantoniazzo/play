# Sports Match Backend API

Node.js backend API for the sports match application with PostgreSQL database.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up PostgreSQL database:
```bash
createdb sports_match
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/sports_match
NODE_ENV=development
```

5. Initialize the database schema:
```bash
psql -d sports_match -f src/config/schema.sql
```

6. Start the server:
```bash
npm run dev  # Development mode with auto-reload
npm start    # Production mode
```

## API Endpoints

### Users

#### Create User
- **POST** `/api/users`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Get All Users
- **GET** `/api/users`

#### Get User by ID
- **GET** `/api/users/:id`

### Matches

#### Create Match
- **POST** `/api/matches`
- Body:
```json
{
  "sport": "football",
  "name": "Weekend Football Match",
  "address": "123 Main St, City",
  "date": "2025-12-01",
  "time": "15:00:00",
  "maxPlayers": 10,
  "skillLevel": "Intermediate",
  "description": "Casual weekend match",
  "createdBy": 1
}
```

#### Get All Matches
- **GET** `/api/matches`
- Query params: `?sport=football` or `?sport=padel` (optional)

#### Get Match by ID
- **GET** `/api/matches/:id`

#### Delete Match
- **DELETE** `/api/matches/:id`

#### Get Match Participants
- **GET** `/api/matches/:id/participants`
- Returns array of users who joined the match

#### Join Match
- **POST** `/api/matches/:id/join`
- Body:
```json
{
  "userId": 1
}
```

#### Leave Match
- **POST** `/api/matches/:id/leave`
- Body:
```json
{
  "userId": 1
}
```

## Database Schema

### Tables

- **users**: User accounts
  - id, name, email, created_at

- **matches**: Match information
  - id, sport, name, address, date, time, max_players, skill_level, description, created_by, created_at

- **match_participants**: Many-to-many relationship between users and matches
  - id, match_id, user_id, joined_at

## Response Format

Success responses follow standard REST conventions with appropriate status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

Error responses:
```json
{
  "error": "Error message description"
}
```
