import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Input from '../../../core/components/Input';
import Button from '../../../core/components/Button';
import Card from '../../../core/components/Card';
import { AuthContext } from '../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius } from '../../../core/theme/theme';

export default function RegisterScreen({ navigation }: any) {
  const auth = React.useContext(AuthContext);
  if (!auth) throw new Error('AuthContext missing');
  const { register } = auth;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email address';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = 'Mobile must be exactly 10 digits';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        mobile: formData.mobile,
      });
    } catch (e: any) {
      const msg = e?.response?.data?.message || e.message || 'Registration failed';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const passwordStrength = () => {
    const pwd = formData.password;
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return Math.min(strength, 3);
  };

  const getStrengthColor = () => {
    const strength = passwordStrength();
    if (strength === 0) return Colors.textTertiary;
    if (strength === 1) return Colors.error;
    if (strength === 2) return Colors.warning;
    return Colors.success;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Name Field */}
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(val) => handleInputChange('name', val)}
            editable={!loading}
            error={errors.name}
            icon={<Text style={styles.icon}>👤</Text>}
          />

          {/* Email Field */}
          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(val) => handleInputChange('email', val)}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
            error={errors.email}
            icon={<Text style={styles.icon}>📧</Text>}
          />

          {/* Mobile Field */}
          <Input
            label="Mobile Number"
            placeholder="10-digit mobile number"
            value={formData.mobile}
            onChangeText={(val) => handleInputChange('mobile', val)}
            keyboardType="phone-pad"
            editable={!loading}
            error={errors.mobile}
            icon={<Text style={styles.icon}>📱</Text>}
          />

          {/* Password Field */}
          <View>
            <Input
              label="Password"
              placeholder="Create a strong password"
              value={formData.password}
              onChangeText={(val) => handleInputChange('password', val)}
              secureTextEntry={!showPassword}
              editable={!loading}
              error={errors.password}
              icon={<Text style={styles.icon}>🔒</Text>}
              rightIcon={
                <Text style={styles.icon}>{showPassword ? '👁' : '👁‍🗨'}</Text>
              }
              onRightIconPress={() => setShowPassword(!showPassword)}
            />
            {formData.password && (
              <View style={styles.strengthContainer}>
                <Text style={styles.strengthLabel}>Password Strength:</Text>
                <View style={styles.strengthBar}>
                  {[0, 1, 2].map((i) => (
                    <View
                      key={i}
                      style={[
                        styles.strengthSegment,
                        i < passwordStrength() && {
                          backgroundColor: getStrengthColor(),
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Confirm Password Field */}
          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChangeText={(val) => handleInputChange('confirmPassword', val)}
            secureTextEntry={!showConfirmPassword}
            editable={!loading}
            error={errors.confirmPassword}
            icon={<Text style={styles.icon}>🔐</Text>}
            rightIcon={
              <Text style={styles.icon}>{showConfirmPassword ? '👁' : '👁‍🗨'}</Text>
            }
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          {/* Terms & Conditions */}
          <Card style={styles.termsCard}>
            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </Card>

          {/* Register Button */}
          <Button
            title="Create Account"
            onPress={onSubmit}
            loading={loading}
            disabled={loading}
            size="lg"
          />

          {/* Already have account */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: Spacing.xl2,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl3,
    paddingTop: Spacing.xl,
  },
  title: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold as any,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
  formContainer: {
    paddingHorizontal: Spacing.xl,
  },
  strengthContainer: {
    marginBottom: Spacing.md,
    marginLeft: Spacing.lg,
  },
  strengthLabel: {
    fontSize: Typography.caption,
    color: Colors.textTertiary,
    marginBottom: Spacing.sm,
  },
  strengthBar: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  strengthSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  termsCard: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  termsText: {
    fontSize: Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: Typography.semibold as any,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl2,
    paddingBottom: Spacing.xl,
  },
  footerText: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
  footerLink: {
    fontSize: Typography.body,
    color: Colors.primary,
    fontWeight: Typography.semibold as any,
  },
  icon: {
    fontSize: 20,
  },
});
