import { SocialLogin } from '@/components/common';
import { SignInForm } from '@/components/sign-in';
import { Button } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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

const signInSchema = z.object({
  email: z.email({ message: 'Enter a valid email' }),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema) as any,
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signIn(data.email.trim(), data.password);
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Error al iniciar sesión'
      );
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#F4F4F7' }}
      edges={['top']}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.title}>Glamify</Text>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Welcome to Glamify Login now!</Text>

          <SignInForm
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            showPassword={showPassword}
            onShowPasswordToggle={() => setShowPassword(!showPassword)}
            onForgotPassword={() => console.log('Forgot Password')}
            styles={styles}
          />

          <Button
            title='Login'
            onPress={handleSubmit(onSubmit as any)}
            loading={isSubmitting}
          />

          <SocialLogin />

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don&apos;t have an account?{' '}
            </Text>
            <Link href='/register' asChild>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Create an account</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <Text style={styles.hint}>To test: test@example.com / password</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: 'white',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 177,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 57,
    width: 262,
    alignSelf: 'center',
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

  hint: {
    textAlign: 'center',
    marginTop: 16,
    color: '#666',
    fontSize: 14,
  },
});
