import {
  CategoryBanner,
  CollectionSearchHeader,
  PopularCard,
} from '@/components/collections';
import { ProductCard, SectionHeader } from '@/components/common';
import { collectionsData } from '@/data/collections-data';
import { popularData } from '@/data/popular-data';
import { ScrollView, StyleSheet, View } from 'react-native';
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <CategoryBanner
          image={require('@/assets/collections/allProducts.png')}
          title='All Products'
        />
        <SectionHeader title='Best Sellers' actionHref='/' />
        <View style={styles.horizontalContainer}>
          {collectionsData.slice(0, 2).map((item) => (
            <ProductCard
              key={item.id}
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
          ))}
        </View>
        <SectionHeader title='Popular' actionHref='/' />
        <View
          style={{
            gap: 16,
            marginTop: 16,
          }}
        >
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    gap: 12,
  },
});
