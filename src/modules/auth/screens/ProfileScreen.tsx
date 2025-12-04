import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Button from '../../../core/components/Button';
import Card from '../../../core/components/Card';
import Avatar from '../../../core/components/Avatar';
import Badge from '../../../core/components/Badge';
import Divider from '../../../core/components/Divider';
import { AuthContext } from '../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../../core/theme/theme';

export default function ProfileScreen({ navigation }: any) {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthContext missing');
  const { user, logout } = auth;

  const getRoleVariant = (role?: string): 'primary' | 'success' | 'error' | 'warning' | 'info' => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'instructor':
        return 'info';
      default:
        return 'success';
    }
  };

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'admin':
        return '👑';
      case 'instructor':
        return '🎓';
      default:
        return '👤';
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to sign out?', [
      { text: 'Cancel', onPress: () => { }, style: 'cancel' },
      { text: 'Sign Out', onPress: logout, style: 'destructive' },
    ]);
  };

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



      {/* Account Information */}
      <Card title="Account Information">
        <View style={styles.infoItem}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>{user?.name || '-'}</Text>
          </View>
        </View>

        <Divider />

        <View style={styles.infoItem}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={[styles.infoValue, styles.email]}>{user?.email}</Text>
          </View>
        </View>

        <Divider />

        <View style={styles.infoItem}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{user?.mobile || '-'}</Text>
          </View>
        </View>

        <Divider />

        <View style={styles.infoItem}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : '-'}
            </Text>
          </View>
        </View>
      </Card>

      {/* Permissions Section */}
      <Card title="Access & Permissions">
        <View style={styles.roleContainer}>
          <View style={styles.roleHeader}>
            <Text style={styles.roleIcon}>{getRoleIcon(user?.role)}</Text>
            <View style={styles.roleInfo}>
              <Text style={styles.roleName}>{user?.role?.toUpperCase() || 'USER'}</Text>
              <Text style={styles.roleDescription}>
                {user?.role === 'admin'
                  ? 'Full system access'
                  : user?.role === 'instructor'
                    ? 'Instructor privileges'
                    : 'Standard user access'}
              </Text>
            </View>
          </View>

          {user?.permissions && user.permissions.length > 0 ? (
            <View style={styles.permissionsGrid}>
              {user.permissions.map((permission, index) => (
                <Badge
                  key={index}
                  label={permission}
                  variant="primary"
                  size="sm"
                />
              ))}
            </View>
          ) : (
            <Text style={styles.noPermissions}>No special permissions assigned</Text>
          )}
        </View>
      </Card>

      {/* Security Section */}
      <Card title="Security">
        <TouchableOpacity style={styles.securityItem}>
          <View style={styles.securityContent}>
            <Text style={styles.securityIcon}>🔐</Text>
            <View style={styles.securityInfo}>
              <Text style={styles.securityLabel}>Change Password</Text>
              <Text style={styles.securityDesc}>Update your password</Text>
            </View>
          </View>
          <Text style={styles.securityArrow}>›</Text>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity style={styles.securityItem}>
          <View style={styles.securityContent}>
            <Text style={styles.securityIcon}>🛡️</Text>
            <View style={styles.securityInfo}>
              <Text style={styles.securityLabel}>Two-Factor Authentication</Text>
              <Text style={styles.securityDesc}>Disable (Current)</Text>
            </View>
          </View>
          <Text style={styles.securityArrow}>›</Text>
        </TouchableOpacity>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title="Edit Profile"
          variant="outline"
          size="lg"
        // disabled
        />
        <Button
          title="Sign Out"
          variant="primary"
          size="lg"
          onPress={handleLogout}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>App Version 1.0.0</Text>
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
    paddingHorizontal: Spacing.lg,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
  },
  iconButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flex: 1,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: Typography.semibold,
    color: Colors.text,
    textAlign: 'center',
  },
  topRight: {
    alignItems: 'flex-end',
    marginBottom: Spacing.lg,
  },
  headerSection: {
    position: 'relative',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl3,
    alignItems: 'center',
  },
  headerTop: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  glowBackground: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    opacity: 0.1,
  },
  profileHeader: {
    alignItems: 'center',
    zIndex: 1,
  },
  userName: {
    fontSize: Typography.h4,
    fontWeight: Typography.bold as any,
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl2,
    gap: Spacing.lg,
  },
  statCard: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  statContent: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  statLabel: {
    fontSize: Typography.caption,
    color: Colors.textTertiary,
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: Typography.bodySmall,
    color: Colors.text,
    fontWeight: Typography.semibold as any,
    textAlign: 'center',
  },
  infoItem: {
    paddingVertical: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    fontWeight: Typography.medium as any,
  },
  infoValue: {
    fontSize: Typography.body,
    color: Colors.text,
    fontWeight: Typography.semibold as any,
    marginLeft: Spacing.lg,
    flex: 1,
    textAlign: 'right',
  },
  email: {
    color: Colors.primary,
  },
  roleContainer: {
    backgroundColor: Colors.surfaceLight,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  roleIcon: {
    fontSize: 40,
    marginRight: Spacing.lg,
  },
  roleInfo: {
    flex: 1,
  },
  roleName: {
    fontSize: Typography.h6,
    fontWeight: Typography.bold as any,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  roleDescription: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
  },
  permissionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  noPermissions: {
    fontSize: Typography.bodySmall,
    color: Colors.textTertiary,
    fontStyle: 'italic',
  },
  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  securityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  securityIcon: {
    fontSize: 28,
    marginRight: Spacing.lg,
  },
  securityInfo: {
    flex: 1,
  },
  securityLabel: {
    fontSize: Typography.body,
    fontWeight: Typography.semibold as any,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  securityDesc: {
    fontSize: Typography.bodySmall,
    color: Colors.textTertiary,
  },
  securityArrow: {
    fontSize: Typography.h6,
    color: Colors.textTertiary,
  },
  actionButtons: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    gap: Spacing.lg,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  footerText: {
    fontSize: Typography.caption,
    color: Colors.textTertiary,
  },
});
