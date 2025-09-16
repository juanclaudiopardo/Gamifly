import { EvilIcons, AntDesign, Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductHeaderProps {
  title: string;
  onBack: () => void;
  isLiked?: boolean;
  onLikeToggle?: (liked: boolean) => void;
}

export function ProductHeader({ 
  title, 
  onBack, 
  isLiked = false, 
  onLikeToggle 
}: ProductHeaderProps) {
  const [liked, setLiked] = useState(isLiked);

  const handleHeartPress = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    onLikeToggle?.(newLikedState);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBack} style={styles.iconButton}>
        <EvilIcons name='chevron-left' size={40} color='black' />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={handleHeartPress} style={styles.iconButton}>
        {liked ? (
          <AntDesign name='heart' size={24} color='#EF4444' />
        ) : (
          <Feather name='heart' size={24} color='#9CA3AF' />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  iconButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
});