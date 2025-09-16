import type { HomeCardData } from '@/data/home-cards';
import { Feather } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

interface HomeCardProps {
  card: HomeCardData;
}

export const HomeCard = ({ card }: HomeCardProps) => {
  return (
    <View style={styles.container}>
      <Image source={card.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{card.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>
              ${card.currentPrice.toFixed(1)}
            </Text>
            <Text style={styles.wasText}> was </Text>
            <Text style={styles.originalPrice}>
              ${card.originalPrice.toFixed(1)}
            </Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Feather name='shopping-bag' size={16} color='white' />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 187,
    // marginHorizontal: 8,
  },
  image: {
    width: '100%',
    height: 166,
    borderRadius: 20,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  wasText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  originalPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  iconContainer: {
    backgroundColor: '#0FB758',
    padding: 10,
    borderRadius: 50,
    marginLeft: 12,
  },
});
