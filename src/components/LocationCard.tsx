import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LocationItem, LocationIconType } from '../types/trip';
import { colors, borderRadius, spacing, typography } from '../theme';

interface LocationCardProps {
  location: LocationItem;
  onPress: () => void;
  showDivider?: boolean;
}

const getIconName = (iconType: LocationIconType): keyof typeof Ionicons.glyphMap => {
  switch (iconType) {
    case 'home':
      return 'home-outline';
    case 'office':
      return 'business-outline';
    case 'ferry':
      return 'boat-outline';
    case 'metro':
      return 'train-outline';
    case 'airport':
      return 'airplane-outline';
    default:
      return 'location-outline';
  }
};

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onPress,
  showDivider = true,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, showDivider && styles.divider]}
    >
      <View style={styles.iconCircle}>
        <Ionicons name={getIconName(location.iconType)} size={20} color={colors.textPrimary} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {location.title}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          {location.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.base,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  details: {
    flex: 1,
  },
  title: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  address: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
