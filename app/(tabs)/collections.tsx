import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Collection() {
  return (
    <SafeAreaView style={{ paddingHorizontal: 20 }}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/collections/allProducts.png')}
          style={styles.image}
        />
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <Text style={styles.overlayText}>All Products</Text>
        </View>
      </View>
      <Text>Collection</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 123,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },
});
