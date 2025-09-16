export interface Product {
  id: string;
  name: string;
  image: any;
  currentPrice: number;
  originalPrice: number;
}

export const collectionsData: Product[] = [
  {
    id: '1',
    name: 'Moisturizing',
    image: require('@/assets/collections/product1.png'),
    currentPrice: 103,
    originalPrice: 117,
  },
  {
    id: '2',
    name: 'Deep Breath',
    image: require('@/assets/collections/product2.png'),
    currentPrice: 79,
    originalPrice: 81,
  },
];
