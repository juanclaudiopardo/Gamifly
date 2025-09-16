import { Input } from '@/components/ui';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface SearchHeaderProps {
  onFilterPress?: () => void;
  onScanPress?: () => void;
}

export const SearchHeader = ({
  onFilterPress,
  onScanPress,
}: SearchHeaderProps = {}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/home/userAvatar.png')}
        style={styles.avatar}
      />

      <Input
        style={styles.searchInput}
        inputContainerStyle={styles.searchInputContainer}
        leftIcon={<EvilIcons name='search' size={24} color='black' />}
        rightIcon={
          <View style={styles.rightIconContainer}>
            <View style={styles.divider} />
            <TouchableOpacity onPress={onFilterPress}>
              <Ionicons name='options-outline' size={20} color='#7E899A' />
            </TouchableOpacity>
          </View>
        }
        placeholder='Search here'
      />

      <TouchableOpacity onPress={onScanPress} style={styles.scanButton}>
        <Feather name='shopping-bag' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchInput: {
    flex: 1,
    marginBottom: 5,
  },
  searchInputContainer: {
    borderWidth: 0,
    backgroundColor: '#FFFFFF',
  },
  rightIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#D1D5DB',
    marginRight: 12,
  },
  scanButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
