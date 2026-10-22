export type LocationIconType = 'home' | 'office' | 'ferry' | 'metro' | 'airport' | 'pin';

export interface LocationItem {
  id: string;
  title: string;
  address: string;
  iconType: LocationIconType;
  latitude: number;
  longitude: number;
}

export type TransportMode = 'drive' | 'ride' | 'walk';

export interface DirectionStep {
  id: string;
  instruction: string;
  detail: string;
  distance: string;
  turnType: 'straight' | 'right' | 'left' | 'roundabout' | 'arrive';
}

export interface RouteDetails {
  durationMinutes: number;
  distanceKm: number;
  arrivalTime: string;
  trafficWarning?: string;
  steps: DirectionStep[];
}
