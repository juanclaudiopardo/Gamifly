import { SearchBar } from '@/components/ui/search-bar';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface CollectionSearchHeaderProps {
  onFilterPress?: () => void;
  onScanPress?: () => void;
  onBackPress?: () => void;
  searchPlaceholder?: string;
}

export function CollectionSearchHeader({
  onFilterPress,
  onScanPress,
  onBackPress,
  searchPlaceholder = 'Search here',
}: CollectionSearchHeaderProps) {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
        <EvilIcons name='chevron-left' size={40} color='black' />
      </TouchableOpacity>

      <SearchBar
        onFilterPress={onFilterPress}
        containerStyle={styles.searchBar}
        placeholder={searchPlaceholder}
      />

      <TouchableOpacity onPress={onScanPress} style={styles.iconButton}>
        <Feather name='shopping-bag' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
  },
});