import {
  CategoryBanner,
  CollectionSearchHeader,
  PopularCard,
  ProductCard,
} from '@/components/collections';
import { SectionHeader } from '@/components/common';
import { collectionsData } from '@/data/collections-data';
import { popularData } from '@/data/popular-data';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Collection() {
  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleScanPress = () => {
    console.log('Scan pressed');
  };
  return (
    <SafeAreaView style={{ paddingHorizontal: 20 }}>
      <CollectionSearchHeader
        onFilterPress={handleFilterPress}
        onScanPress={handleScanPress}
        searchPlaceholder='Search here'
      />
      <CategoryBanner
        image={require('@/assets/collections/allProducts.png')}
        title='All Products'
      />
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
      <SectionHeader title='Popular' actionHref='/popular' />
      <View style={{ gap: 16, marginTop: 16 }}>
        {popularData.map((item) => (
          <PopularCard
            key={item.id}
            image={item.image}
            brand={item.brand}
            product={item.product}
            price={item.price}
            originalPrice={item.originalPrice}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 16,
    gap: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
});
