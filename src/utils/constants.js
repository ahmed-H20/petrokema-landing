export const COMPANY_INFO = {
  name: 'مصنع بتروكيما للدهانات',
  nameEn: 'Petrochem Paints Factory',
  slogan: 'لكل لون... حكاية بيت',
  description:
    'بتروكيما هي واحدة من الشركات الرائدة في صناعة الدهانات والصناعات المتطورة في مصر، نلتزم بتقديم منتجات عالية الجودة تلبي احتياجات عملائنا من الأفراد والشركات، مع التركيز على الابتكار والاستدامة في كل ما نقدمه.',
  phone: '01023452349',
  whatsapp: '+201008654772',
  whatsappDisplay: '+20 100 8654772',
  landline: '01023452349',
  email: 'ptrokema@gmail.com',
  facebook: 'https://www.facebook.com/PetroKema?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/petro_kema_paints',
  instagramHandle: 'petro_kema_paints',
  address: 'طريق مصر اسماعيليه الصحراوي - مفارق ابوصوير',
};

export const SUPPORT_CONTACTS = [
  {
    name: 'مهندس أحمد هشام',
    role: 'الدعم الفني والاستفسار',
    phone: '01226810306',
    phoneDisplay: '01226810306',
    whatsapp: '201226810306',
  },
  {
    name: 'مهندس أحمد جريش',
    role: 'الدعم الفني والاستفسار',
    phone: '01018430679',
    phoneDisplay: '010 18430679',
    whatsapp: '201018430679',
  },
  {
    name: 'مهندس مصطفى ستيت',
    role: 'الدعم الفني والاستفسار',
    phone: '01501404069',
    phoneDisplay: '015 0140 4069',
    whatsapp: '201501404069',
  },
];

export const NAV_LINKS = [
  { label: 'الرئيسية', path: '/' },
  { label: 'منتجاتنا', path: '/products' },
  { label: 'من نحن', path: '/about' },
  { label: 'تواصل معنا', path: '/contact' },
];

export const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://www.facebook.com/PetroKema?mibextid=wwXIfr', icon: 'facebook' },
  { name: 'Instagram', url: 'https://www.instagram.com/petro_kema_paints', icon: 'instagram' },
  { name: 'Email', url: 'mailto:ptrokema@gmail.com', icon: 'mail' },
];

