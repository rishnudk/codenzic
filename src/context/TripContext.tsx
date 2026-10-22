import React, { createContext, useContext, useState, useMemo } from 'react';
import { LocationItem, TransportMode } from '../types/trip';
import { MOCK_LOCATIONS, CURRENT_LOCATION } from '../data/mockData';

interface TripContextType {
  pickup: LocationItem | null;
  destination: LocationItem | null;
  activeField: 'pickup' | 'destination';
  transportMode: TransportMode;
  searchQuery: string;
  filteredLocations: LocationItem[];
  userEmail: string;
  setPickup: (loc: LocationItem | null) => void;
  setDestination: (loc: LocationItem | null) => void;
  setActiveField: (field: 'pickup' | 'destination') => void;
  setTransportMode: (mode: TransportMode) => void;
  setSearchQuery: (query: string) => void;
  selectLocation: (loc: LocationItem) => void;
  swapLocations: () => void;
  clearLocation: (field: 'pickup' | 'destination') => void;
  useCurrentLocation: () => void;
  setUserEmail: (email: string) => void;
  isTripReady: boolean;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pickup, setPickup] = useState<LocationItem | null>(null);
  const [destination, setDestination] = useState<LocationItem | null>(null);
  const [activeField, setActiveField] = useState<'pickup' | 'destination'>('pickup');
  const [transportMode, setTransportMode] = useState<TransportMode>('drive');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) {
      return MOCK_LOCATIONS;
    }
    const q = searchQuery.toLowerCase().trim();
    return MOCK_LOCATIONS.filter(
      (loc) =>
        loc.title.toLowerCase().includes(q) ||
        loc.address.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const selectLocation = (loc: LocationItem) => {
    if (activeField === 'pickup') {
      setPickup(loc);
      // Switch focus to destination if destination is empty
      if (!destination) {
        setActiveField('destination');
      }
    } else {
      setDestination(loc);
    }
    setSearchQuery('');
  };

  const swapLocations = () => {
    const prevPickup = pickup;
    setPickup(destination);
    setDestination(prevPickup);
  };

  const clearLocation = (field: 'pickup' | 'destination') => {
    if (field === 'pickup') {
      setPickup(null);
      setActiveField('pickup');
    } else {
      setDestination(null);
      setActiveField('destination');
    }
  };

  const useCurrentLocation = () => {
    selectLocation(CURRENT_LOCATION);
  };

  const isTripReady = Boolean(pickup && destination);

  return (
    <TripContext.Provider
      value={{
        pickup,
        destination,
        activeField,
        transportMode,
        searchQuery,
        filteredLocations,
        userEmail,
        setPickup,
        setDestination,
        setActiveField,
        setTransportMode,
        setSearchQuery,
        selectLocation,
        swapLocations,
        clearLocation,
        useCurrentLocation,
        setUserEmail,
        isTripReady,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
