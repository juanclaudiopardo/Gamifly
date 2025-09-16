export interface HomeCardData {
  id: string;
  image: any;
  title: string;
  currentPrice: number;
  originalPrice: number;
}

export const homeCards: HomeCardData[] = [
  {
    id: '1',
    image: require('@/assets/home/card1.png'),
    title: 'Vita Serum',
    currentPrice: 35.0,
    originalPrice: 40.0,
  },
  {
    id: '2',
    image: require('@/assets/home/card2.png'),
    title: 'Hola Spritz',
    currentPrice: 67.5,
    originalPrice: 100.0,
  },
];