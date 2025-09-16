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

export const collectionsData: Product[] = [
  {
    id: '1',
    name: 'Moisturizing',
    image: require('@/assets/collections/product1.png'),
    currentPrice: 103,
    originalPrice: 117,
    details: 'An advanced moisturizing cream that provides deep and long-lasting hydration. Formulated with natural ingredients that nourish and protect the skin, leaving it soft and radiant. Ideal for all skin types.',
    howToUse: 'Apply a small amount to clean, dry skin. Gently massage in circular motions until completely absorbed. Use twice daily, morning and evening. For best results, apply after toner.',
    ingredients: 'Aqua, Glycerin, Dimethicone, Hyaluronic Acid, Ceramides, Vitamin E, Aloe Vera Extract, Shea Butter, Jojoba Oil, Panthenol, Allantoin, Sodium Hyaluronate, Tocopherol.'
  },
  {
    id: '2',
    name: 'Deep Breath',
    image: require('@/assets/collections/product2.png'),
    currentPrice: 79,
    originalPrice: 81,
    details: 'A revitalizing treatment that helps oxygenate and energize the skin. With a lightweight, fast-absorbing formula, this product improves skin texture and gives it a fresh, healthy appearance.',
    howToUse: 'Apply evenly to clean face, avoiding the eye area. Leave on for 10-15 minutes, then gently massage. Use 2-3 times per week. No rinsing required.',
    ingredients: 'Aqua, Niacinamide, Zinc PCA, Salicylic Acid, Tea Tree Oil, Green Tea Extract, Witch Hazel, Chamomile Extract, Glycolic Acid, Lactic Acid, Vitamin C, Peptides.'
  },
];
