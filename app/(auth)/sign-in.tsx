import { SocialLogin } from '@/components/social-login';
import { Button, Checkbox, Input } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
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
          <View style={{ gap: 21 }}>
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
              marginBottom: 24,
            }}
          >
            <Controller
              control={control}
              name='rememberMe'
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  label='Remember me'
                  checked={value}
                  onValueChange={onChange}
                />
              )}
            />

            <TouchableOpacity onPress={() => console.log('Forgot Password')}>
              <Text style={styles.forgotPasswordLink}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
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
