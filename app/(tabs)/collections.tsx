import {
  CategoryBanner,
  PopularCard,
  ProductCard,
} from '@/components/collections';
import { SectionHeader } from '@/components/common';
import { SearchBar } from '@/components/ui/search-bar';
import { collectionsData } from '@/data/collections-data';
import { popularData } from '@/data/popular-data';
import { Feather } from '@expo/vector-icons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from 'expo-router';
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: 'white',
            width: 50,
            height: 50,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <EvilIcons name='chevron-left' size={40} color='black' />
        </TouchableOpacity>
        <SearchBar
          onFilterPress={handleFilterPress}
          containerStyle={{ flex: 1 }}
          placeholder='Search here'
        />

        <TouchableOpacity
          onPress={handleScanPress}
          style={{
            backgroundColor: 'white',
            width: 50,
            height: 50,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Feather name='shopping-bag' size={24} color='black' />
        </TouchableOpacity>
      </View>
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
