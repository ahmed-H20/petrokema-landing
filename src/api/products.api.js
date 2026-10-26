import axiosClient, { resolveImageUrl } from './axiosClient';
import { ASSETS } from '../utils/constants';

/**
 * Mock Fallback Products Database (Matches Petrochem Paints catalogue)
 */
export const MOCK_PRODUCTS = [
  {
    id: 'acrylic-paint',
    _id: 'acrylic-paint',
    title: 'سوبر كيموستار 25000',
    name: 'سوبر كيموستار 25000',
    subtitle: 'دهانات داخلي وخارجي',
    category: 'exterior',
    tag: 'مقاوم للعوامل الجوية',
    description: 'دهان أكريليكي فائق الجودة ذو أساس مائي، يتميز بقوة الالتصاق ومقاومة العوامل الجوية والبهتان.',
    image: '/media/products/WhatsApp_Image_2026-10-18_at_22.05.58__1_-removebg-preview 1.png',
    price: 680,
    rating: 4.9,
    features: ['مقاوم للأشعة فوق البنفسجية', 'قابل للغسيل الفائق', 'تغطية استثنائية'],
    isFeatured: true,
  },
  {
    id: 'plastic-matte',
    _id: 'plastic-matte',
    title: 'بلاستيك بلس 7070',
    name: 'بلاستيك بلس 7070',
    subtitle: 'مط',
    category: 'interior',
    tag: 'مظهر ناعم فاخر',
    description: 'دهان بلاستيك مائي مطفي ناعم الملمس، يمنح الجدران لمسة مخملية هادئة وفخامة لا تضاهى.',
    image: '/media/products/WhatsApp_Image_2026-10-18_at_22.05.58__3_-removebg-preview (1) 1.png',
    price: 520,
    rating: 4.8,
    features: ['بدون رائحة نفاذة', 'صديق للبيئة', 'إخفاء تام لعيوب الجدار'],
    isFeatured: true,
  },
  {
    id: 'sealer-varnish',
    _id: 'sealer-varnish',
    title: 'سيلر مقاوم 21000',
    name: 'سيلر مقاوم 21000',
    subtitle: 'للجودة عالي',
    category: 'wood',
    tag: 'حماية ولمعان',
    description: 'ورنيش وسيلر مخصص للأخشاب والأسطح الدقيقة، يعزل الرطوبة ويبرز جمال العروق الخشبية الطبيعية.',
    image: '/media/products/WhatsApp_Image_2026-10-18_at_22.06.00-removebg-preview 1.png',
    price: 450,
    rating: 4.9,
    features: ['عزل تام للرطوبة', 'حماية ضد الخدش', 'لمعان بلوري دائم'],
    isFeatured: true,
  },
  {
    id: 'wall-putty',
    _id: 'wall-putty',
    title: 'بترو 100 معجون أساس',
    name: 'بترو 100 معجون أساس',
    subtitle: 'معجون داخلي / خارجي',
    category: 'insulation',
    tag: 'تجهيز وتنعيم',
    description: 'معجون فائق النعومة لتسوية الجدران وسد المسامات والتشققات وتجهيز الأسطح قبل أعمال الدهان النهائية.',
    image: '/media/products/WhatsApp_Image_2026-10-19_at_18.41.29__1_-removebg-preview 1.png',
    price: 290,
    rating: 4.7,
    features: ['سهولة الصنفرة', 'قوة ملء عالية', 'ثبات فائق على الخرسانة'],
    isFeatured: true,
  },
];

/**
 * Normalize single raw product from server
 */
