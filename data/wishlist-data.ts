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
    image: require('@/assets/whishlist/whishlist2.png'),
    currentPrice: 89,
    originalPrice: 125,
    details:
      'A refreshing forest-inspired treatment enriched with deep green botanicals and natural extracts. This revitalizing cream harnesses the power of nature to deeply nourish and restore your skin, leaving it feeling fresh and rejuvenated like a walk through an ancient forest.',
    howToUse:
      'Apply generously to clean skin, massaging gently in upward circular motions. Use morning and evening for optimal results. Allow to absorb completely before applying makeup or sunscreen. For sensitive skin, start with once daily application.',
    ingredients:
      'Aqua, Green Tea Extract, Spirulina, Chlorophyll, Eucalyptus Oil, Pine Needle Extract, Bamboo Extract, Aloe Barbadensis, Hyaluronic Acid, Glycerin, Vitamin E, Rosemary Extract, Mint Oil, Peptides, Ceramides.',
  },
  {
    id: 'w2',
    name: 'Vita Serum',
    image: require('@/assets/whishlist/whislist1.png'),
    currentPrice: 156,
    originalPrice: 189,
    details:
      'An intensive brightening serum powered by galactomyces and vitamin C complex. This lightweight formula penetrates deep into the skin to reduce dark spots, even skin tone, and promote a luminous, radiant complexion. Perfect for achieving that coveted glass skin effect.',
    howToUse:
      'Apply 3-4 drops to clean face after toner. Gently pat into skin until fully absorbed. Use morning and evening. Always follow with SPF during daytime use. Can be layered under moisturizer for extra hydration.',
    ingredients:
      'Galactomyces Ferment Filtrate, Vitamin C (L-Ascorbic Acid), Niacinamide, Alpha Arbutin, Kojic Acid, Licorice Root Extract, Citrus Extract, Hyaluronic Acid, Glycerin, Panthenol, Vitamin E, Ferulic Acid.',
  },
  {
    id: 'w3',
    name: 'Hydra Boost',
    image: require('@/assets/whishlist/whishlist3.png'),
    currentPrice: 125,
    originalPrice: 149,
    details:
      'A powerful hydrating formula that delivers intense moisture to dry and dehydrated skin. Enriched with hyaluronic acid and marine collagen, this treatment plumps and smooths the skin while providing long-lasting hydration for a healthy, radiant glow.',
    howToUse:
      'Apply to clean face and neck in gentle upward motions. Use morning and evening after cleansing. Allow to absorb fully before applying additional products. Can be used under makeup as a hydrating primer.',
    ingredients:
      'Aqua, Hyaluronic Acid, Marine Collagen, Glycerin, Squalane, Ceramides, Peptides, Vitamin B5, Aloe Vera, Cucumber Extract, Rose Water, Sodium PCA, Allantoin.',
  },
  {
    id: 'w4',
    name: 'Glow Essence',
    image: require('@/assets/whishlist/whishlist4.png'),
    currentPrice: 198,
    originalPrice: 245,
    details:
      'A luminous essence that instantly brightens and revitalizes dull skin. This lightweight formula contains pearl extracts and vitamin C to enhance your natural radiance while providing deep hydration and skin texture improvement.',
    howToUse:
      'After cleansing and toning, apply 2-3 drops to face and neck. Gently pat into skin until absorbed. Use daily, morning and evening. Follow with serum and moisturizer for best results.',
    ingredients:
      'Pearl Extract, Vitamin C, Niacinamide, Arbutin, Licorice Extract, Glycerin, Hyaluronic Acid, Panthenol, Green Tea Extract, Chamomile, Vitamin E, Kojic Acid.',
  },
  {
    id: 'w5',
    name: 'Pure Cleanse',
    image: require('@/assets/whishlist/whishlist5.png'),
    currentPrice: 87,
    originalPrice: 108,
    details:
      'A gentle yet effective cleansing gel that removes makeup, dirt, and impurities without stripping the skin. Formulated with botanical extracts and mild surfactants to maintain the skin\'s natural moisture balance.',
    howToUse:
      'Apply to damp skin and gently massage in circular motions. Rinse thoroughly with lukewarm water. Use morning and evening as part of your daily skincare routine. Suitable for all skin types.',
    ingredients:
      'Aqua, Cocamidopropyl Betaine, Glycerin, Salicylic Acid, Tea Tree Oil, Chamomile Extract, Aloe Vera, Witch Hazel, Panthenol, Vitamin E, Citric Acid, Sodium Chloride.',
  },
  {
    id: 'w6',
    name: 'Night Repair',
    image: require('@/assets/whishlist/whishlist6.png'),
    currentPrice: 213,
    originalPrice: 267,
    details:
      'An intensive overnight treatment that works while you sleep to repair and regenerate skin cells. This rich formula contains retinol and peptides to reduce fine lines, improve skin texture, and promote cellular renewal.',
    howToUse:
      'Apply to clean face and neck in the evening only. Start with 2-3 times per week and gradually increase usage. Always use SPF during the day when using this product. Avoid eye area.',
    ingredients:
      'Retinol, Peptides, Hyaluronic Acid, Ceramides, Squalane, Vitamin E, Niacinamide, Bakuchiol, Rosehip Oil, Jojoba Oil, Shea Butter, Allantoin, Bisabolol.',
  },
];
