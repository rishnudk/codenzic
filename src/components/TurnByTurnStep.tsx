import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DirectionStep } from '../types/trip';
import { colors, borderRadius, spacing, typography } from '../theme';

interface TurnByTurnStepProps {
  step: DirectionStep;
  isLast?: boolean;
}

const getTurnIcon = (turnType: DirectionStep['turnType']): keyof typeof Ionicons.glyphMap => {
  switch (turnType) {
    case 'right':
      return 'arrow-forward-outline';
    case 'left':
      return 'arrow-back-outline';
    case 'arrive':
      return 'flag-outline';
    default:
      return 'arrow-up-outline';
  }
};

export const TurnByTurnStep: React.FC<TurnByTurnStepProps> = ({ step, isLast = false }) => {
  return (
    <View style={[styles.container, !isLast && styles.bottomBorder]}>
      <View style={styles.iconCircle}>
        <Ionicons name={getTurnIcon(step.turnType)} size={18} color={colors.textPrimary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.instruction} numberOfLines={1}>
          {step.instruction}
        </Text>
        <Text style={styles.detail} numberOfLines={1}>
          {step.detail}
        </Text>
      </View>
      <Text style={styles.distance}>{step.distance}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  instruction: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  detail: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  distance: {
    ...typography.captionMedium,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    fontWeight: '500',
  },
});
