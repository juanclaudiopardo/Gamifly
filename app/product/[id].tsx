import {
  ProductPrice,
  ProductQuantitySelector,
  ProductTabSlider,
  ProductHeader,
} from '@/components/pruduct';
import { collectionsData } from '@/data/collections-data';
import { wishlistData } from '@/data/wishlist-data';
import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);

  const product = collectionsData.find((p) => p.id === id) || wishlistData.find((p) => p.id === id);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    console.log(`Agregando ${quantity} de ${product.name} al carrito`);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleBackPress = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProductHeader
            title="Product Details"
            onBack={handleBackPress}
            onLikeToggle={(liked) => console.log('Liked:', liked)}
          />
          <Image source={product.image} style={styles.productImage} />
          <ProductPrice
            name={product.name}
            currentPrice={product.currentPrice}
          />

          <ProductTabSlider product={product} />
        </ScrollView>
        <ProductQuantitySelector
          quantity={quantity}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
          onAddToCart={handleAddToCart}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  productImage: {
    width: '100%',
    height: 421,
    borderRadius: 20,
  },
});
