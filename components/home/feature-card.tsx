import { Entypo } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface FeatureCardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export const FeatureCard = ({
  image,
  title,
  subtitle,
  onPress,
}: FeatureCardProps) => {
  return (
    <View style={styles.wrapper}>
      {/* Back card - just for visual effect */}
      <View style={[styles.card, styles.backCard]} />

      {/* Front card (interactive) */}
      <TouchableOpacity
        style={[styles.card, styles.frontCard]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.content}>
          <Image source={image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
        <Entypo name='chevron-thin-right' size={18} color='black' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    height: 100,
    alignItems: 'center',
    position: 'relative',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    height: 84,
  },
  backCard: {
    top: 15,
    width: '87%',
    backgroundColor: '#FAFAFA',
    zIndex: 1,
  },
  frontCard: {
    top: 0,
    width: '100%',
    zIndex: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 13,
    marginRight: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 10,
    color: '#727272',
    marginTop: 4,
  },
});
