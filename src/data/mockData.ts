import { DirectionStep, LocationItem, RouteDetails, TransportMode } from '../types/trip';

export const MOCK_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-1',
    title: 'Home',
    address: 'Villa 12, Street 840, Zone 61 · West Bay',
    iconType: 'home',
    latitude: 25.3214,
    longitude: 51.5283,
  },
  {
    id: 'loc-2',
    title: 'Marina Office Tower',
    address: 'Level 14, Al Fardan Rd · Lusail Marina',
    iconType: 'office',
    latitude: 25.3857,
    longitude: 51.5342,
  },
  {
    id: 'loc-3',
    title: 'Corniche Ferry Terminal',
    address: 'Gate 3, Corniche Promenade',
    iconType: 'ferry',
    latitude: 25.2917,
    longitude: 51.5398,
  },
  {
    id: 'loc-4',
    title: 'Msheireb Metro Station',
    address: 'Al Kinana St · Msheireb Downtown',
    iconType: 'metro',
    latitude: 25.2862,
    longitude: 51.5278,
  },
  {
    id: 'loc-5',
    title: 'Hamad International Airport',
    address: 'Departure Gate 4, Terminal 1',
    iconType: 'airport',
    latitude: 25.2731,
    longitude: 51.6081,
  },
];

export const CURRENT_LOCATION: LocationItem = {
  id: 'current-loc',
  title: 'Current Location',
  address: 'Zone 61, Diplomatic Area, West Bay',
  iconType: 'pin',
  latitude: 25.3225,
  longitude: 51.5290,
};

export const MOCK_STEPS: DirectionStep[] = [
  {
    id: 'step-1',
    instruction: 'Head north on Street 840',
    detail: 'Keep right past the service road',
    distance: '450 m',
    turnType: 'straight',
  },
  {
    id: 'step-2',
    instruction: 'Turn right onto Al Istiqlal St',
    detail: 'Moderate traffic near the roundabout',
    distance: '1.8 km',
    turnType: 'right',
  },
  {
    id: 'step-3',
    instruction: 'Continue on Lusail Expressway',
    detail: 'Follow signs for Lusail / The Pearl',
    distance: '5.6 km',
    turnType: 'straight',
  },
  {
    id: 'step-4',
    instruction: 'Take exit toward Lusail Marina',
    detail: 'At the roundabout, take the 2nd exit',
    distance: '1.1 km',
    turnType: 'right',
  },
  {
    id: 'step-5',
    instruction: 'Arrive at Marina Office Tower',
    detail: 'Destination will be on your right',
    distance: '650 m',
    turnType: 'arrive',
  },
];

export const ROUTE_DATA_BY_MODE: Record<TransportMode, RouteDetails> = {
  drive: {
    durationMinutes: 24,
    distanceKm: 9.6,
    arrivalTime: '10:42',
    trafficWarning: 'Heavy traffic near the marina',
    steps: MOCK_STEPS,
  },
  ride: {
    durationMinutes: 21,
    distanceKm: 9.6,
    arrivalTime: '10:39',
    trafficWarning: 'Express lanes clear',
    steps: MOCK_STEPS,
  },
  walk: {
    durationMinutes: 114,
    distanceKm: 8.8,
    arrivalTime: '12:12',
    steps: MOCK_STEPS.map((s) => ({
      ...s,
      detail: s.detail.replace('traffic', 'pedestrian flow'),
    })),
  },
};
