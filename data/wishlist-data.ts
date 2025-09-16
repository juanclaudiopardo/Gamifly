export interface Product {
  id: string;
  name: string;
  image: any;
  currentPrice: number;
  originalPrice: number;
  details: string;
  howToUse: string;
  ingredients: string;
}

export const wishlistData: Product[] = [
  {
    id: 'w1',
    name: 'Forest Green',
    image: require('@/assets/whishlist/whishlist.png'),
    currentPrice: 89,
    originalPrice: 125,
    details: 'A refreshing forest-inspired treatment enriched with deep green botanicals and natural extracts. This revitalizing cream harnesses the power of nature to deeply nourish and restore your skin, leaving it feeling fresh and rejuvenated like a walk through an ancient forest.',
    howToUse: 'Apply generously to clean skin, massaging gently in upward circular motions. Use morning and evening for optimal results. Allow to absorb completely before applying makeup or sunscreen. For sensitive skin, start with once daily application.',
    ingredients: 'Aqua, Green Tea Extract, Spirulina, Chlorophyll, Eucalyptus Oil, Pine Needle Extract, Bamboo Extract, Aloe Barbadensis, Hyaluronic Acid, Glycerin, Vitamin E, Rosemary Extract, Mint Oil, Peptides, Ceramides.'
  },
  {
    id: 'w2',
    name: 'Vita Serum',
    image: require('@/assets/whishlist/whislist1.png'),
    currentPrice: 156,
    originalPrice: 189,
    details: 'An intensive brightening serum powered by galactomyces and vitamin C complex. This lightweight formula penetrates deep into the skin to reduce dark spots, even skin tone, and promote a luminous, radiant complexion. Perfect for achieving that coveted glass skin effect.',
    howToUse: 'Apply 3-4 drops to clean face after toner. Gently pat into skin until fully absorbed. Use morning and evening. Always follow with SPF during daytime use. Can be layered under moisturizer for extra hydration.',
    ingredients: 'Galactomyces Ferment Filtrate, Vitamin C (L-Ascorbic Acid), Niacinamide, Alpha Arbutin, Kojic Acid, Licorice Root Extract, Citrus Extract, Hyaluronic Acid, Glycerin, Panthenol, Vitamin E, Ferulic Acid.'
  }
];