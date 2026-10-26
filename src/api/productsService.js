import { axiosClient, resolveImageUrl } from './axiosClient';
import { getProducts, getProductById, getCategories, normalizeProduct } from './products.api';

/**
 * Fallback Categories Definition
 */
export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'الكل', subtitle: 'كافة دهانات ومواد بتروكيما', count: 0 },
  { id: 'acrylic', label: 'أكريليك', subtitle: 'دهانات داخلي / خارجي', count: 3 },
  { id: 'plastic', label: 'بلاستيك', subtitle: 'مط', count: 3 },
  { id: 'sealer', label: 'سيلر وورنيش', subtitle: 'اكيريلك مائي', count: 3 },
  { id: 'putty', label: 'معجون', subtitle: 'معجون داخلي / خارجي', count: 2 },
  { id: 'primer', label: 'برايمر', subtitle: 'مقاومة للعوامل الجوية', count: 1 },
  { id: 'lacquer', label: 'لاكيه', subtitle: 'لامع ونصف لامع وميتالك', count: 2 },
];

/**
 * Mock Product Database mapped to high-definition assets
 */
const MOCK_PRODUCTS_DATABASE = {
  acrylic: [
    {
      id: 'acrylic-1',
      title: 'سوبر كيموستار 25000',
      category: 'acrylic',
      categoryLabel: 'أكريليك',
      subCategory: 'دهانات داخلي / خارجي',
      image: '/media/products/WhatsApp_Image_2026-10-18_at_22.05.58__1_-removebg-preview 1.png',
      badge: 'الأعلى جودة',
      description: 'دهان أكريليكي فاخر عالي التغطية مقاوم للعوامل الجوية والرطوبة، يمنح الجدران مظهراً مخملياً يدوم طويلاً.',
      features: ['تغطية فائقة', 'مقاوم للبقع والغسيل', 'ألوان متألقة وثابتة', 'صديق للبيئة'],
      volume: '15 لتر / 4 لتر',
    },
    {
      id: 'acrylic-2',
      title: 'كيموستار 20000',
      category: 'acrylic',
      categoryLabel: 'أكريليك',
      subCategory: 'دهانات داخلي / خارجي',
      image: '/media/products/WhatsApp_Image_2026-10-18_at_22.05.58__2_-removebg-preview 1.png',
      badge: 'الأكثر مبيعاً',
      description: 'دهان أكريليك حريري فائق المرونة والتحمل، مصمم خصيصاً للواجهات والأسطح المعرضة لظروف مناخية صعبة.',
      features: ['حماية طويلة الأمد', 'سهولة التطبيق', 'مقاومة للأشعة فوق البنفسجية', 'سريع الجفاف'],
      volume: '15 لتر / 4 لتر',
    },
  ],
  plastic: [
    {
      id: 'plastic-1',
      title: 'بلاستيك بلس 7070',
      category: 'plastic',
      categoryLabel: 'بلاستيك',
      subCategory: 'مط',
      image: '/media/products/WhatsApp_Image_2026-10-18_at_22.05.58__3_-removebg-preview (1) 1.png',
      badge: 'جودة فائقة',
      description: 'دهان بلاستيك مطفي ممتاز يتميز ببياض شاهق وتغطية قوية تخفي عيوب الحوائط بكل كفاءة.',
      features: ['ملمس مطفي ناعم', 'سهولة التنظيف', 'التصاق ممتاز بالخرسانة', 'خالٍ من المذيبات الضارة'],
      volume: '14 لتر',
    },
  ],
};

/**
 * Fetch products by category ID from the live server
 * @param {string} categoryId Category key or ID
 * @returns {Promise<Array>} List of products
 */
export async function fetchProductsByCategory(categoryId = 'all') {
  try {
    const isAll = !categoryId || categoryId === 'all';
    
    // Check if categoryId is a 24-character MongoDB ObjectId
    const isMongoId = typeof categoryId === 'string' && /^[0-9a-fA-F]{24}$/.test(categoryId);

    let params = {};
    if (!isAll) {
      params = { category: categoryId };
    }

    const serverProducts = await getProducts(params);

    if (Array.isArray(serverProducts) && serverProducts.length > 0) {
      if (isAll) return serverProducts;

      // Filter by category if categoryId wasn't a direct MongoDB ID
      if (!isMongoId) {
        const filtered = serverProducts.filter((p) => {
          const cat = String(p.category || '').toLowerCase();
          const catLabel = String(p.categoryLabel || '').toLowerCase();
          const target = String(categoryId).toLowerCase();
          return cat.includes(target) || catLabel.includes(target);
        });
        if (filtered.length > 0) return filtered;
      }

      return serverProducts;
    }
  } catch (err) {
    console.warn('[Products Service] Live query failed, checking fallback cache:', err.message);
  }

  // Fallback cache if server returns 0 or offline
  const key = String(categoryId).toLowerCase();
  const fallback = MOCK_PRODUCTS_DATABASE[key] || MOCK_PRODUCTS_DATABASE.acrylic;
  return fallback.map(normalizeProduct);
}

/**
 * Fetch detailed product info by ID from the live server
 * @param {string|number} productId
 * @returns {Promise<Object>}
 */
export async function fetchProductDetails(productId) {
  try {
    const product = await getProductById(productId);
    if (product) return product;
  } catch (err) {
    console.warn(`[Products Service] fetchProductDetails error for ${productId}:`, err.message);
  }

  // Fallback mock details
  return normalizeProduct({
    id: productId,
    name: 'دهان كيما ستار عالي الجودة',
    description: 'دهان بوليمري فائق الحماية والمقاومة للرطوبة، يمنح الجدران مظهراً أنيقاً يدوم طويلاً.',
    image: '/media/products/WhatsApp_Image_2026-10-18_at_22.05.58__1_-removebg-preview 1.png',
  });
}

export { getCategories };

export default {
  PRODUCT_CATEGORIES,
  getCategories,
  fetchProductsByCategory,
  fetchProductDetails,
};
