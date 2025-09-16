import { Button } from '@/components/ui';
import { Image } from 'expo-image';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
const ITEM_HEIGHT_INACTIVE = ITEM_WIDTH * 0.62; // Aumentado de 0.55 a 0.62
const SPACING = (screenWidth - ITEM_WIDTH) / 2;

// Infinite carousel constants
const MULTIPLIER = 5; // Number of times to repeat the original array
const RESET_THRESHOLD = 2; // How many items from edge to trigger reset

interface CarouselItemProps {
  item: {
    id: string;
    image: any;
    originalIndex: number;
  };
  index: number;
  scrollX: SharedValue<number>;
  activeIndex: number;
  onBuyPress?: (itemId: string) => void;
}

const CarouselItem = ({
  item,
  index,
  scrollX,
  activeIndex,
  onBuyPress,
}: CarouselItemProps) => {
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

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    // Compare with original index since activeIndex is now the original index
    const isActive = item.originalIndex === activeIndex;
    return {
      opacity: withTiming(isActive ? 1 : 0, { duration: 300 }),
      transform: [
        {
          scale: withTiming(isActive ? 1 : 0.8, { duration: 300 }),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, containerAnimatedStyle]}>
      <AnimatedImage
        source={item.image}
        style={[styles.image, imageAnimatedStyle]}
        contentFit='cover'
      />
      {onBuyPress && (
        <Animated.View
          style={[styles.itemButtonContainer, buttonAnimatedStyle]}
        >
          <Button
            title='Buy now'
            onPress={() => onBuyPress(item.id)}
            style={styles.itemBuyButton}
          />
        </Animated.View>
      )}
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
      backgroundColor: withTiming(isActive ? '#000' : '#D1D5DB', {
        duration: 200,
      }),
    };
  });

  return <Animated.View style={[styles.paginationDot, dotAnimatedStyle]} />;
};

interface CarouselProps {
  showDots?: boolean;
  onBuyPress?: (itemId: string) => void;
}

export const Carousel = ({ showDots = true, onBuyPress }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);
  const currentInfiniteIndex = useRef(0);

  // Original data
  const originalData = useMemo(
    () => [
      { id: '1', image: require('@/assets/carousel/image.png') },
      { id: '2', image: require('@/assets/carousel/image2.png') },
      { id: '3', image: require('@/assets/carousel/image3.png') },
    ],
    []
  );

  // Create infinite data by repeating original data
  const infiniteData = useMemo(() => {
    const data: {
      id: string;
      image: any;
      originalIndex: number;
    }[] = [];
    for (let i = 0; i < MULTIPLIER; i++) {
      originalData.forEach((item, index) => {
        data.push({
          ...item,
          id: `${item.id}-${i}`, // Unique id for each repetition
          originalIndex: index, // Keep track of original position
        });
      });
    }
    return data;
  }, [originalData]);

  // Calculate initial scroll position (middle of infinite data)
  const initialScrollIndex = Math.floor(MULTIPLIER / 2) * originalData.length;

  // Handle infinite scroll reset
  useEffect(() => {
    const resetPosition = () => {
      const currentIndex = currentInfiniteIndex.current;
      const totalItems = infiniteData.length;
      const originalLength = originalData.length;

      // Check if we're near the beginning or end of the infinite array
      if (currentIndex <= RESET_THRESHOLD) {
        // Near beginning, jump to equivalent position in middle section
        const targetIndex =
          currentIndex + Math.floor(MULTIPLIER / 2) * originalLength;
        const targetOffset = targetIndex * ITEM_WIDTH;

        flatListRef.current?.scrollToOffset({
          offset: targetOffset,
          animated: false,
        });
      } else if (currentIndex >= totalItems - RESET_THRESHOLD - 1) {
        // Near end, jump to equivalent position in middle section
        const targetIndex =
          currentIndex - Math.floor(MULTIPLIER / 2) * originalLength;
        const targetOffset = targetIndex * ITEM_WIDTH;

        flatListRef.current?.scrollToOffset({
          offset: targetOffset,
          animated: false,
        });
      }
    };

    // Small delay to ensure scroll has finished
    const timer = setTimeout(resetPosition, 100);
    return () => clearTimeout(timer);
  }, [activeIndex, infiniteData.length, originalData.length]);

  const onScroll = useCallback(
    (event: any) => {
      scrollX.value = event.nativeEvent.contentOffset.x;
    },
    [scrollX]
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const currentIndex = viewableItems[0].index || 0;
        // Store the real infinite array index
        currentInfiniteIndex.current = currentIndex;
        // Convert infinite array index to original array index
        const originalIndex = currentIndex % originalData.length;
        setActiveIndex(originalIndex);
      }
    },
    [originalData.length]
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <CarouselItem
        item={item}
        index={index}
        scrollX={scrollX}
        activeIndex={activeIndex}
        onBuyPress={onBuyPress}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={infiniteData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_WIDTH}
        decelerationRate='fast'
        initialScrollIndex={initialScrollIndex}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
          paddingBottom: 60,
        }}
        style={{
          overflow: 'visible',
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {showDots && (
        <View style={styles.pagination}>
          {originalData.map((_, index) => (
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
    marginVertical: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT_ACTIVE,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  image: {
    width: ITEM_WIDTH,
    borderRadius: 16,
    zIndex: 2,
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
  itemButtonContainer: {
    position: 'absolute',
    bottom: -45,
    alignItems: 'center',
    width: '100%',
    zIndex: 1,
  },
  itemBuyButton: {
    borderRadius: 14,
    width: '70%',
  },
});
