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
import Button from '../../core/components/Button';
import Avatar from '../../core/components/Avatar';
import { Colors, Typography, Spacing, BorderRadius } from '../../core/theme/theme';
import { getCustomersByClientIdApi } from '../auth/api/customer';

export default function UserDashboard({ navigation }: any) {
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
                <Text style={styles.greetingText}>Welcome back!</Text>
                <Text style={styles.userName}>{user?.name || 'User'}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton} onPress={() => { }}>
              <Text style={styles.bellIcon}>🔔</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Business Info */}
        {businessDetails && (
          <View style={styles.businessCard}>
            <Text style={styles.businessLabel}>Business:</Text>
            <Text style={styles.businessName}>{businessDetails.name}</Text>
          </View>
        )}

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

        {/* Action Button */}
        <View style={styles.actionSection}>
          <Button title="View Full Profile" variant="outline" onPress={() => navigation.navigate('Profile')} />
        </View>
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
  notificationButton: {
    padding: Spacing.md,
  },
  bellIcon: {
    fontSize: 28,
  },
  businessCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  businessLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontWeight: Typography.semibold as any,
    marginBottom: Spacing.xs,
  },
  businessName: {
    fontSize: 16,
    fontWeight: Typography.bold as any,
    color: Colors.text,
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
