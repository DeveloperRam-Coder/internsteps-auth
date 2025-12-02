import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../../modules/auth/context/AuthContext';
import Card from '../../core/components/Card';
import Stat from '../../core/components/Stat';
import Divider from '../../core/components/Divider';
import Avatar from '../../core/components/Avatar';
import { Colors, Typography, Spacing } from '../../core/theme/theme';

export default function InstructorDashboard() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthContext missing');
  const { user } = auth;

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Avatar size="md" initials={getInitials(user?.name)} />
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>Instructor Panel</Text>
              <Text style={styles.userName}>{user?.name || 'Instructor'}</Text>
            </View>
          </View>
          <Text style={styles.badge}>🎓</Text>
        </View>
      </View>

      {/* Teaching Stats */}
      <View style={styles.statsGrid}>
        <Stat icon={<Text style={styles.statIcon}>📚</Text>} value="8" label="My Courses" color={Colors.primary} />
        <Stat icon={<Text style={styles.statIcon}>👥</Text>} value="342" label="Students" color={Colors.success} />
        <Stat icon={<Text style={styles.statIcon}>⭐</Text>} value="4.9" label="Rating" color={Colors.accent} />
        <Stat icon={<Text style={styles.statIcon}>📊</Text>} value="92%" label="Avg. Score" color={Colors.warning} />
      </View>

      {/* Instructor Actions */}
      <Card title="Teaching Tools">
        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionItemContent}>
            <Text style={styles.actionItemIcon}>📖</Text>
            <View style={styles.actionItemText}>
              <Text style={styles.actionItemTitle}>My Courses</Text>
              <Text style={styles.actionItemDesc}>View and manage courses</Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionItemContent}>
            <Text style={styles.actionItemIcon}>👨‍🎓</Text>
            <View style={styles.actionItemText}>
              <Text style={styles.actionItemTitle}>Student Management</Text>
              <Text style={styles.actionItemDesc}>Track student progress</Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionItemContent}>
            <Text style={styles.actionItemIcon}>✅</Text>
            <View style={styles.actionItemText}>
              <Text style={styles.actionItemTitle}>Assignments</Text>
              <Text style={styles.actionItemDesc}>Create & grade assignments</Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionItemContent}>
            <Text style={styles.actionItemIcon}>📊</Text>
            <View style={styles.actionItemText}>
              <Text style={styles.actionItemTitle}>Analytics</Text>
              <Text style={styles.actionItemDesc}>View performance metrics</Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </Card>

      {/* Recent Student Activity */}
      <Card title="Student Activity">
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>📝</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>John submitted assignment</Text>
            <Text style={styles.activityTime}>30 minutes ago</Text>
          </View>
        </View>

        <Divider />

        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>✅</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Sarah completed quiz</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>

        <Divider />

        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>💬</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>New question in forum</Text>
            <Text style={styles.activityTime}>3 hours ago</Text>
          </View>
        </View>
      </Card>

      {/* Upcoming Deadlines */}
      <Card title="Upcoming Deadlines">
        <View style={styles.deadlineItem}>
          <View style={[styles.deadlineDot, { backgroundColor: Colors.warning }]} />
          <View style={styles.deadlineContent}>
            <Text style={styles.deadlineTitle}>Module 3 - Assignment Due</Text>
            <Text style={styles.deadlineTime}>Due in 2 days</Text>
          </View>
        </View>

        <Divider />

        <View style={styles.deadlineItem}>
          <View style={[styles.deadlineDot, { backgroundColor: Colors.error }]} />
          <View style={styles.deadlineContent}>
            <Text style={styles.deadlineTitle}>Course Review Period</Text>
            <Text style={styles.deadlineTime}>Due in 1 week</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.xl3,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  greeting: {
    marginLeft: Spacing.md,
  },
  greetingText: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: Typography.h6,
    fontWeight: Typography.bold as any,
    color: Colors.text,
  },
  badge: {
    fontSize: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
    marginBottom: Spacing.xl2,
  },
  statIcon: {
    fontSize: 28,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  actionItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionItemIcon: {
    fontSize: 32,
    marginRight: Spacing.lg,
  },
  actionItemText: {
    flex: 1,
  },
  actionItemTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semibold as any,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  actionItemDesc: {
    fontSize: Typography.caption,
    color: Colors.textTertiary,
  },
  arrow: {
    fontSize: Typography.h6,
    color: Colors.textTertiary,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: Spacing.lg,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semibold as any,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  activityTime: {
    fontSize: Typography.caption,
    color: Colors.textTertiary,
  },
  deadlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  deadlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: Spacing.lg,
  },
  deadlineContent: {
    flex: 1,
  },
  deadlineTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semibold as any,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  deadlineTime: {
    fontSize: Typography.caption,
    color: Colors.textTertiary,
  },
});
