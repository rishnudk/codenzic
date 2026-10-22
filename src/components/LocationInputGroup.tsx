import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LocationItem } from '../types/trip';
import { colors, borderRadius, spacing, typography } from '../theme';

interface LocationInputGroupProps {
  pickup: LocationItem | null;
  destination: LocationItem | null;
  activeField: 'pickup' | 'destination';
  onSelectField: (field: 'pickup' | 'destination') => void;
  onClearField: (field: 'pickup' | 'destination') => void;
  onSwap: () => void;
}

export const LocationInputGroup: React.FC<LocationInputGroupProps> = ({
  pickup,
  destination,
  activeField,
  onSelectField,
  onClearField,
  onSwap,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputsColumn}>
        {/* Pickup Row */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectField('pickup')}
          style={[
            styles.fieldRow,
            activeField === 'pickup' && styles.activeRow,
          ]}
        >
          <View style={styles.dotIndicator} />
          <View style={styles.textContainer}>
            <Text style={[styles.fieldLabel, pickup ? styles.fieldLabelActive : null]}>Pickup</Text>
            <Text
              style={[styles.fieldText, !pickup && styles.placeholderText]}
              numberOfLines={1}
            >
              {pickup ? pickup.title : 'Choose a starting point'}
            </Text>
          </View>
          {pickup && (
            <TouchableOpacity
              onPress={() => onClearField('pickup')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.clearBtn}
            >
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        {/* Connecting Line and Separator */}
        <View style={styles.dividerRow}>
          <View style={styles.verticalTrackContainer}>
            <View style={styles.connectingLine} />
          </View>
          <View style={styles.horizontalDivider} />
        </View>

        {/* Destination Row */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectField('destination')}
          style={[
            styles.fieldRow,
            activeField === 'destination' && styles.activeRow,
          ]}
        >
          <View style={styles.squareIndicator} />
          <View style={styles.textContainer}>
            <Text style={[styles.fieldLabel, destination ? styles.fieldLabelActive : null]}>Drop-off</Text>
            <Text
              style={[styles.fieldText, !destination && styles.placeholderText]}
              numberOfLines={1}
            >
              {destination ? destination.title : 'Choose a destination'}
            </Text>
          </View>
          {destination && (
            <TouchableOpacity
              onPress={() => onClearField('destination')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.clearBtn}
            >
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>

      {/* Swap Button */}
      <View style={styles.swapWrapper}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSwap}
          style={styles.swapButton}
        >
          <Ionicons name="swap-vertical" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputsColumn: {
    flex: 1,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
  },
  activeRow: {
    backgroundColor: '#FFFFFF',
  },
  dotIndicator: {
    width: 10,
    height: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.pickupDot,
    marginRight: spacing.md,
  },
  squareIndicator: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: colors.destinationSquare,
    marginRight: spacing.md,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 16,
  },
  verticalTrackContainer: {
    width: 10,
    alignItems: 'center',
    marginRight: spacing.md,
  },
  connectingLine: {
    width: 2,
    height: 16,
    backgroundColor: colors.border,
  },
  horizontalDivider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
    opacity: 0.5,
  },
  textContainer: {
    flex: 1,
  },
  fieldLabel: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  fieldLabelActive: {
    color: colors.primary,
  },
  fieldText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '500',
    marginTop: 1,
  },
  placeholderText: {
    color: colors.textMuted,
  },
  clearBtn: {
    padding: spacing.xs,
  },
  swapWrapper: {
    marginLeft: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapButton: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