export const normalizeProduct = (prod) => {
  if (!prod) return null;
  const prodId = prod._id || prod.id;
  const prodTitle = prod.name || prod.title || 'دهان بتروكيما';

  // Normalize packages into sizes
  const sizes = Array.isArray(prod.packages) && prod.packages.length > 0
    ? prod.packages.map((pkg, idx) => ({
        id: idx + 1,
        name: `${pkg.unitName} ${pkg.weight ? `(${pkg.weight})` : ''}`.trim(),
        subText: pkg.note || (pkg.discountPercent > 0 ? `خصم ${pkg.discountPercent}%` : 'عبوة أصلية معتمدة'),
        price: (Number(pkg.price) || 0).toLocaleString('ar-EG'),
        rawPrice: Number(pkg.price) || 0,
        currency: 'ج.م',
      }))
    : [
        {
          id: 1,
          name: 'بستلة 14 لتر',
          subText: 'الحجم الأكبر للمشاريع',
          price: (Number(prod.price?.bestela || 450)).toLocaleString('ar-EG'),
          rawPrice: Number(prod.price?.bestela || 450),
          currency: 'ج.م',
        },
        {
          id: 2,
          name: 'جالون 3.5 لتر',
          subText: 'للمساحات المتوسطة',
          price: (Number(prod.price?.galon || 180)).toLocaleString('ar-EG'),
          rawPrice: Number(prod.price?.galon || 180),
          currency: 'ج.م',
        },
      ];

  // Normalize colors
  const colors = Array.isArray(prod.colors) && prod.colors.length > 0
    ? prod.colors.map((c, idx) => ({
        id: idx + 1,
        name: c.name,
        code: c.code || '',
        hex: c.hex || '#FFFFFF',
        border: '#cbd5e1',
        price: c.price || 0,
      }))
    : [
        { id: 1, name: 'أبيض ناصع', hex: '#FAF9F6', border: '#E8E6DF' },
        { id: 2, name: 'رملي دافئ', hex: '#F0DC9D', border: '#DFC987' },
        { id: 3, name: 'رمادي مخملي', hex: '#D2D3D5', border: '#BFC1C5' },
      ];

  // Images gallery
  const mainImg = resolveImageUrl(prod.image);
  let gallery = [];
  if (Array.isArray(prod.images) && prod.images.length > 0) {
    gallery = prod.images.map((img, i) => ({
      id: `img-${i}`,
      thumb: resolveImageUrl(img),
      full: resolveImageUrl(img),
      alt: `${prodTitle} - صورة ${i + 1}`,
    }));
  }
  if (gallery.length === 0) {
    gallery = [
      {
        id: 'main-can',
        thumb: mainImg,
        full: mainImg,
        alt: prodTitle,
      },
    ];
  }

  const features = Array.isArray(prod.fetures)
    ? prod.fetures.map((f) => (typeof f === 'object' ? f.name : f)).filter(Boolean)
    : Array.isArray(prod.features)
    ? prod.features
    : ['تغطية فائقة', 'مقاوم للعوامل الجوية', 'ألوان تدوم طويلاً', 'صديق للبيئة'];

  return {
    id: String(prodId),
    _id: String(prodId),
    title: prodTitle,
    name: prodTitle,
    subTitleEn: prod.code || '',
    fullTitle: prodTitle,
    subtitle: prod.category?.name || 'دهانات معمارية فاخرة',
    category: prod.category?._id || prod.category?.code || prod.category || 'all',
    categoryLabel: prod.category?.name || 'دهانات',
    tag: prod.statusBadge || 'مطابق للمواصفات',
    badge: prod.statusBadge || 'مطابق للمواصفات',
    description:
      prod.description ||
      'دهان فاخر عالي التغطية ومقاوم للعوامل الجوية والرطوبة، يمنح الجدران مظهراً أنيقاً يدوم طويلاً.',
    image: mainImg,
    images: gallery,
    sizes,
    colors,
    features,
    fetures: features,
    price: sizes[0]?.rawPrice || prod.price?.bestela || prod.price?.galon || 0,
    rating: 4.9,
    isFeatured: Boolean(prod.isFeatured || prod.isBestSeller),
    giftTitle: prod.giftTitle || prod.gift?.name || '',
    giftProduct: prod.giftProduct || null,
    tdsLink: prod.tdsLink || '#',
    tdsText: 'تحميل النشرة الفنية (TDS - PDF)',
    consultation: {
      text: 'استشارة هندسية سريعة لحساب الكميات ومواصفات السطح',
      hotline: '01023452349',
    },
  };
};

/**
 * Fetch all categories live from backend
 * @returns {Promise<Array>}
 */
