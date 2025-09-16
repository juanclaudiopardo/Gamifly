import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';

interface PopularCardProps {
  image: ImageSourcePropType;
  brand: string;
  product: string;
  price: number;
  originalPrice: number;
}

export const PopularCard = ({
  image,
  brand,
  product,
  price,
  originalPrice,
}: PopularCardProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 16,
      }}
    >
      <Image
        source={image}
        style={{ width: 55, height: 56, borderRadius: 12 }}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>{brand}</Text>
          <Text style={{ fontSize: 10, color: '#8C8C8C' }}>{product}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: '500' }}>
            ${price.toFixed(1)}{' '}
            <Text style={{ fontSize: 10, color: '#494747' }}>was</Text>{' '}
            <Text style={{ fontSize: 10, color: '#868D93' }}>
              ${originalPrice.toFixed(1)}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
