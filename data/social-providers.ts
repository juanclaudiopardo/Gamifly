export interface SocialProvider {
  id: string;
  name: string;
  icon: any;
  onPress?: () => void;
}

export const socialProviders: SocialProvider[] = [
  {
    id: 'google',
    name: 'Google',
    icon: require('@/assets/icons/google.png'),
    onPress: () => console.log('Google login'),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: require('@/assets/icons/facebook.png'),
    onPress: () => console.log('Facebook login'),
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: require('@/assets/icons/apple.png'),
    onPress: () => console.log('Apple login'),
  },
];