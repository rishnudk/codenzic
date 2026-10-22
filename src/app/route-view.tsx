import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  ActionPill,
  Button,
  MapViewCanvas,
  TurnByTurnStep,
} from '../components';
import { colors, spacing, typography, borderRadius } from '../theme';
import { useTrip } from '../context/TripContext';
import { ROUTE_DATA_BY_MODE } from '../data/mockData';
import { TransportMode } from '../types/trip';

export default function RouteViewScreen() {
  const {
    pickup,
    destination,
    transportMode,
    setTransportMode,
  } = useTrip();

  const [isNavigating, setIsNavigating] = useState(false);

  // Fallback defaults if user went directly to route view
  const originTitle = pickup ? `${pickup.title} · ${pickup.address.split(',')[0]}` : 'Home · Villa 12, Street 840';
  const destTitle = destination ? `${destination.title} · ${destination.address.split(',')[0]}` : 'Marina Office Tower · Level 14, Al Fardan Rd';

  const routeDetails = ROUTE_DATA_BY_MODE[transportMode];

  const handleStartNavigation = () => {
    setIsNavigating(true);
    Alert.alert(
      'Navigation Started',
      `Proceeding on the fastest route via ${transportMode.toUpperCase()}. Follow turn-by-turn guidance.`,
      [{ text: 'OK', onPress: () => setIsNavigating(false) }]
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        {/* Map Section with Floating Buttons */}
        <View style={styles.mapSection}>
          <MapViewCanvas trafficWarning={routeDetails.trafficWarning} />

          {/* Floating Top Controls */}
          <View style={styles.floatingTopBar}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.back()}
              style={styles.floatingButton}
            >
              <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Alert.alert('Map Layers', 'Switched to satellite view')}
              style={styles.floatingButton}
            >
              <Ionicons name="layers-outline" size={20} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Sheet Card */}
        <View style={styles.bottomSheet}>
          {/* Sheet Handle */}
          <View style={styles.handleBar} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header / Timing Stats */}
            <View style={styles.statsHeader}>
              <View>
                <Text style={styles.routeTag}>Fastest route</Text>
                <Text style={styles.timeHighlight}>{routeDetails.durationMinutes} min</Text>
              </View>
              <Text style={styles.distanceArrive}>
                {routeDetails.distanceKm} km · arrive {routeDetails.arrivalTime}
              </Text>
            </View>

            {/* Transport Mode Switcher */}
            <View style={styles.modeRow}>
              {(['drive', 'ride', 'walk'] as TransportMode[]).map((mode) => (
                <ActionPill
                  key={mode}
                  label={mode.charAt(0).toUpperCase() + mode.slice(1)}
                  active={transportMode === mode}
                  onPress={() => setTransportMode(mode)}
                  style={styles.modePill}
                />
              ))}
            </View>

            {/* Route Summary Card */}
            <View style={styles.routeSummaryCard}>
              <View style={styles.originRow}>
                <View style={styles.originDot} />
                <Text style={styles.pointText} numberOfLines={1}>
                  {originTitle}
                </Text>
              </View>

              <View style={styles.summaryTrack}>
                <View style={styles.verticalTrack} />
              </View>

              <View style={styles.destRow}>
                <View style={styles.destSquare} />
                <Text style={styles.pointText} numberOfLines={1}>
                  {destTitle}
                </Text>
              </View>
            </View>

            {/* Turn by Turn Header */}
            <View style={styles.turnByTurnHeader}>
              <Text style={styles.turnByTurnTitle}>Turn by turn</Text>
            </View>

            {/* Turn by Turn List */}
            <View style={styles.stepsContainer}>
              {routeDetails.steps.map((step, idx) => (
                <TurnByTurnStep
                  key={step.id}
                  step={step}
                  isLast={idx === routeDetails.steps.length - 1}
                />
              ))}
            </View>
          </ScrollView>

          {/* Sticky CTA Button */}
          <View style={styles.footer}>
            <Button
              title="Start navigation"
              icon={<Ionicons name="navigate" size={18} color={colors.textInverse} />}
              onPress={handleStartNavigation}
              loading={isNavigating}
              style={styles.navButton}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: '#EBEAE5',
  },
  mapSection: {
    height: 310,
    position: 'relative',
  },
  floatingTopBar: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  floatingButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xl + 6,
    borderTopRightRadius: borderRadius.xl + 6,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: borderRadius.full,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.base,
  },
  routeTag: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  timeHighlight: {
    ...typography.h1,
    fontSize: 32,
    color: colors.textPrimary,
  },
  distanceArrive: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  modeRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  modePill: {
    flex: 1,
    marginRight: spacing.sm,
  },
  routeSummaryCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  originRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.pickupDot,
    marginRight: spacing.md,
  },
  summaryTrack: {
    height: 14,
    paddingLeft: 3,
    justifyContent: 'center',
  },
  verticalTrack: {
    width: 2,
    height: 12,
    backgroundColor: colors.border,
  },
  destRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  destSquare: {
    width: 8,
    height: 8,
    borderRadius: 1,
    backgroundColor: colors.destinationSquare,
    marginRight: spacing.md,
  },
  pointText: {
    ...typography.captionMedium,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  turnByTurnHeader: {
    marginBottom: spacing.xs,
  },
  turnByTurnTitle: {
    ...typography.captionMedium,
    color: colors.textSecondary,
  },
  stepsContainer: {
    marginTop: spacing.xs,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    backgroundColor: colors.background,
  },
  navButton: {
    width: '100%',
  },
});
