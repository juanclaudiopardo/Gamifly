import { Button } from '@/components/ui';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ProductQuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onAddToCart: () => void;
}

export function ProductQuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  onAddToCart,
}: ProductQuantitySelectorProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          borderWidth: 1,
          borderRadius: 39,
          paddingHorizontal: 14,
          paddingVertical: 13,
        }}
      >
        <TouchableOpacity onPress={onDecrement}>
          <AntDesign
            name='minus'
            size={14}
            color='black'
            style={{ borderWidth: 1, borderRadius: 50, padding: 4 }}
          />
        </TouchableOpacity>
        <Text>{quantity}</Text>
        <TouchableOpacity onPress={onIncrement}>
          <AntDesign
            name='plus'
            size={14}
            color='white'
            style={{
              borderWidth: 1,
              borderRadius: 50,
              padding: 4,
              backgroundColor: '#0FB758',
              borderColor: '#0FB758',
            }}
          />
        </TouchableOpacity>
      </View>
      <Button title='Add to Cart' style={{ flex: 1 }} onPress={onAddToCart} />
    </View>
  );
}