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
import { createSubCustomerApi } from '../api/subcustomer';
import { Colors, Typography, Spacing, BorderRadius } from '../../../core/theme/theme';

export default function AddSubCustomerScreen({ route, navigation }: any) {
    const auth = useContext(AuthContext);
    if (!auth) throw new Error('AuthContext missing');
    const { businessDetails } = auth;
    const { customerId } = route.params || {};

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
        else if (!/^\d{10}$/.test(formData.mobile.trim()))
            newErrors.mobile = 'Mobile must be exactly 10 digits';
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = 'Invalid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async () => {
        if (!validateForm()) return;
        if (!businessDetails?.client_id) {
            Alert.alert('Error', 'Business details not found');
            return;
        }
        if (!customerId) {
            Alert.alert('Error', 'Customer not found');
            return;
        }

        setLoading(true);
        try {
            await createSubCustomerApi({
                clientId: businessDetails.client_id,
                customerId: customerId,
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim() || undefined,
                mobile: formData.mobile.trim(),
                email: formData.email.trim() || undefined,
                address: formData.address.trim() || undefined,
            });
            Alert.alert('Success', 'Sub-customer added successfully', [
                {
                    text: 'OK', onPress: () => {
                        setFormData({
                            firstName: '',
                            lastName: '',
                            mobile: '',
                            email: '',
                            address: '',
                        });
                        navigation?.goBack();
                    }
                }
            ]);
        } catch (e: any) {
            const msg = e?.response?.data?.message || e.message || 'Failed to add sub-customer';
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
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Add Sub-Customer</Text>
                    <Text style={styles.subtitle}>Add a new sub-customer to this customer</Text>
                </View>

                {/* Form Container */}
                <View style={styles.formContainer}>
                    <Card>
                        <Input
                            label="First Name"
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChangeText={(value) => handleInputChange('firstName', value)}
                            editable={!loading}
                            error={errors.firstName}
                            icon={<Text style={styles.icon}>👤</Text>}
                        />

                        <Input
                            label="Last Name (Optional)"
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChangeText={(value) => handleInputChange('lastName', value)}
                            editable={!loading}
                            error={errors.lastName}
                            icon={<Text style={styles.icon}>👤</Text>}
                        />

                        <Input
                            label="Mobile Number"
                            placeholder="Enter 10-digit mobile number"
                            value={formData.mobile}
                            onChangeText={(value) => handleInputChange('mobile', value)}
                            keyboardType="phone-pad"
                            editable={!loading}
                            error={errors.mobile}
                            icon={<Text style={styles.icon}>📱</Text>}
                        />

                        <Input
                            label="Email (Optional)"
                            placeholder="Enter email address"
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
                            placeholder="Enter sub-customer address"
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
                        Sub-customers are linked to this customer and can be managed independently.
                    </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <Button
                        title={loading ? 'Adding Sub-Customer...' : 'Add Sub-Customer'}
                        onPress={onSubmit}
                        disabled={loading}
                        variant="primary"
                        size="lg"
                    />
                    <Button
                        title="Cancel"
                        onPress={() => navigation?.goBack()}
                        disabled={loading}
                        variant="outline"
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
