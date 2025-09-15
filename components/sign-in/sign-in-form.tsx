import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignInFormProps {
  control: Control<SignInFormData>;
  errors: FieldErrors<SignInFormData>;
  isSubmitting: boolean;
  showPassword: boolean;
  onShowPasswordToggle: () => void;
  onForgotPassword: () => void;
  styles: any;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  control,
  errors,
  isSubmitting,
  showPassword,
  onShowPasswordToggle,
  onForgotPassword,
  styles,
}) => {
  return (
    <>
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
              onRightIconPress={onShowPasswordToggle}
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

        <TouchableOpacity onPress={onForgotPassword}>
          <Text style={styles.forgotPasswordLink}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};