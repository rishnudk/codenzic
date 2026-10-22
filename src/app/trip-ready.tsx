import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  ActionPill,
  Button,
  LocationInputGroup,
} from '../components';
import { colors, spacing, typography, borderRadius } from '../theme';
import { useTrip } from '../context/TripContext';

export default function TripReadyScreen() {
  const {
    pickup,
    destination,
    activeField,
    setActiveField,
    clearLocation,
    swapLocations,
    useCurrentLocation,
  } = useTrip();

  const handleProceedToRoute = () => {
    router.push('/route-view');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Where are you going?</Text>
            <Text style={styles.subtitle}>Step 1 of 2 · Set pickup and drop-off</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Location Selection Card */}
          <View style={styles.inputGroupContainer}>
            <LocationInputGroup
              pickup={pickup}
              destination={destination}
              activeField={activeField}
              onSelectField={setActiveField}
              onClearField={(field) => {
                clearLocation(field);
                router.back();
              }}
              onSwap={swapLocations}
            />
          </View>

          {/* Quick Action Pills */}
          <View style={styles.pillsRow}>
            <ActionPill
              label="Use current"
              icon={<Ionicons name="navigate-outline" size={16} color={colors.textPrimary} />}
              onPress={useCurrentLocation}
              style={styles.pill}
            />
            <ActionPill
              label="Pick on map"
              icon={<Ionicons name="map-outline" size={16} color={colors.textPrimary} />}
              onPress={() => router.push('/route-view')}
              style={styles.pill}
            />
          </View>

          {/* Section Heading */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Set as drop-off</Text>
          </View>

          {/* Feedback Card / Custom Address State (matching Figma Screen 3) */}
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackText}>
              No saved places match that. Keep typing to use it as a custom address.
            </Text>
          </View>
        </ScrollView>

        {/* Bottom CTA */}
        <View style={styles.footer}>
          <Button
            title="Next"
            onPress={handleProceedToRoute}
            style={styles.nextButton}
          />
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
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    marginLeft: -spacing.sm,
  },
  headerTextContainer: {
    marginTop: spacing.xs,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  inputGroupContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  pillsRow: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  pill: {
    marginRight: spacing.sm,
    backgroundColor: colors.surface,
  },
  sectionHeader: {
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.captionMedium,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  feedbackCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 240,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    backgroundColor: colors.background,
  },
  nextButton: {
    width: '100%',
  },
});
