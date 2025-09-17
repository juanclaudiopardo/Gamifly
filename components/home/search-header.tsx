import { SearchBar } from '@/components/ui/search-bar';
import Feather from '@expo/vector-icons/Feather';
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

      <SearchBar
        onFilterPress={onFilterPress}
        containerStyle={styles.searchInput}
        placeholder='Search here'
      />

      <TouchableOpacity onPress={onScanPress} style={styles.scanButton}>
        <Feather name='shopping-bag' size={24} color='#989898' />
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
