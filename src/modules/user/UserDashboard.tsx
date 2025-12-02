import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../../modules/auth/context/AuthContext';
import Button from '../../core/components/Button';
import Card from '../../core/components/Card';
import Stat from '../../core/components/Stat';
import Divider from '../../core/components/Divider';
import Avatar from '../../core/components/Avatar';
import { Colors, Typography, Spacing, BorderRadius } from '../../core/theme/theme';

export default function UserDashboard({ navigation }: any) {
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

  const quickActions = [
    { icon: '📚', label: 'Courses', action: () => {} },
    { icon: '📝', label: 'Assignments', action: () => {} },
    { icon: '🏆', label: 'Achievements', action: () => {} },
    { icon: '📊', label: 'Progress', action: () => {} },
  ];

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
              <Text style={styles.greetingText}>Welcome back!</Text>
              <Text style={styles.userName}>{user?.name || 'User'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={() => {}}>
            <Text style={styles.bellIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsGrid}>
        <Stat icon={<Text style={styles.statCardIcon}>📚</Text>} value="5" label="Enrolled" color={Colors.primary} />
        <Stat icon={<Text style={styles.statCardIcon}>✅</Text>} value="12" label="Completed" color={Colors.success} />
        <Stat icon={<Text style={styles.statCardIcon}>⏳</Text>} value="3" label="In Progress" color={Colors.warning} />
        <Stat icon={<Text style={styles.statCardIcon}>⭐</Text>} value="4.8" label="Rating" color={Colors.accent} />
      </View>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionButton} onPress={action.action} activeOpacity={0.7}>
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <View style={styles.activityItem}>
          <View style={styles.activityDot} />
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Completed React Basics</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
          <Text style={styles.activityIcon}>✅</Text>
        </View>
        <Divider />
        <View style={styles.activityItem}>
          <View style={styles.activityDot} />
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Started JavaScript Advanced</Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
          <Text style={styles.activityIcon}>🎯</Text>
        </View>
        <Divider />
        <View style={styles.activityItem}>
          <View style={styles.activityDot} />
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Earned Certificate in CSS</Text>
            <Text style={styles.activityTime}>3 days ago</Text>
          </View>
          <Text style={styles.activityIcon}>🏆</Text>
        </View>
      </Card>

      {/* Upcoming */}
      <Card title="Upcoming Deadlines">
        <View style={styles.deadlineItem}>
          <View style={[styles.deadlineDot, { backgroundColor: Colors.warning }]} />
          <View style={styles.deadlineContent}>
            <Text style={styles.deadlineTitle}>Assignment: React Hooks</Text>
            <Text style={styles.deadlineTime}>Due in 2 days</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.deadlineItem}>
          <View style={[styles.deadlineDot, { backgroundColor: Colors.error }]} />
          <View style={styles.deadlineContent}>
            <Text style={styles.deadlineTitle}>Quiz: Redux Fundamentals</Text>
            <Text style={styles.deadlineTime}>Due in 5 days</Text>
          </View>
        </View>
      </Card>

      {/* Action Button */}
      <View style={styles.actionSection}>
        <Button title="View Full Profile" variant="outline" onPress={() => navigation.navigate('Profile')} />
      </View>
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
  notificationButton: {
    padding: Spacing.md,
  },
  bellIcon: {
    fontSize: 28,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
    marginBottom: Spacing.xl2,
  },
  statCardIcon: {
    fontSize: 28,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.lg,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.lg,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  actionLabel: {
    fontSize: Typography.bodySmall,
    color: Colors.text,
    fontWeight: Typography.semibold as any,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
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
  activityIcon: {
    fontSize: 20,
  },
  deadlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
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
  actionSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
});
