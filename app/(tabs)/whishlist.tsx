import { ProductCard } from '@/components/collections';
import { SectionHeader } from '@/components/common';
import { wishlistData } from '@/data/wishlist-data';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Whishlist() {
  const handleHeartPress = (productId: string, isLiked: boolean) => {
    console.log(`Wishlist item ${productId} ${isLiked ? 'liked' : 'unliked'}`);
  };

  const handleAddToCart = (productId: string) => {
    console.log(`Wishlist item ${productId} added to cart`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader title='My Wishlist' actionHref='/' />
      <FlatList
        data={wishlistData}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onHeartPress={handleHeartPress}
            onAddToCart={handleAddToCart}
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingTop: 16,
    gap: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
});
