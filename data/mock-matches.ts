import { Match } from '@/types/match';

export const mockMatches: Match[] = [
  {
    id: '1',
    sport: 'football',
    title: '5-a-side Football',
    date: '2025-11-25',
    time: '18:00',
    location: {
      name: 'Central Park Football Pitch',
      latitude: 40.785091,
      longitude: -73.968285,
    },
    players: {
      current: 7,
      max: 10,
    },
    skillLevel: 'Intermediate',
    description: 'Casual 5-a-side game. All skill levels welcome!',
  },
  {
    id: '2',
    sport: 'football',
    title: '7-a-side Evening Match',
    date: '2025-11-26',
    time: '19:30',
    location: {
      name: 'Riverside Sports Ground',
      latitude: 40.758896,
      longitude: -73.985130,
    },
    players: {
      current: 10,
      max: 14,
    },
    skillLevel: 'Beginner',
    description: 'Fun evening match, looking for more players!',
  },
  {
    id: '3',
    sport: 'football',
    title: 'Weekend Football',
    date: '2025-11-28',
    time: '10:00',
    location: {
      name: 'Meadow Fields',
      latitude: 40.773426,
      longitude: -73.971268,
    },
    players: {
      current: 8,
      max: 12,
    },
    skillLevel: 'Advanced',
    description: 'Competitive weekend game for experienced players.',
  },
  {
    id: '4',
    sport: 'padel',
    title: 'Morning Padel Doubles',
    date: '2025-11-25',
    time: '09:00',
    location: {
      name: 'City Padel Club',
      latitude: 40.761421,
      longitude: -73.977154,
    },
    players: {
      current: 2,
      max: 4,
    },
    skillLevel: 'Intermediate',
    description: 'Looking for 2 more players for doubles match.',
  },
  {
    id: '5',
    sport: 'padel',
    title: 'Evening Padel Session',
    date: '2025-11-26',
    time: '20:00',
    location: {
      name: 'Padel Arena',
      latitude: 40.778336,
      longitude: -73.982447,
    },
    players: {
      current: 3,
      max: 4,
    },
    skillLevel: 'Beginner',
    description: 'Friendly game, beginners welcome!',
  },
  {
    id: '6',
    sport: 'padel',
    title: 'Weekend Padel Tournament',
    date: '2025-11-29',
    time: '14:00',
    location: {
      name: 'Premium Padel Courts',
      latitude: 40.767778,
      longitude: -73.974997,
    },
    players: {
      current: 6,
      max: 8,
    },
    skillLevel: 'Advanced',
    description: 'Mini tournament format, advanced players only.',
  },
];
