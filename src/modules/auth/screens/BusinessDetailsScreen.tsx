import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import Input from '../../../core/components/Input';
import Button from '../../../core/components/Button';
import Card from '../../../core/components/Card';
import { AuthContext } from '../context/AuthContext';
import { Colors, Typography, Spacing, BorderRadius } from '../../../core/theme/theme';

export default function BusinessDetailsScreen({ navigation }: any) {
    const auth = useContext(AuthContext);
    if (!auth) throw new Error('AuthContext missing');
    const { createBusinessDetails } = auth;

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Business name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = 'Invalid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            await createBusinessDetails({
                name: formData.name.trim(),
                phone: formData.phone.trim() || undefined,
                email: formData.email.trim() || undefined,
                address: formData.address.trim() || undefined,
            });
            // Navigate to Add Customer screen after successful creation
            navigation?.replace('AddCustomer');
        } catch (e: any) {
            const msg = e?.response?.data?.message || e.message || 'Failed to save business details';
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

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >

                {/* Form Container */}
                <View style={styles.formContainer}>
                    <Card>
                        <Input
                            label="Business Name"
                            placeholder="Enter your business name"
                            value={formData.name}
                            onChangeText={(value) => handleInputChange('name', value)}
                            editable={!loading}
                            error={errors.name}
                            icon={<Text style={styles.icon}>🏢</Text>}
                        />

                        <Input
                            label="Phone Number"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChangeText={(value) => handleInputChange('phone', value)}
                            keyboardType="phone-pad"
                            editable={!loading}
                            error={errors.phone}
                            icon={<Text style={styles.icon}>📱</Text>}
                        />

                        <Input
                            label="Email (Optional)"
                            placeholder="Enter business email"
                            value={formData.email}
                            onChangeText={(value) => handleInputChange('email', value)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!loading}
                            error={errors.email}
                            icon={<Text style={styles.icon}>📧</Text>}
                        />

                        <Input
                            label="Address (Optional)"
                            placeholder="Enter business address"
                            value={formData.address}
                            onChangeText={(value) => handleInputChange('address', value)}
                            editable={!loading}
                            multiline
                            numberOfLines={3}
                            error={errors.address}
                            icon={<Text style={styles.icon}>📍</Text>}
                        />
                    </Card>
                </View>

                {/* Info Section */}
                <View style={styles.infoSection}>
                    <Text style={styles.infoText}>
                        This information will be used as your business profile and will help us serve you better.
                    </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <Button
                        title={loading ? 'Saving...' : 'Continue'}
                        onPress={onSubmit}
                        disabled={loading}
                        variant="primary"
                        size="lg"
                    />
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
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
        flexGrow: 1,
    },
    header: {
        marginBottom: Spacing.xl,
    },
    title: {
        fontSize: 28,
        fontWeight: Typography.bold,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        fontWeight: Typography.normal,
    },
    formContainer: {
        marginBottom: Spacing.lg,
    },
    icon: {
        fontSize: 20,
    },
    infoSection: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        marginBottom: Spacing.lg,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
    },
    infoText: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: Typography.normal,
        lineHeight: 20,
    },
    buttonContainer: {
        gap: Spacing.md,
    },
});
