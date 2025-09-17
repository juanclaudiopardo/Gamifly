import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';

export const UserCard = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 24,
        flexDirection: 'row',
        padding: 20,
      }}
    >
      <Image
        source={require('@/assets/home/userAvatar.png')}
        style={styles.avatar}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>Ken</Text>
          <Text style={{ fontSize: 10, color: '#838588' }}>
            Ken@example.com
          </Text>
        </View>
        <FontAwesome name='pencil-square-o' size={22} color='#89919D' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 4,
  },
});
