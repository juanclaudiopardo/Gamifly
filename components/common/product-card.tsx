import { Product } from '@/data/collections-data';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
  product: Product;
  onHeartPress?: (productId: string, isLiked: boolean) => void;
  onAddToCart?: (productId: string) => void;
  isWishlist?: boolean;
  addButtonColor?: string;
}

export const ProductCard = ({
  product,
  onHeartPress,
  onAddToCart,
  isWishlist = false,
  addButtonColor = '#0FB758',
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(isWishlist);
  const router = useRouter();

  const handleHeartPress = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onHeartPress?.(product.id, newLikedState);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product.id);
  };

  const handleProductPress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleProductPress}>
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.image} />
        <TouchableOpacity style={styles.heartButton} onPress={handleHeartPress}>
          {isLiked ? (
            <AntDesign name='heart' size={20} color='#EF4444' />
          ) : (
            <Feather name='heart' size={20} color='#9CA3AF' />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.priceContainer}>
            ${product.currentPrice}
            <Text style={styles.wasText}> was</Text>
            <Text style={styles.originalPrice}> ${product.originalPrice}</Text>
          </Text>
        </View>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: addButtonColor }, isWishlist && styles.wishlistButton]} onPress={handleAddToCart}>
          <Feather name='shopping-bag' size={16} color={isWishlist ? 'black' : 'white'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    maxWidth: 187,
    borderRadius: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 187,
    height: 166,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    gap: 4,
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
  },
  priceContainer: {
    fontSize: 14,
    fontWeight: '500',
  },
  wasText: {
    fontSize: 12,
    color: '#494747',
  },
  originalPrice: {
    fontSize: 12,
    color: '#868D93',
  },
  addButton: {
    padding: 10,
    borderRadius: 50,
    marginLeft: 12,
  },
  wishlistButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});
