import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, typography } from '../theme';

interface MapViewCanvasProps {
  trafficWarning?: string;
}

export const MapViewCanvas: React.FC<MapViewCanvasProps> = ({ trafficWarning }) => {
  return (
    <View style={styles.container}>
      {/* Background Stylized Map Features */}
      <View style={styles.waterBody} />

      {/* Coastline / Marina Curve Accent */}
      <View style={styles.coastlineCurve} />

      {/* Grid Road Lines */}
      <View style={[styles.roadLine, { top: 80, left: 0, right: 0, height: 8 }]} />
      <View style={[styles.roadLine, { top: 160, left: 30, right: 0, height: 12, transform: [{ rotate: '-8deg' }] }]} />
      <View style={[styles.roadLine, { top: 0, bottom: 0, left: '45%', width: 10 }]} />
      <View style={[styles.roadLine, { top: 60, bottom: 0, left: '72%', width: 8, transform: [{ rotate: '12deg' }] }]} />
      <View style={[styles.secondaryRoad, { top: 220, left: 0, right: 0, height: 4 }]} />
      <View style={[styles.secondaryRoad, { top: 110, left: 0, right: 120, height: 4 }]} />

      {/* Route Path (Connecting Orange Line) */}
      <View style={styles.routeSegment1} />
      <View style={styles.routeSegment2} />
      <View style={styles.routeSegment3} />

      {/* Origin Marker (Home / Vehicle) */}
      <View style={styles.originMarker}>
        <Ionicons name="car" size={16} color={colors.textInverse} />
      </View>

      {/* Destination Marker (Marina Tower) */}
      <View style={styles.destMarker}>
        <Ionicons name="location" size={18} color={colors.textInverse} />
      </View>

      {/* Traffic Warning Pill */}
      {trafficWarning && (
        <View style={styles.trafficPill}>
          <Ionicons name="warning-outline" size={14} color="#FBBF24" style={styles.warningIcon} />
          <Text style={styles.trafficText}>{trafficWarning}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 320,
    backgroundColor: '#EBEAE5',
    position: 'relative',
    overflow: 'hidden',
  },
  waterBody: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '42%',
    height: '100%',
    backgroundColor: '#C5DCE8',
    borderBottomLeftRadius: 120,
    opacity: 0.85,
  },
  coastlineCurve: {
    position: 'absolute',
    top: -20,
    right: '38%',
    width: 60,
    height: 360,
    borderRightWidth: 3,
    borderColor: '#B1CDDC',
    transform: [{ rotate: '-10deg' }],
  },
  roadLine: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    opacity: 0.95,
  },
  secondaryRoad: {
    position: 'absolute',
    backgroundColor: '#DFDDD7',
  },
  routeSegment1: {
    position: 'absolute',
    top: 155,
    left: '24%',
    width: 90,
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: 3,
    transform: [{ rotate: '-15deg' }],
  },
  routeSegment2: {
    position: 'absolute',
    top: 130,
    left: '42%',
    width: 110,
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: 3,
    transform: [{ rotate: '-52deg' }],
  },
  routeSegment3: {
    position: 'absolute',
    top: 92,
    left: '60%',
    width: 45,
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: 3,
    transform: [{ rotate: '5deg' }],
  },
  originMarker: {
    position: 'absolute',
    top: 162,
    left: '20%',
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  destMarker: {
    position: 'absolute',
    top: 80,
    left: '70%',
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  trafficPill: {
    position: 'absolute',
    bottom: spacing.lg,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.badgeDark,
    paddingVertical: spacing.xs + 3,
    paddingHorizontal: spacing.md + 2,
    borderRadius: borderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  warningIcon: {
    marginRight: spacing.xs + 2,
  },
  trafficText: {
    ...typography.captionMedium,
    color: colors.textInverse,
    fontSize: 12,
  },
});
