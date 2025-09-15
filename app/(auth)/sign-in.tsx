import { Button, Input } from '@/components/ui';
import { SocialLogin } from '@/components/social-login';
import { useAuth } from '@/context/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }

    try {
      setIsSubmitting(true);
      await signIn(email.trim(), password);
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Error al iniciar sesión'
      );
    } finally {
      setIsSubmitting(false);
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
            <Input
              label='Email'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              placeholder='micheal09@gmail.com'
              editable={!isSubmitting}
              leftIcon={
                <MaterialCommunityIcons
                  name='email-outline'
                  size={24}
                  color='#808080'
                />
              }
            />

            <Input
              label='Password'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder='********'
              editable={!isSubmitting}
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
          </View>
          <Button
            title='Login'
            onPress={handleSignIn}
            loading={isSubmitting}
            size='large'
          />

          <SocialLogin />

          {/* Enlaces de navegación */}
          <View style={styles.linksContainer}>
            <Link href='/forgot-password' style={styles.forgotLink}>
              Forgot your password?
            </Link>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                Don&apos;t have an account?{' '}
              </Text>
              <Link href='/register' style={styles.registerLink}>
                Sign up
              </Link>
            </View>
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
    backgroundColor: '#f5f5f5',
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linksContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  forgotLink: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },
  registerLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
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
