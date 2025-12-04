import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../modules/auth/context/AuthContext';
import Card from '../../core/components/Card';
import Stat from '../../core/components/Stat';
import Divider from '../../core/components/Divider';
import Avatar from '../../core/components/Avatar';
import { Colors, Typography, Spacing, BorderRadius } from '../../core/theme/theme';
import { getCustomersByClientIdApi } from '../auth/api/customer';

export default function AdminDashboard({ navigation }: any) {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthContext missing');
  const { user, businessDetails } = auth;
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await getCustomersByClientIdApi(businessDetails.client_id);
      setCustomers(res.data || []);
    } catch (e: any) {
      console.log('Error fetching customers:', e);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  // Refresh customers when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (businessDetails?.client_id) {
        fetchCustomers();
      }
    }, [businessDetails])
  );

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
    <View style={{ flex: 1 }}>
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
                <Text style={styles.greetingText}>Admin Panel</Text>
                <Text style={styles.userName}>{user?.name || 'Admin'}</Text>
              </View>
            </View>
            <Text style={styles.adminBadge}>👑</Text>
          </View>
        </View>

        {/* Customers List */}
        <View style={styles.customersSection}>
          <Text style={styles.sectionTitle}>Customers ({customers.length})</Text>
          {loading ? (
            <Text style={styles.loadingText}>Loading customers...</Text>
          ) : customers.length === 0 ? (
            <Text style={styles.emptyText}>No customers added yet.</Text>
          ) : (
            customers.map((customer) => (
              <TouchableOpacity
                key={customer.customer_id}
                style={styles.customerCard}
                onPress={() => navigation.navigate('AddSubCustomerScreen', { customerId: customer.customer_id })}
              >
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>
                    {customer.first_name} {customer.last_name || ''}
                  </Text>
                  <Text style={styles.customerMobile}>{customer.mobile}</Text>
                  {customer.email && <Text style={styles.customerEmail}>{customer.email}</Text>}
                </View>
                <Text style={styles.addSubIcon}>➕</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* System Stats */}
        <View style={styles.statsGrid}>
          <Stat icon={<Text style={styles.statIcon}>👥</Text>} value="1,234" label="Total Users" color={Colors.primary} />
          <Stat icon={<Text style={styles.statIcon}>📚</Text>} value="56" label="Courses" color={Colors.success} />
          <Stat icon={<Text style={styles.statIcon}>📊</Text>} value="89%" label="Completion" color={Colors.warning} />
          <Stat icon={<Text style={styles.statIcon}>⚠️</Text>} value="12" label="Reports" color={Colors.error} />
        </View>

        {/* Admin Actions */}
        <Card title="Admin Controls">
        <TouchableOpacity style={styles.adminItem}>
          <View style={styles.adminItemContent}>
            <Text style={styles.adminItemIcon}>👥</Text>
            <View style={styles.adminItemText}>
              <Text style={styles.adminItemTitle}>User Management</Text>
              <Text style={styles.adminItemDesc}>Manage users and roles</Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity style={styles.adminItem}>
          <View style={styles.adminItemContent}>
            <Text style={styles.adminItemIcon}>🔐</Text>
            <View style={styles.adminItemText}>
              <Text style={styles.adminItemTitle}>Permissions</Text>
              <Text style={styles.adminItemDesc}>Configure roles & permissions</Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity style={styles.adminItem}>
          <View style={styles.adminItemContent}>
            <Text style={styles.adminItemIcon}>⚙️</Text>
            <View style={styles.adminItemText}>
              <Text style={styles.adminItemTitle}>System Settings</Text>
              <Text style={styles.adminItemDesc}>Configure system parameters</Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity style={styles.adminItem}>
          <View style={styles.adminItemContent}>
            <Text style={styles.adminItemIcon}>📊</Text>
            <View style={styles.adminItemText}>
              <Text style={styles.adminItemTitle}>Analytics</Text>
              <Text style={styles.adminItemDesc}>View system analytics & reports</Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </Card>

      {/* Recent Activity */}
      <Card title="System Activity">
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>🔔</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>New user registration</Text>
            <Text style={styles.activityTime}>5 minutes ago</Text>
          </View>
        </View>

        <Divider />

        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>⚠️</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Failed login attempt</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>

        <Divider />

        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>✅</Text>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Database backup completed</Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
        </View>
      </Card>
    </ScrollView>

    {/* Floating Add Customer Button */}
    <TouchableOpacity
      style={styles.fabButton}
      onPress={() => navigation.navigate('AddCustomer')}
    >
      <Text style={styles.fabIcon}>+</Text>
    </TouchableOpacity>
  </View>
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
  adminBadge: {
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
  adminItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  adminItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  adminItemIcon: {
    fontSize: 32,
    marginRight: Spacing.lg,
  },
  adminItemText: {
    flex: 1,
  },
  adminItemTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semibold as any,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  adminItemDesc: {
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
  customersSection: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: Typography.bold as any,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  loadingText: {
    color: Colors.textSecondary,
  },
  emptyText: {
    color: Colors.textTertiary,
  },
  customerCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontWeight: Typography.bold as any,
    fontSize: 16,
    color: Colors.text,
  },
  customerMobile: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  customerEmail: {
    color: Colors.textTertiary,
    fontSize: 12,
    marginTop: Spacing.xs,
  },
  addSubIcon: {
    fontSize: 20,
    color: Colors.primary,
    marginLeft: Spacing.md,
  },
  fabButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: Colors.primary,
    borderRadius: 32,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabIcon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});
