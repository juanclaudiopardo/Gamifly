import React from 'react';
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

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
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Image source={image} style={styles.image} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
      <Entypo name='chevron-thin-right' size={18} color='black' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
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
