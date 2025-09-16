import { Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface ProductPriceProps {
  name: string;
  currentPrice: number;
}

export const ProductPrice = ({ name, currentPrice }: ProductPriceProps) => {
  return (
    <View style={styles.container}>
      <View style={{ gap: 4 }}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productNameDescription}>Hair Repairing Mask</Text>
      </View>
      <View style={{ gap: 4 }}>
        <Text style={styles.currentPrice}>${currentPrice}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Entypo name='star' size={13} color='#FF8103' />
          <Text style={{ fontSize: 12 }}>
            4/5
            <Text style={{ fontSize: 10, color: '#5D616E' }}>(500+Review)</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  productName: {
    fontSize: 22,
    fontWeight: '500',
  },
  productNameDescription: {
    fontSize: 12,
    color: '#656565',
  },

  currentPrice: {
    fontSize: 24,
    fontWeight: '500',
  },
});
