import { SocialLogin } from '@/components/social-login';
import { Button, Checkbox, Input } from '@/components/ui';
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
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
              marginBottom: 24,
            }}
          >
            <Checkbox
              label='Remember me'
              checked={accepted}
              onValueChange={setAccepted}
            />
            <Link href='/forgot-password' asChild>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordLink}>Forgot password?</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <Button title='Login' onPress={handleSignIn} loading={isSubmitting} />

          <SocialLogin />

          {/* Enlaces de navegación */}

          {/* <Link href='/forgot-password' style={styles.forgotLink}>
              Forgot your password?
            </Link> */}

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
