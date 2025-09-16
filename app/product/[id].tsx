import { ProductPrice } from '@/components/pruduct';
import { collectionsData } from '@/data/collections-data';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = collectionsData.find((p) => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    console.log(`Agregando ${quantity} de ${product.name} al carrito`);
  };

  const handleBuyNow = () => {
    console.log(`Comprando ${quantity} de ${product.name}`);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={product.image} style={styles.productImage} />
          <ProductPrice
            name={product.name}
            currentPrice={product.currentPrice}
          />
          <View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle}>Descripción</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>

            <View style={styles.quantityContainer}>
              <Text style={styles.sectionTitle}>Cantidad</Text>
              <View style={styles.quantitySelector}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={decrementQuantity}
                >
                  <AntDesign name='minus' size={20} color='#666' />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={incrementQuantity}
                >
                  <AntDesign name='plus' size={20} color='#666' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={handleAddToCart}
              >
                <Feather name='shopping-bag' size={20} color='#0FB758' />
                <Text style={styles.addToCartText}>Agregar al Carrito</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buyNowButton}
                onPress={handleBuyNow}
              >
                <Text style={styles.buyNowText}>Comprar Ahora</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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

  productName: {
    fontSize: 22,
    fontWeight: '500',
  },
  productNameDescription: {
    fontSize: 12,
    color: '#656565',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: '500',
  },
  originalPrice: {
    fontSize: 20,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  quantityContainer: {
    marginBottom: 30,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  actionButtons: {
    gap: 15,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#0FB758',
    borderRadius: 12,
    padding: 15,
    gap: 10,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0FB758',
  },
  buyNowButton: {
    backgroundColor: '#0FB758',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 50,
  },
});
