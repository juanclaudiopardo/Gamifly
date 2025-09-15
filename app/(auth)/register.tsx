import { SocialLogin } from '@/components/common';
import { Button, Checkbox, Input } from '@/components/ui';
import {
  EvilIcons,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email({ message: 'Enter a valid email' }),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
    acceptTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log('Registration data:', data);
    Alert.alert('Success', 'Registration data logged to console');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name='chevron-back' size={24} color='black' />
        </TouchableOpacity>
        <Text style={styles.title}>Glamify</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.form}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Text style={styles.formTitle}>Create an Account?</Text>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name='fullName'
              render={({ field: { onChange, value } }) => (
                <Input
                  label='Full Name'
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize='words'
                  autoCorrect={false}
                  placeholder='Micheal Johnson'
                  editable={!isSubmitting}
                  error={errors.fullName?.message}
                  leftIcon={<EvilIcons name='user' size={24} color='#808080' />}
                />
              )}
            />

            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value } }) => (
                <Input
                  label='Email'
                  value={value}
                  onChangeText={onChange}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholder='micheal09@gmail.com'
                  editable={!isSubmitting}
                  error={errors.email?.message}
                  leftIcon={
                    <MaterialCommunityIcons
                      name='email-outline'
                      size={24}
                      color='#808080'
                    />
                  }
                />
              )}
            />

            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, value } }) => (
                <Input
                  label='Password'
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                  placeholder='********'
                  editable={!isSubmitting}
                  error={errors.password?.message}
                  leftIcon={
                    <Ionicons
                      name='lock-closed-outline'
                      size={24}
                      color='#808080'
                    />
                  }
                  rightIcon={
                    <Feather
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color='#808080'
                    />
                  }
                  onRightIconPress={() => setShowPassword(!showPassword)}
                />
              )}
            />

            <Controller
              control={control}
              name='confirmPassword'
              render={({ field: { onChange, value } }) => (
                <Input
                  label='Confirm Password'
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showConfirmPassword}
                  placeholder='********'
                  editable={!isSubmitting}
                  error={errors.confirmPassword?.message}
                  leftIcon={
                    <Ionicons
                      name='lock-closed-outline'
                      size={24}
                      color='#808080'
                    />
                  }
                  rightIcon={
                    <Feather
                      name={showConfirmPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color='#808080'
                    />
                  }
                  onRightIconPress={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                />
              )}
            />
          </View>
          <View style={styles.termsContainer}>
            <Controller
              control={control}
              name='acceptTerms'
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  label='I accept the terms and conditions'
                  checked={value}
                  onValueChange={onChange}
                />
              )}
            />
            {errors.acceptTerms && (
              <Text style={styles.errorText}>{errors.acceptTerms.message}</Text>
            )}
          </View>
          <Button
            title='Sign Up'
            onPress={handleSubmit(onSubmit as any)}
            loading={isSubmitting}
          />

          <SocialLogin />

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.registerLink}>Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.hint}>To test: test@example.com / password</Text>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#FFF',
  },
  placeholder: {
    width: 48, // Same width as backButton to balance the layout
  },
  container: {
    flexGrow: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: 'white',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 57,
    width: 262,
    alignSelf: 'center',
  },
  inputContainer: {
    gap: 21,
  },
  termsContainer: {
    marginTop: 12,
    marginBottom: 24,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  forgotPasswordLink: {
    fontSize: 12,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: '#53565A',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '500',
  },
  testButton: {
    marginTop: 32,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  hint: {
    textAlign: 'center',
    marginTop: 16,
    color: '#666',
    fontSize: 14,
  },
});
