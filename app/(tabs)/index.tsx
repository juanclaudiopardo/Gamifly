import { SectionHeader } from '@/components/common';
import {
  Carousel,
  FeatureCard,
  HomeCard,
  SearchHeader,
} from '@/components/home';
import { homeCards } from '@/data/home-cards';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleScanPress = () => {
    console.log('Scan pressed');
  };

  const handleBuyPress = (itemId: string) => {
    console.log('Buy pressed for item:', itemId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchHeader
          onFilterPress={handleFilterPress}
          onScanPress={handleScanPress}
        />
        <Carousel showDots={false} onBuyPress={handleBuyPress} />
        <FeatureCard
          image={require('@/assets/home/skininsights.png')}
          title='Skin Insights'
          subtitle='Glow deeper skincare solutions.'
          onPress={() => console.log('Feature card pressed')}
        />

        <SectionHeader
          title='New Launches'
          actionHref='/collections'
          containerStyle={{ marginHorizontal: 20 }}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={homeCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HomeCard card={item} />}
          contentContainerStyle={styles.cardList}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardList: {
    gap: 24,
    flex: 1,
    justifyContent: 'center',
    marginTop: 16,
  },
});
