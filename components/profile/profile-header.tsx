import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export const ProfileHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text>Profile</Text>
      <Entypo
        name='dots-three-horizontal'
        size={24}
        color='black'
        style={{
          backgroundColor: 'white',
          borderRadius: 50,
          alignSelf: 'center',
          padding: 6,
        }}
      />
    </View>
  );
};
