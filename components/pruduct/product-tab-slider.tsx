import { Divider } from '@/components/ui';
import { Product } from '@/data/collections-data';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ProductTabSliderProps {
  product: Product;
}

export function ProductTabSlider({ product }: ProductTabSliderProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'howToUse' | 'ingredients'>('details');
  const linePosition = useRef(new Animated.Value(0)).current;

  const animateToTab = (tab: 'details' | 'howToUse' | 'ingredients') => {
    let toValue = 0;
    if (tab === 'details') toValue = 0;
    if (tab === 'howToUse') toValue = 1;
    if (tab === 'ingredients') toValue = 2;

    Animated.timing(linePosition, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    setActiveTab(tab);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginVertical: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity onPress={() => animateToTab('details')}>
          <Text
            style={{
              color: activeTab === 'details' ? '#000' : '#989898',
              fontWeight: activeTab === 'details' ? '600' : 'normal',
            }}
          >
            Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => animateToTab('howToUse')}>
          <Text
            style={{
              color: activeTab === 'howToUse' ? '#000' : '#989898',
              fontWeight: activeTab === 'howToUse' ? '600' : 'normal',
            }}
          >
            How to use
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => animateToTab('ingredients')}>
          <Text
            style={{
              color: activeTab === 'ingredients' ? '#000' : '#989898',
              fontWeight: activeTab === 'ingredients' ? '600' : 'normal',
            }}
          >
            Ingredients
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{ marginTop: 7, marginBottom: 16, position: 'relative' }}
      >
        <Divider />
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            backgroundColor: '#000',
            height: 2,
            width: linePosition.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [48, 75, 77],
            }),
            left: linePosition.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [0, 125, 275],
            }),
          }}
        />
      </View>

      <Text style={{ fontSize: 12, color: '#989898' }}>
        {activeTab === 'details' && product.details}
        {activeTab === 'howToUse' && product.howToUse}
        {activeTab === 'ingredients' && product.ingredients}
      </Text>
    </View>
  );
}