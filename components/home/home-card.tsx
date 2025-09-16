import type { HomeCardData } from '@/data/home-cards';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface HomeCardProps {
  card: HomeCardData;
}

export const HomeCard = ({ card }: HomeCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={card.image} style={styles.image} />
        <Pressable
          style={styles.heartButton}
          onPress={() => setIsLiked(!isLiked)}
        >
          {isLiked ? (
            <AntDesign
              name="heart"
              size={20}
              color="#EF4444"
            />
          ) : (
            <Feather
              name="heart"
              size={20}
              color="#9CA3AF"
            />
          )}
        </Pressable>
      </View>
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
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 166,
    borderRadius: 20,
    marginBottom: 10,
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
