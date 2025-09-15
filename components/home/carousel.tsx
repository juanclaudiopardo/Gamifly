import { Image } from 'expo-image';
import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.65;
const ITEM_HEIGHT_ACTIVE = ITEM_WIDTH * 0.7;
const ITEM_HEIGHT_INACTIVE = ITEM_WIDTH * 0.55;
const SPACING = (screenWidth - ITEM_WIDTH) / 2;

interface CarouselItemProps {
  item: {
    id: string;
    image: any;
  };
  index: number;
  scrollX: SharedValue<number>;
}

const CarouselItem = ({ item, index, scrollX }: CarouselItemProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.85, 1, 0.85],
      'clamp'
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6],
      'clamp'
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const height = interpolate(
      scrollX.value,
      inputRange,
      [ITEM_HEIGHT_INACTIVE, ITEM_HEIGHT_ACTIVE, ITEM_HEIGHT_INACTIVE],
      'clamp'
    );

    return {
      height,
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, containerAnimatedStyle]}>
      <AnimatedImage 
        source={item.image} 
        style={[styles.image, imageAnimatedStyle]} 
        contentFit="cover" 
      />
    </Animated.View>
  );
};

interface PaginationDotProps {
  index: number;
  activeIndex: number;
}

const PaginationDot = ({ index, activeIndex }: PaginationDotProps) => {
  const dotAnimatedStyle = useAnimatedStyle(() => {
    const isActive = index === activeIndex;
    return {
      width: withTiming(isActive ? 24 : 8, { duration: 200 }),
      backgroundColor: withTiming(
        isActive ? '#000' : '#D1D5DB',
        { duration: 200 }
      ),
    };
  });

  return <Animated.View style={[styles.paginationDot, dotAnimatedStyle]} />;
};

interface CarouselProps {
  showDots?: boolean;
}

export const Carousel = ({ showDots = true }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);

  const carouselData = [
    { id: '1', image: require('@/assets/carousel/image.png') },
    { id: '2', image: require('@/assets/carousel/image2.png') },
    { id: '3', image: require('@/assets/carousel/image3.png') },
  ];

  const onScroll = useCallback((event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  }, [scrollX]);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index || 0);
      }
    },
    []
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return <CarouselItem item={item} index={index} scrollX={scrollX} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: SPACING,
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      
      {showDots && (
        <View style={styles.pagination}>
          {carouselData.map((_, index) => (
            <PaginationDot 
              key={index} 
              index={index} 
              activeIndex={activeIndex} 
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT_ACTIVE + 40,
    marginVertical: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT_ACTIVE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: ITEM_WIDTH,
    borderRadius: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 6,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
  },
});