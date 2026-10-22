import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../theme';

interface ActionPillProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const ActionPill: React.FC<ActionPillProps> = ({
  label,
  icon,
  active = false,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.pill,
        active && styles.activePill,
        style,
      ]}
    >
      {icon}
      <Text
        style={[
          styles.text,
          active && styles.activeText,
          Boolean(icon) && { marginLeft: spacing.xs + 2 },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm + 1,
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activePill: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  text: {
    ...typography.captionMedium,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  activeText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
