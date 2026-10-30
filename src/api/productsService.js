import { axiosClient, resolveImageUrl } from './axiosClient';
import { getProducts, getProductById, getCategories, normalizeProduct, MOCK_PRODUCTS } from './products.api';

/**
 * Fallback Categories Definition
 */
export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'الكل', subtitle: 'كافة دهانات ومواد بتروكيما (15 صنفاً مرتبة حسب المراحل)', count: 15 },
  { id: 'foundation', label: 'مرحلة التأسيس', subtitle: 'سيلر مقاوم 333', count: 1 },
  { id: 'putty', label: 'المعجون', subtitle: 'معجون بترو 100، معجون اكريليك بترو 500', count: 2 },
  { id: 'undercoat', label: 'البطانة', subtitle: 'بستله ايكو كيم، كيما برو 5050، بلس 700', count: 3 },
  { id: 'finishing', label: 'تشطيب', subtitle: 'ورنيش كلير 444، ستار 15000، ستار 20000', count: 3 },
  { id: 'lacquer', label: 'مراحل تأسيسي لاكيه', subtitle: 'كيما كوت 500، لاكيه سوبر ستار وشامبين وميتال', count: 4 },
  { id: 'insulation', label: 'مراحل عزل', subtitle: 'بريمر بريكس، بترو فورس', count: 2 },
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
  return getProducts({ category: categoryId });
}

/**
 * Fetch detailed product info by ID from the official catalogue
 * @param {string|number} productId
 * @returns {Promise<Object>}
 */
export async function fetchProductDetails(productId) {
  return getProductById(productId);
}

export { getCategories };

export default {
  PRODUCT_CATEGORIES,
  getCategories,
  fetchProductsByCategory,
  fetchProductDetails,
};
