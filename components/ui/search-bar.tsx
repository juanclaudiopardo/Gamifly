import { EvilIcons, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  onFilterPress?: () => void;
  showFilter?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  leftIconColor?: string;
  filterIconColor?: string;
}

export function SearchBar({
  onFilterPress,
  showFilter = true,
  containerStyle,
  inputStyle,
  leftIconColor = '#000000',
  filterIconColor = '#7E899A',
  placeholder = 'Search here',
  ...textInputProps
}: SearchBarProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.leftIcon}>
        <EvilIcons name='search' size={24} color={leftIconColor} />
      </View>

      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor='#999999'
        {...textInputProps}
      />

      {showFilter && (
        <View style={styles.rightIconContainer}>
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={onFilterPress}
            style={styles.filterButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name='options-outline'
              size={20}
              color={filterIconColor}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 33,
    paddingHorizontal: 12,
    height: 48,
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 0,
  },
  rightIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  filterButton: {
    padding: 4,
  },
});
