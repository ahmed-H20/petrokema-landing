import axiosClient, { resolveImageUrl } from './axiosClient';
import { ASSETS } from '../utils/constants';

/**
 * 15 Products ordered strictly according to application stages (المراحل):
 * 1. سيلر مقاوم ٣٣٣
 * 2. معجون بترو ١٠٠
 * 3. معجون اكريليك
 * 4. بستله ايكو كيم
 * 5. كيما برو ٥٠٥٠
 * 6. بلس ٧٠٠
 * 7. ستار ١٥٠٠٠
 * 8. ستار ٢٠٠٠٠
 * 9. ورنيش مائي كلر
 * 10. كيما كوت مط ٥٠٠ كل الاوزان
 * 11. لاكيه سوبر ستار كل الاوزان
 * 12. لاكيه شامبين
 * 13. لاكيه ميتال
 * 14. بريمر كل الاوزان
 * 15. بترو فورس
 * 
 * Note: Prices are intentionally omitted across all products per company policy.
 */
export const MOCK_PRODUCTS = [
  {
    id: 'sealer-333',
    _id: 'sealer-333',
    title: 'سيلر مقاوم 333',
    name: 'سيلر مقاوم 333',
    subtitle: 'عازل مائي ومقاوم للأملاح والنشع',
    category: 'foundation',
    categoryLabel: 'التأسيس',
    tag: 'المرحلة 01 - التأسيس',
    description: 'سيلر مائي فائق الجودة مصنع من بوليمرات أكريليكية متطورة، يعزل الرطوبة والأملاح وسد المسامات الخرسانية لضمان أقصى التصاق للدهانات.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-18_at_22.06.00-removebg-preview 1.png',
    rating: 4.9,
    features: ['عزل تام للرطوبة والأملاح', 'اختراق عميق للمسامات الخرسانية', 'قوة التصاق عالية', 'توفير في استهلاك الدهان اللاحق'],
    isFeatured: true,
  },
  {
    id: 'putty-petro-100',
    _id: 'putty-petro-100',
    title: 'معجون بترو 100',
    name: 'معجون بترو 100',
    subtitle: 'معجون أساس داخلي / خارجي فائق النعومة',
    category: 'putty',
    categoryLabel: 'المعجون',
    tag: 'المرحلة 02 - المعجون',
    description: 'معجون معماري عالي الجودة جاهز للاستخدام، يتميز بقوة ملء استثنائية وسهولة فائقة في الفرد والصنفرة لتسوية عيوب الجدران والأسطح.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-19_at_18.41.29__1_-removebg-preview 1.png',
    rating: 4.8,
    features: ['سهولة الصنفرة دون تطاير غبار', 'قوة ملء عالية للشروخ', 'سطح حريري ناعم', 'مقاوم للتشققات'],
    isFeatured: true,
  },
  {
    id: 'acrylic-putty',
    _id: 'acrylic-putty',
    title: 'معجون اكريليك',
    name: 'معجون اكريليك',
    subtitle: 'معجون بوليمري مرن للواجهات والمساحات الدقيقة',
    category: 'putty',
    categoryLabel: 'المعجون',
    tag: 'المرحلة 02 - المعجون',
    description: 'معجون أكريليكي مطاطي فائق المرونة، مصمم خصيصاً لمعالجة التشققات ومقاومة الرطوبة والعوامل الجوية الخارجية والداخلية.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-19_at_18.41.29-removebg-preview 1.png',
    rating: 4.9,
    features: ['مرونة عالية تمنع عودة الشروخ', 'مقاومة تامة للرطوبة والحرارة', 'التصاق ممتاز بالخرسانة والمحارة', 'سهل التطبيق والتسوية'],
    isFeatured: false,
  },
  {
    id: 'eco-kem-can',
    _id: 'eco-kem-can',
    title: 'بستله ايكو كيم',
    name: 'بستله ايكو كيم',
    subtitle: 'دهان بلاستيك اقتصادي عالي التغطية والبياض',
    category: 'paints',
    categoryLabel: 'الدهانات',
    tag: 'المرحلة 03 - الدهانات',
    description: 'دهان بلاستيك مائي صديق للبيئة، يتميز ببياض ناصع ومعدل انتشار واسع يوفر أعلى كفاءة اقتصادية وتغطية ممتازة للمشاريع الكبيرة.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-18_at_22.05.57__1_-removebg-preview 1.png',
    rating: 4.7,
    features: ['بياض ناصع ومشرق', 'تغطية واسعة للعبوة', 'اقتصادي وعالي التوفير', 'خالٍ من الروائح النفاذة'],
    isFeatured: false,
  },
  {
    id: 'kima-pro-5050',
    _id: 'kima-pro-5050',
    title: 'كيما برو 5050',
    name: 'كيما برو 5050',
    subtitle: 'دهان أكريليكي نصف لامع فائق التحمل',
    category: 'paints',
    categoryLabel: 'الدهانات',
    tag: 'المرحلة 03 - الدهانات',
    description: 'دهان احترافي مصمم للمشاريع الراقية، يجمع بين قوة التحمل الميكانيكي وسهولة التنظيف والمظهر المخملي الفاخر مع حماية دائمة.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-18_at_22.05.57-removebg-preview 1.png',
    rating: 4.9,
    features: ['مقاومة عالية للغسيل والمنظفات', 'ملمس ناعم نصف لامع', 'ثبات لوني يدوم لسنوات', 'صديق للبيئة'],
    isFeatured: true,
  },
  {
    id: 'plus-700',
    _id: 'plus-700',
    title: 'بلس 700',
    name: 'بلس 700',
    subtitle: 'دهان بلاستيك مط فاخر عالي التغطية',
    category: 'paints',
    categoryLabel: 'الدهانات',
    tag: 'المرحلة 03 - الدهانات',
    description: 'دهان بلاستيك مطفي ناعم فائق البياض، يخفي عيوب الحوائط بكل كفاءة ويمنح الجدران دفئاً وأناقة هادئة متناهية الفخامة.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-18_at_22.05.58__3_-removebg-preview (1) 1.png',
    rating: 4.8,
    features: ['إخفاء تام لعيوب الحائط', 'مطفي بدون أي لمعة عاكسة', 'سهل الصيانة والتنظيف', 'بياض بلوري متجانس'],
    isFeatured: true,
  },
  {
    id: 'star-15000',
    _id: 'star-15000',
    title: 'ستار 15000',
    name: 'ستار 15000',
    subtitle: 'دهان أكريليك مطور داخلي وخارجي',
    category: 'paints',
    categoryLabel: 'الدهانات',
    tag: 'المرحلة 03 - الدهانات',
    description: 'دهان أكريليكي متطور ذو متانة عالية ومقاومة للظروف المناخية الصعبة، مصمم للجدران الداخلية والخارجية على السواء.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-18_at_22.05.59-removebg-preview 1.png',
    rating: 4.9,
    features: ['مقاوم للعوامل الجوية والحرارة', 'ألوان متألقة لا تبهت', 'حماية قوية ضد الرطوبة', 'تغطية ممتازة'],
    isFeatured: false,
  },
  {
    id: 'star-20000',
    _id: 'star-20000',
    title: 'ستار 20000',
    name: 'ستار 20000',
    subtitle: 'دهان أكريليكي فائق الجودة والنعومة الحريرية',
    category: 'paints',
    categoryLabel: 'الدهانات',
    tag: 'المرحلة 03 - الدهانات',
    description: 'قمة دهانات الأكريليك بملمس حريري ومقاومة جبارة للاحتكاك والرطوبة، يمنح الجدران عمقاً وفخامة تليق بأرقى التصاميم المعمارية.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-18_at_22.05.58__2_-removebg-preview 1.png',
    rating: 5.0,
    features: ['مظهر حريري استثنائي', 'قابل للغسيل المتكرر بالمنظفات', 'مقاومة لأشعة الشمس فوق البنفسجية UV', 'تغطية فائقة للعبوة'],
    isFeatured: true,
  },
  {
    id: 'water-varnish-color',
    _id: 'water-varnish-color',
    title: 'ورنيش مائي كلر',
    name: 'ورنيش مائي كلر',
    subtitle: 'ورنيش حماية مائي شفاف وملون للأسطح والأخشاب',
    category: 'finishing',
    categoryLabel: 'التشطيب',
    tag: 'المرحلة 04 - التشطيب',
    description: 'ورنيش مائي بلوري صديق للبيئة لحماية الأخشاب والحوائط والديكورات، يضفي طبقة عزل قوية ولامعة تبرز تفاصيل السطح الطبيعي.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-18_at_22.06.00-removebg-preview 1.png',
    rating: 4.9,
    features: ['شفافية بلورية عالية', 'حماية ضد الخدش والماء', 'سريع الجفاف وبدون رائحة', 'مقاوم للاصفرار بمرور الوقت'],
    isFeatured: false,
  },
  {
    id: 'kima-coat-matte-500',
    _id: 'kima-coat-matte-500',
    title: 'كيما كوت مط 500 كل الاوزان',
    name: 'كيما كوت مط 500 كل الاوزان',
    subtitle: 'دهان بطانة وتشطيب مطفي عالي البياض',
    category: 'finishing',
    categoryLabel: 'التشطيب',
    tag: 'المرحلة 04 - التشطيب',
    description: 'دهان مطفي متعدد الاستخدامات لكافة الأوزان، يتميز بقوة التصاق فائقة وقدرة عالية على تغطية المساحات الواسعة بكفاءة واقتصادية.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-19_at_00.34.28-removebg-preview 1.png',
    rating: 4.7,
    features: ['متوفر بكافة الأوزان والعبوات', 'بياض معتمد للمشاريع', 'تغطية سريعة وموفرة', 'مثالي لكافة أنواع المحارة'],
    isFeatured: false,
  },
  {
    id: 'lacquer-super-star',
    _id: 'lacquer-super-star',
    title: 'لاكيه سوبر ستار كل الاوزان',
    name: 'لاكيه سوبر ستار كل الاوزان',
    subtitle: 'طلاء سنتيتك فاخر لامع ونصف لامع للأخشاب والمعادن',
    category: 'finishing',
    categoryLabel: 'التشطيب',
    tag: 'المرحلة 04 - التشطيب',
    description: 'دهان لاكيه زيتي عالي الجودة يتميز بصلابة فائقة ولمعان زجاجي مذهل لحماية الأبواب والمطابخ والحديد من التآكل والعوامل الجوية.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-20_at_15.04.31-removebg-preview 1.png',
    rating: 4.9,
    features: ['متوفر بكافة الأوزان واللمعات', 'لمعان زجاجي يدوم طويلاً', 'حماية تامة ضد الصدأ والخدش', 'انسيابية عالية عند الدهان'],
    isFeatured: true,
  },
  {
    id: 'lacquer-champagne',
    _id: 'lacquer-champagne',
    title: 'لاكيه شامبين',
    name: 'لاكيه شامبين',
    subtitle: 'طلاء لاكيه ديكوري بدرجة الشامبين الملكية الفاخرة',
    category: 'finishing',
    categoryLabel: 'التشطيب',
    tag: 'المرحلة 04 - التشطيب',
    description: 'طلاء ديكوري متفرد يمنح المشغولات الخشبية والمعدنية والأبواب لون الشامبين الهادئ والمترف مع بريق مخملي جذاب يناسب أحدث التصاميم.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-20_at_15.04.58-removebg-preview 1.png',
    rating: 4.9,
    features: ['لون شامبين حصري فاخر', 'مقاوم لتغير اللون بالحرارة', 'سطح أملس فائق الأناقة', 'جودة سوبر ستار المعتمدة'],
    isFeatured: true,
  },
  {
    id: 'lacquer-metallic',
    _id: 'lacquer-metallic',
    title: 'لاكيه ميتال',
    name: 'لاكيه ميتال',
    subtitle: 'دهان ميتالك معدني براق للمسات الديكورية العصرية',
    category: 'finishing',
    categoryLabel: 'التشطيب',
    tag: 'المرحلة 04 - التشطيب',
    description: 'دهان ميتالك بتأثير معدني بلوري عالي الانعكاس، يضفي طابعاً مستقبلياً فخماً على الأثاث والديكورات والأبواب والمطابخ.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-20_at_15.06.01-removebg-preview 1.png',
    rating: 4.8,
    features: ['تأثير ميتالك معدني ساحر', 'مقاوم للرطوبة والاحتكاك', 'لمعان دائم لا يخفت', 'متانة ممتازة للأخشاب والمعادن'],
    isFeatured: false,
  },
  {
    id: 'primer-all-sizes',
    _id: 'primer-all-sizes',
    title: 'بريمر كل الاوزان',
    name: 'بريمر كل الاوزان',
    subtitle: 'برايمر تأسيس وحماية خرسانية لكافة الأوزان',
    category: 'foundation',
    categoryLabel: 'التأسيس',
    tag: 'المرحلة 01 - التأسيس',
    description: 'طبقة التأسيس الأولى لحماية الواجهات والمباني من الرطوبة والعوامل المناخية القاسية، متوفر بكافة العبوات والأوزان للمشاريع.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-19_at_00.35.57-removebg-preview 1.png',
    rating: 4.8,
    features: ['متوفر بجميع الأحجام والأوزان', 'حماية أولية قوية', 'مقاوم للقلويات والأملاح', 'يسهل تشغيل المعجون بكفاءة'],
    isFeatured: false,
  },
  {
    id: 'petro-force',
    _id: 'petro-force',
    title: 'بترو فورس',
    name: 'بترو فورس',
    subtitle: 'مادة حماية وعزل عالية القوة والمتانة',
    category: 'foundation',
    categoryLabel: 'التأسيس',
    tag: 'المرحلة 01 - التأسيس',
    description: 'مركب عزل وحماية متطور يتمتع بقوة تماسك خارقة، مصمم لحماية الأسطح المعرضة لظروف بيئية قاسية ومنع تغلغل الرطوبة ومياه الأمطار.',
    image: '/media/products/clean/WhatsApp_Image_2026-10-18_at_22.05.58__1_-removebg-preview 1.png',
    rating: 5.0,
    features: ['قوة تحمل ميكانيكية استثنائية', 'عزل مائي متفوق', 'مقاومة للأشعة فوق البنفسجية', 'حماية طويلة الأمد'],
    isFeatured: true,
  },
];

