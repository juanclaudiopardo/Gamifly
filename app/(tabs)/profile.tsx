import { MenuListItem, ProfileHeader, UserCard } from '@/components/profile';
import { useAuth } from '@/context';
import {
  AntDesign,
  EvilIcons,
  Feather,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const { signOut, isLoading } = useAuth();
  const handleSignOut = async () => {
    if (isLoading) return;
    try {
      await signOut();
    } catch {
      // manejar error
    }
  };
  return (
    <SafeAreaView style={{ paddingHorizontal: 20, gap: 24 }}>
      <ProfileHeader />
      <UserCard />
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 24,
          padding: 20,
          gap: 22,
        }}
      >
        <MenuListItem
          icon={
            <Ionicons
              name='location-outline'
              size={24}
              color='#89919D'
              style={{ marginRight: 12 }}
            />
          }
          title='Address Book'
          subtitle='Manage your saved addresses'
        />
        <MenuListItem
          icon={
            <EvilIcons
              name='credit-card'
              size={24}
              color='#89919D'
              style={{ marginRight: 12 }}
            />
          }
          title='Order History'
          subtitle='View your past orders'
        />
        <MenuListItem
          icon={
            <FontAwesome
              name='language'
              size={24}
              color='#89919D'
              style={{ marginRight: 12 }}
            />
          }
          title='Language'
          subtitle='English'
        />
        <MenuListItem
          icon={
            <Feather
              name='bell'
              size={24}
              color='#89919D'
              style={{ marginRight: 12 }}
            />
          }
          title='Notifications'
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 24,
          padding: 20,
          gap: 22,
        }}
      >
        <MenuListItem
          icon={
            <Foundation
              name='telephone'
              size={24}
              color='#89919D'
              style={{ marginRight: 12 }}
            />
          }
          title='Contact Us'
        />
        <MenuListItem
          icon={
            <Ionicons
              name='help-circle-outline'
              size={24}
              color='#89919D'
              style={{ marginRight: 12 }}
            />
          }
          title='Get Help'
        />
        <MenuListItem
          icon={
            <MaterialCommunityIcons
              name='police-badge-outline'
              size={24}
              color='#89919D'
              style={{ marginRight: 12 }}
            />
          }
          title='Privacy Policy'
        />
        <MenuListItem
          icon={
            <Feather
              name='check-square'
              size={24}
              color='#89919D'
              style={{ marginRight: 12 }}
            />
          }
          title='Terms & Conditions'
        />
        <MenuListItem
          icon={
            <AntDesign
              name='logout'
              size={24}
              color='#89919D'
              style={{ marginRight: 12 }}
            />
          }
          onPress={handleSignOut}
          title='Log out'
        />
      </View>
    </SafeAreaView>
  );
}