export const getCategories = async () => {
  try {
    const res = await axiosClient.get('/categories');
    const list = Array.isArray(res) ? res : (res?.data || []);
    if (Array.isArray(list) && list.length > 0) {
      return list.map((c) => ({
        id: c._id,
        _id: c._id,
        code: c.code || c._id,
        label: c.name,
        name: c.name,
        nameEn: c.nameEn || '',
        subtitle: c.description || (c.nameEn ? c.nameEn : ''),
        count: c.productsCount || 0,
      }));
    }
  } catch (error) {
    console.warn('[Categories API] Backend categories unavailable, using defaults:', error.message);
  }

  return [
    { id: 'acrylic', label: 'أكريليك', subtitle: 'دهانات داخلي / خارجي', count: 3 },
    { id: 'plastic', label: 'بلاستيك', subtitle: 'مط', count: 3 },
    { id: 'sealer', label: 'سيلر وورنيش', subtitle: 'اكيريلك مائي', count: 3 },
    { id: 'putty', label: 'معجون', subtitle: 'معجون داخلي / خارجي', count: 2 },
    { id: 'primer', label: 'برايمر', subtitle: 'مقاومة للعوامل الجوية', count: 1 },
    { id: 'lacquer', label: 'لاكيه', subtitle: 'لامع ونصف لامع وميتالك', count: 2 },
  ];
};

/**
 * Fetch all products with optional filtering by category or query
 * @param {Object} params
 * @param {string} [params.category]
 * @param {string} [params.search]
 * @returns {Promise<Array>}
 */
export const getProducts = async (params = {}) => {
  try {
    const queryParams = {};
    if (params.category && params.category !== 'all') {
      queryParams.category = params.category;
    }
    if (params.search) {
      queryParams.search = params.search;
    }

    const res = await axiosClient.get('/products', { params: queryParams });
    const rawList = Array.isArray(res) ? res : (res?.data || []);

    if (Array.isArray(rawList) && rawList.length > 0) {
      return rawList.map(normalizeProduct);
    }

    // If query returned 0 products from server
    if (params.category && params.category !== 'all') {
      return [];
    }
  } catch (error) {
    console.warn('[Products API] Server error, falling back to local catalog:', error.message);
  }

  // Fallback to local catalog if server unreachable
  let results = [...MOCK_PRODUCTS].map(normalizeProduct);
  if (params.category && params.category !== 'all') {
    results = results.filter((p) => p.category === params.category);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }
  return results;
};

/**
 * Fetch single product details by ID from server
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export const getProductById = async (id) => {
  try {
    const res = await axiosClient.get(`/products/${id}`);
    const raw = res?.data || res;
    if (raw && (raw._id || raw.name)) {
      return normalizeProduct(raw);
    }
  } catch (error) {
    console.warn(`[Products API] Product ${id} not found on server, searching mock database:`, error.message);
  }

  const found = MOCK_PRODUCTS.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
  if (found) return normalizeProduct(found);
  
  // Sane default fallback product
  return normalizeProduct(MOCK_PRODUCTS[0]);
};

/**
 * Fetch featured / best seller promotional product from server
 * @returns {Promise<Object>}
 */
export const getFeaturedPromo = async () => {
  try {
    const res = await axiosClient.get('/products/featured');
    const raw = res?.data || res;
    if (raw && (raw._id || raw.name)) {
      return {
        id: String(raw._id),
        badge: raw.statusBadge || 'الأكثر طلباً',
        title: raw.name,
        subtitle: raw.description ? `${raw.description.slice(0, 65)}...` : 'شامبين .. ميتالك',
        ctaText: 'اكتشف المنتج',
        ctaLink: `/products/${raw._id}`,
        bannerImage: resolveImageUrl(raw.image),
        giftTitle: raw.giftTitle || raw.gift?.name || '',
      };
    }
  } catch (error) {
    console.warn('[Featured Promo API] Falling back:', error.message);
  }

  return {
    badge: 'منتج جديد',
    title: 'دهانات لاكيه سوبر ستار',
    subtitle: 'شامبين .. ميتالك',
    ctaText: 'اكتشف المنتج',
    ctaLink: '/products',
    bannerImage: ASSETS.promoBanner,
    giftTitle: 'معجون اكريلك هدية',
  };
};

export default {
  getCategories,
  getProducts,
  getProductById,
  getFeaturedPromo,
  normalizeProduct,
  MOCK_PRODUCTS,
};
