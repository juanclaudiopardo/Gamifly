import { Image, ImageSourcePropType } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CategoryBannerProps {
  image: ImageSourcePropType;
  title: string;
}

export const CategoryBanner = ({ image, title }: CategoryBannerProps) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={image} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.textContainer}>
        <Text style={styles.overlayText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 123,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },
});