export const HERO_COLOR_PALETTES = [
  // ترتيب موحّد: المحايدات من الفاتح للغامق، ثم الألوان بحسب الدرجة (أحمر → برتقالي → أصفر → أخضر → أزرق → وردي)، وداخل كل درجة من الفاتح للغامق
  // الألوان ذات الخاصية baked صورها تحمل اللون جاهزاً فلا تُضاف عليها طبقة تلوين
  { id: 'classic-white', name: 'كلاسيك وايت', nameEn: 'Classic White', code: 'S 0500-N', hex: '#E6DDD4', bgClass: 'bg-[#E6DDD4]', img: '/media/images/hero/hero-wall-classic-white.webp', baked: true },
  { id: 'ivory', name: 'آيفوري', nameEn: 'Ivory', code: 'S 0505-Y10R', hex: '#EADCCE', bgClass: 'bg-[#EADCCE]', img: '/media/images/hero/hero-wall-ivory.webp', baked: true },
  { id: 'sky-light', name: 'سكاي لايت', nameEn: 'Sky Light', code: '1624', hex: '#E2D9D0', bgClass: 'bg-[#E2D9D0]', img: '/media/images/hero/hero-wall-sky-light.webp', baked: true },
  { id: 'summer-snow', name: 'سمر سنو', nameEn: 'Summer Snow', code: 'S 0502-Y', hex: '#E5D7C8', bgClass: 'bg-[#E5D7C8]', img: '/media/images/hero/hero-wall-summer-snow.webp', baked: true },
  { id: 'timeless', name: 'تايملس', nameEn: 'Timeless', code: 'S 1024-Y', hex: '#DBD5CF', bgClass: 'bg-[#DBD5CF]', img: '/media/images/hero/hero-wall-timeless.webp', baked: true },
  { id: 'vanilla-latte', name: 'فانيلا لاتيه', nameEn: 'Vanilla Latte', code: 'S 2010-Y30R', hex: '#DECFBD', bgClass: 'bg-[#DECFBD]', img: '/media/images/hero/hero-wall-vanilla-latte.webp', baked: true },
  { id: 'limestone', name: 'لايمستون', nameEn: 'Limestone', code: '10341', hex: '#D9C9BC', bgClass: 'bg-[#D9C9BC]', img: '/media/images/hero/hero-wall-limestone.webp', baked: true },
  { id: 'sand', name: 'ساند', nameEn: 'Sand', code: 'S 2010-Y20R', hex: '#D5C7BD', bgClass: 'bg-[#D5C7BD]', img: '/media/images/hero/hero-wall-sand.webp', baked: true },
  { id: 'cashmere', name: 'كشمير', nameEn: 'Cashmere', code: 'S 2005-Y20R', hex: '#B89B9D', bgClass: 'bg-[#B89B9D]', img: '/media/images/hero/hero-wall-camel.jpg' },
  { id: 'oxford-river', name: 'أكسفورد ريفر', nameEn: 'Oxford River', code: 'S 6502-B', hex: '#A69897', bgClass: 'bg-[#A69897]', img: '/media/images/hero/hero-wall-oxford-river.webp', baked: true },
  { id: 'mauve', name: 'موفي', nameEn: 'Mauve', code: 'S 3020-R50B', hex: '#A49395', bgClass: 'bg-[#A49395]', img: '/media/images/hero/hero-wall-mauve.webp', baked: true },
  { id: 'lead-gray', name: 'رصاصي', nameEn: 'Lead Gray', code: 'S 5500-N', hex: '#85898C', bgClass: 'bg-[#85898C]', img: '/media/images/hero/hero-wall-gray.jpg' },
  { id: 'gray', name: 'رمادي', nameEn: 'Gray', code: 'S 3500-N', hex: '#808080', bgClass: 'bg-[#808080]', img: '/media/images/hero/hero-wall-gray.jpg' },
  { id: 'black', name: 'أسود', nameEn: 'Black', code: 'S 9000-N', hex: '#111111', bgClass: 'bg-[#111111]', img: '/media/images/hero/hero-wall-black.jpg' },
  { id: 'red', name: 'أحمر', nameEn: 'Red', code: 'S 2070-R', hex: '#C71E2D', bgClass: 'bg-[#C71E2D]', img: '/media/images/hero/hero-wall-red.jpg' },
  { id: 'burgundy', name: 'برجاندي', nameEn: 'Burgundy', code: 'S 6030-R10B', hex: '#633A42', bgClass: 'bg-[#633A42]', img: '/media/images/hero/hero-wall-burgundy.webp', baked: true },
  { id: 'orange', name: 'برتقالي', nameEn: 'Orange', code: 'S 2070-Y50R', hex: '#D26F45', bgClass: 'bg-[#D26F45]', img: '/media/images/hero/hero-wall-orange.webp', baked: true },
  { id: 'mocha', name: 'موكا', nameEn: 'Mocha Brown', code: 'S 4010-Y50R', hex: '#806451', bgClass: 'bg-[#806451]', img: '/media/images/hero/hero-wall-brown.jpg' },
  { id: 'brown', name: 'بني', nameEn: 'Brown', code: 'S 5030-Y30R', hex: '#75452D', bgClass: 'bg-[#75452D]', img: '/media/images/hero/hero-wall-brown.jpg' },
  { id: 'darkbrown', name: 'بني غامق', nameEn: 'Dark Brown', code: 'S 7020-Y30R', hex: '#482719', bgClass: 'bg-[#482719]', img: '/media/images/hero/hero-wall-darkbrown.jpg' },
  { id: 'camel', name: 'جملي', nameEn: 'Camel', code: 'S 3020-Y30R', hex: '#BD8955', bgClass: 'bg-[#BD8955]', img: '/media/images/hero/hero-wall-camel.jpg' },
  { id: 'yellow', name: 'أصفر', nameEn: 'Yellow', code: 'S 1070-Y', hex: '#F3CC21', bgClass: 'bg-[#F3CC21]', img: '/media/images/hero/hero-wall-yellow.jpg' },
  { id: 'lemony', name: 'لموني', nameEn: 'Lemony', code: 'S 0560-Y10G', hex: '#AABB3C', bgClass: 'bg-[#AABB3C]', img: '/media/images/hero/hero-wall-lemony.webp', baked: true },
  { id: 'olive-green', name: 'أخضر زيتوني', nameEn: 'Olive Green', code: 'S 5030-G70Y', hex: '#777D55', bgClass: 'bg-[#777D55]', img: '/media/images/hero/hero-wall-green.jpg' },
  { id: 'baby-blue', name: 'بيبي بلو', nameEn: 'Baby Blue', code: 'S 1020-B', hex: '#89CFF0', bgClass: 'bg-[#89CFF0]', img: '/media/images/hero/hero-wall-skyblue.jpg' },
  { id: 'blue', name: 'أزرق', nameEn: 'Blue', code: 'S 2060-B', hex: '#1550A2', bgClass: 'bg-[#1550A2]', img: '/media/images/hero/hero-wall-blue.jpg' },
  { id: 'breeze', name: 'بريز', nameEn: 'Breeze', code: '0552', hex: '#DDCFD8', bgClass: 'bg-[#DDCFD8]', img: '/media/images/hero/hero-wall-breeze.webp', baked: true },
  { id: 'pink', name: 'بينك', nameEn: 'Pink', code: 'S 1030-R20B', hex: '#C54A79', bgClass: 'bg-[#C54A79]', img: '/media/images/hero/hero-wall-pink.webp', baked: true },
];

export const DEFAULT_HERO_COLOR = HERO_COLOR_PALETTES.find((c) => c.id === 'classic-white');

export const PAINT_COLORS = HERO_COLOR_PALETTES;


export const ASSETS = {
  logo: '/media/images/WhatsApp_Image_2026-10-11_at_01.46.59__1_-removebg-preview 3.png',
  preloaderLogo: '/media/images/Gemini_Generated_Image_88h0qg88h0qg88h0-removebg-preview.png',
  heroLivingRoom: '/media/images/Massive sunlit interior with royal blue accent wall.png',
  promoBanner: '/media/images/PromoBannerSection.png',
  paintSplash: '/media/images/paint-splash-trimmed.png',
  painterWork: '/media/images/WhatsApp Image 2026-10-18 at 16.06.23 1.png',
  footerBg: '/media/images/Footer.png',
  productCans: '/media/images/WhatsApp_Image_2026-10-18_at_15.38.39-removebg-preview 1.png',
  productCans2: '/media/images/WhatsApp_Image_2026-10-18_at_15.38.39-removebg-preview 1 (1).png',
  modalPoster: '/media/images/WhatsApp Image 2026-10-18 at 6.59.00 PM.jpeg',
  categories: {
    interior: '/media/images/دهانات داخلية.png',
    exterior: '/media/images/دهانات خارجية.png',
    wood: '/media/images/دهانات الأخشاب.png',
    insulation: '/media/images/مواد العوازل.png',
    industrial: '/media/images/دهانات صناعية.png',
  },
};