/**
 * Normalize single raw product from server or fallback database
 * (Prices are strictly removed across the normalization layer)
 */
export const normalizeProduct = (prod) => {
  if (!prod) return null;
  const prodId = prod._id || prod.id;
  const prodTitle = prod.name || prod.title || 'دهان بتروكيما';

  // Normalize packages into sizes without prices
  const sizes = Array.isArray(prod.packages) && prod.packages.length > 0
    ? prod.packages.map((pkg, idx) => ({
        id: idx + 1,
        name: `${pkg.unitName} ${pkg.weight ? `(${pkg.weight})` : ''}`.trim(),
        subText: pkg.note || 'عبوة أصلية معتمدة',
      }))
    : [
        {
          id: 1,
          name: 'بستلة 14 لتر',
          subText: 'الحجم الأكبر للمشاريع',
        },
        {
          id: 2,
          name: 'جالون 3.5 لتر',
          subText: 'للمساحات المتوسطة',
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
    subtitle: prod.subtitle || prod.category?.name || 'دهانات معمارية فاخرة',
    category: prod.category?._id || prod.category?.code || prod.category || 'all',
    categoryLabel: prod.categoryLabel || prod.category?.name || 'دهانات',
    tag: prod.tag || prod.statusBadge || 'مطابق للمواصفات',
    badge: prod.tag || prod.statusBadge || 'مطابق للمواصفات',
    description:
      prod.description ||
      'دهان فاخر عالي التغطية ومقاوم للعوامل الجوية والرطوبة، يمنح الجدران مظهراً أنيقاً يدوم طويلاً.',
    image: mainImg,
    images: gallery,
    sizes,
    colors,
    features,
    fetures: features,
    rating: prod.rating || 4.9,
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
 * Fetch all categories live from backend or defaults
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
    { id: 'all', label: 'الكل', subtitle: 'كافة دهانات ومواد بتروكيما (15 صنفاً مرتبة حسب المراحل)', count: MOCK_PRODUCTS.length },
    { id: 'foundation', label: 'التأسيس', subtitle: 'سيلر مقاوم 333، بريمر، بترو فورس', count: 3 },
    { id: 'putty', label: 'المعجون', subtitle: 'معجون بترو 100، معجون أكريليك', count: 2 },
    { id: 'paints', label: 'الدهانات', subtitle: 'بستله ايكو كيم، كيما برو 5050، بلس 700، ستار 15000، ستار 20000', count: 5 },
    { id: 'finishing', label: 'التشطيب', subtitle: 'ورنيش، كيما كوت مط 500، ولاكيه سوبر ستار وشامبين وميتال', count: 5 },
  ];
};

/**
 * Fetch all products with optional filtering by category or query
 * (Preserves exact stages ordering)
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

    if (params.category && params.category !== 'all') {
      // Continue to local filtered catalogue
    }
  } catch (error) {
    console.warn('[Products API] Server error, falling back to local catalog:', error.message);
  }

  // Fallback to local catalog preserving exact sequential order
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
 * Fetch single product details by ID from server or mock catalogue
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
    console.warn(`[Products API] getProductById error for ${id}:`, error.message);
  }

  const found = MOCK_PRODUCTS.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
  if (found) {
    return normalizeProduct(found);
  }

  return normalizeProduct(MOCK_PRODUCTS[0]);
};

/**
 * Get featured promo product for banner
 * @returns {Promise<Object>}
 */
export const getFeaturedPromo = async () => {
  return {
    title: 'دهانات لاكيه سوبر ستار',
    subtitle: 'شامبين .. ميتالك',
    badge: 'منتج جديد',
    giftTitle: 'معجون اكريلك هدية',
  };
};

export default {
  MOCK_PRODUCTS,
  getProducts,
  getProductById,
  getCategories,
  getFeaturedPromo,
  normalizeProduct,
};
