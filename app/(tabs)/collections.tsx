import { ProductCard, type Product } from '@/components/collections';
import { SectionHeader } from '@/components/common';
import { Image } from 'expo-image';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const collectionsData: Product[] = [
  {
    id: '1',
    name: 'Moisturizing',
    image: require('@/assets/collections/product1.png'),
    currentPrice: 103,
    originalPrice: 117,
  },
  {
    id: '2',
    name: 'Deep Breath',
    image: require('@/assets/collections/product2.png'),
    currentPrice: 79,
    originalPrice: 81,
  },
];

export default function Collection() {
  return (
    <SafeAreaView style={{ paddingHorizontal: 20 }}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/collections/allProducts.png')}
          style={styles.image}
        />
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <Text style={styles.overlayText}>All Products</Text>
        </View>
      </View>
      <SectionHeader title='Best Sellers' actionHref='/' />
      <FlatList
        data={collectionsData}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onHeartPress={(productId, isLiked) => {
              console.log(
                `Product ${productId} ${isLiked ? 'liked' : 'unliked'}`
              );
            }}
            onAddToCart={(productId) => {
              console.log(`Product ${productId} added to cart`);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

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
  listContainer: {
    paddingTop: 16,
    gap: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
});
