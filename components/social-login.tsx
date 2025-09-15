import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Divider } from '@/components/ui';
import { socialProviders, SocialProvider } from '@/data/social-providers';

interface SocialLoginProps {
  dividerText?: string;
  providers?: SocialProvider[];
  onProviderPress?: (providerId: string) => void;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({
  dividerText = 'Or Log in with',
  providers = socialProviders,
  onProviderPress,
}) => {
  const handleProviderPress = (provider: SocialProvider) => {
    if (onProviderPress) {
      onProviderPress(provider.id);
    } else if (provider.onPress) {
      provider.onPress();
    }
  };

  return (
    <>
      <View style={styles.dividerContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.dividerText}>{dividerText}</Text>
        <Divider style={styles.divider} />
      </View>

      <View style={styles.providersContainer}>
        {providers.map((provider) => (
          <Avatar
            key={provider.id}
            source={provider.icon}
            size={24}
            onPress={() => handleProviderPress(provider)}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  divider: {
    width: '50%',
    flex: 1,
  },
  dividerText: {
    flex: 1,
    color: '#53565A',
    textAlign: 'center',
  },
  providersContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});