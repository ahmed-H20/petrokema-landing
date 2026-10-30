import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CategoryCard from './CategoryCard';
import CategoryModal from './CategoryModal';
import { ArrowLeft } from 'lucide-react';

/**
 * Main Product Categories Configuration (6 Stages)
 * 
 * Features interactive color palettes for finishing & lacquer stages,
 * and technical specifications for foundation, putty, undercoat, and insulation.
 */
export const HOME_CATEGORIES = [
  {
    id: 'foundation',
    number: '01',
    title: 'مرحلة التأسيس',
    subtitle: 'عزل وحماية وتأسيس قوي للأسطح والخرسانة',
    items: ['سيلر مقاوم 333'],
    image: '/media/images/دهانات داخلية.png',
    filterCategory: 'foundation',
    hasColors: false,
    isWhiteOnly: true,
    colorNote: 'أبيض ناصع فقط',
    fullDescription:
      'مرحلة التأسيس هي حجر الأساس لأي عمل دهان ناجح ومستدام. سيلر بتروكيما المقاوم 333 مصنع بتركيبات بوليمرية فائقة الجودة تخترق المسام الخرسانية لتعزل الرطوبة والأملاح وتمنع تسرب المياه، مما يوفر قاعدة صلبة ومثالية تضمن أقصى قوة تماسك لطبقات المعجون والدهانات اللاحقة دون تقشير أو تلف.',
    features: [
      'عزل تام للرطوبة والأملاح والنشع',
      'اختراق عميق للمسامات الخرسانية',
      'قوة التصاق استثنائية بالخرسانة والمحارة',
      'توفير في استهلاك الدهانات اللاحقة',
    ],
  },
  {
    id: 'putty',
    number: '02',
    title: 'المعجون',
    subtitle: 'معجون داخلي وخارجي لتسوية وتجهيز الجدران',
    items: ['معجون بترو 100', 'معجون اكريليك بترو 500'],
    image: '/media/images/expertise-putty.png',
    filterCategory: 'putty',
    hasColors: false,
    isWhiteOnly: true,
    colorNote: 'أبيض شاهق فقط',
    fullDescription:
      'مرحلة المعجون تمنح الجدران والأسقف استواءً تاماً وملمساً حريرياً ناعماً. معاجين بتروكيما (بترو 100 وبترو اكريليك 500) تتميز بقوة ملء استثنائية للفراغات والتشققات، وسهولة فائقة في الفرد والصنفرة دون ترك غبار متطاير، لتهيئة الأسطح لاستقبال الألوان بدقة ونقاء لا مثيل له.',
    features: [
      'تسوية تامة ومعالجة دقيقة للتشققات وفروق اللياسة',
      'نعومة حريرية وسهولة فائقة في الصنفرة والتشغيل',
      'بياض شاهق يوفر تغطية متجانسة لكافة ألوان الدهان',
      'مرونة عالية تمنع عودة الشروخ الدقيقة',
    ],
  },
  {
    id: 'undercoat',
    number: '03',
    title: 'البطانة',
    subtitle: 'دهانات بطانة وأساس معماري عالي التغطية والبياض',
    items: ['بستله ايكو كيم', 'كيما برو 5050', 'بلس 700'],
    image: '/media/images/expertise-interior.png',
    filterCategory: 'undercoat',
    hasColors: false,
    isWhiteOnly: true,
    colorNote: 'أبيض ناصع عالي التغطية',
    fullDescription:
      'مرحلة البطانة توفر التغطية الأساسية وتوحيد لون السطح. تشمل دهانات ايكو كيم، كيما برو 5050، وبلس 700، التي تمنح الجدران بياضاً ناصعاً ومعدل انتشار واسع يوفر أعلى كفاءة وتغطية ممتازة تمهد لأرقى طبقات التشطيب بأقل تكلفة واستهلاك.',
    features: [
      'تغطية استثنائية تخفي عيوب الحائط بكفاءة عالية',
      'بياض بلوري متجانس ومشرق',
      'توفير اقتصادي ومعدل فرد مرتفع للعبوة',
      'تركيبة مائية صديقة للبيئة خالية من الروائح النفاذة',
    ],
  },
  {
    id: 'finishing',
    number: '04',
    title: 'تشطيب',
    subtitle: 'دهانات تشطيب نهائية فاخرة بأعلى متانة وألوان حيوية',
    items: ['ورنيش كلير 444', 'ستار 15000', 'ستار 20000'],
    image: '/media/images/hero/hero-wall-blue.jpg',
    filterCategory: 'finishing',
    hasColors: true,
    fullDescription:
      'مرحلة التشطيب الراقية بدهانات أكريليكية متطورة وورنيش مائي بلوري (ورنيش كلير 444، ستار 15000، ستار 20000). تمنحك ملمساً مخملياً ومقاومة جبارة للاحتكاك والغسيل المتكرر والرطوبة وأشعة الشمس UV، مع باقة ألوان ساحرة تناسب أحدث صيحات الديكور الحديث.',
    features: [
      'مظهر حريري استثنائي ولمسات نهائية راقية',
      'قابلية فائقة للغسيل ومقاومة للبقع والاحتكاك',
      'ثبات لوني يدوم لسنوات ومقاومة لأشعة الشمس UV',
      'حماية بلورية شفافة للأخشاب والديكورات',
    ],
    colors: [
      // 1. باقة الألوان العصرية (12 لوناً)
      { id: 'off-white', name: 'أوف وايت', nameEn: 'Off White', hex: '#F3EFE5', img: '/media/images/hero/hero-wall-gray.jpg' },
      { id: 'cashmere', name: 'كشمير', nameEn: 'Cashmere', hex: '#B89B9D', img: '/media/images/hero/hero-wall-camel.jpg' },
      { id: 'vanilla-latte', name: 'فانيلا لاتيه', nameEn: 'Vanilla Latte', hex: '#C9B69C', img: '/media/images/hero/hero-wall-camel.jpg' },
      { id: 'greige', name: 'جريج', nameEn: 'Greige', hex: '#B8ADA0', img: '/media/images/hero/hero-wall-gray.jpg' },
      { id: 'beige', name: 'بيج', nameEn: 'Beige', hex: '#D6C3A5', img: '/media/images/hero/hero-wall-camel.jpg' },
      { id: 'gray', name: 'رمادي', nameEn: 'Gray', hex: '#808080', img: '/media/images/hero/hero-wall-gray.jpg' },
      { id: 'baby-blue', name: 'بيبي بلو', nameEn: 'Baby Blue', hex: '#89CFF0', img: '/media/images/hero/hero-wall-skyblue.jpg' },
      { id: 'sage-green', name: 'أخضر سيج', nameEn: 'Sage Green', hex: '#A3AD91', img: '/media/images/hero/hero-wall-green.jpg' },
      { id: 'olive-green', name: 'أخضر زيتوني', nameEn: 'Olive Green', hex: '#777D55', img: '/media/images/hero/hero-wall-green.jpg' },
      { id: 'mocha', name: 'موكا', nameEn: 'Mocha Brown', hex: '#806451', img: '/media/images/hero/hero-wall-brown.jpg' },
      { id: 'brandy', name: 'براندي', nameEn: 'Brandy', hex: '#A65E46', img: '/media/images/hero/hero-wall-darkbrown.jpg' },
      { id: 'terracotta', name: 'تيراكوتا', nameEn: 'Terracotta', hex: '#BD765C', img: '/media/images/hero/hero-wall-red.jpg' },

      // 2. باقة الألوان الأساسية الكلاسيكية السابقة (بدون أكواد)
      { id: 'blue', name: 'أزرق', nameEn: 'Blue', hex: '#1550A2', img: '/media/images/hero/hero-wall-blue.jpg' },
      { id: 'skyblue', name: 'لبني', nameEn: 'Sky Blue', hex: '#76BDE8', img: '/media/images/hero/hero-wall-skyblue.jpg' },
      { id: 'green', name: 'أخضر', nameEn: 'Green', hex: '#187B42', img: '/media/images/hero/hero-wall-green.jpg' },
      { id: 'yellow', name: 'أصفر', nameEn: 'Yellow', hex: '#F3CC21', img: '/media/images/hero/hero-wall-yellow.jpg' },
      { id: 'red', name: 'أحمر', nameEn: 'Red', hex: '#C71E2D', img: '/media/images/hero/hero-wall-red.jpg' },
      { id: 'camel', name: 'جملي', nameEn: 'Camel', hex: '#BD8955', img: '/media/images/hero/hero-wall-camel.jpg' },
      { id: 'brown', name: 'بني', nameEn: 'Brown', hex: '#75452D', img: '/media/images/hero/hero-wall-brown.jpg' },
      { id: 'darkbrown', name: 'بني غامق', nameEn: 'Dark Brown', hex: '#482719', img: '/media/images/hero/hero-wall-darkbrown.jpg' },
      { id: 'lead-gray', name: 'رصاصي', nameEn: 'Lead Gray', hex: '#85898C', img: '/media/images/hero/hero-wall-gray.jpg' },
      { id: 'black', name: 'أسود', nameEn: 'Black', hex: '#111111', img: '/media/images/hero/hero-wall-black.jpg' },
    ],
  },
  {
    id: 'lacquer',
    number: '05',
    title: 'مراحل تأسيسي لاكيه',
    subtitle: 'دهانات سنتيتك وميتالك فاخرة للأخشاب والمعادن',
    items: ['كيما كوت مط 500', 'لاكيه سوبر ستار كل الاوزان', 'لاكيه شامبين', 'لاكيه ميتال'],
    image: '/media/images/expertise-wood.png',
    filterCategory: 'lacquer',
    hasColors: true,
    fullDescription:
      'تشكيلة بتروكيما المتميزة من دهانات اللاكيه الزيتي السينتيتك والميتالك والكيما كوت مط 500 للأخشاب والأبواب والمطابخ والخزائن والمعادن. توفر حماية فائقة ضد الصدأ والخدوش والعوامل الجوية والحرارة، مع طبقة لمعان زجاجي أو ميتالك براق يعكس بريقاً يدوم طويلاً، مع باقة ألوان لاكيه حصرية وفائقة الأناقة.',
    features: [
      'لمعان زجاجي مذهل وتأثيرات ميتالك وشامبين ملكية',
      'حماية فائقة للأخشاب والحديد من الخدوش والصدأ',
      'مقاومة ممتازة للماء والمنظفات المنزلية والحرارة',
      'متوفر بكافة الأوزان والعبوات المعتمدة للمشاريع',
    ],
    colors: [
      {
        id: 'emerald-lacquer',
        name: 'أخضر زمردي فاخر',
        hex: '#0f5938',
        img: '/media/images/lacquer/Gemini_Generated_Image_1gp0171gp0171gp0.webp',
      },
      {
        id: 'sky-blue-lacquer',
        name: 'سماوي عصري ناعم',
        hex: '#5b9bd5',
        img: '/media/images/lacquer/3c7f3a29-f5ac-4550-837c-76d08e008eca.webp',
      },
      {
        id: 'burgundy-lacquer',
        name: 'أحمر نبيتي ملكي',
        hex: '#8B1E28',
        img: '/media/images/lacquer/696cb32a-ba07-4fa9-9c8c-ea9d51f2a567.webp',
      },
      {
        id: 'amber-lacquer',
        name: 'أصفر عنبري دافئ',
        hex: '#E5A823',
        img: '/media/images/lacquer/c1f70137-feb0-49e5-8456-8cc20664c26b.webp',
      },
      {
        id: 'walnut-lacquer',
        name: 'بني جوزي فاخر',
        hex: '#5A2C18',
        img: '/media/images/lacquer/c91cf6b1-6b6e-47ba-ac3a-d76818093a42.webp',
      },
      {
        id: 'honey-oak-lacquer',
        name: 'عسلي خشبي طبيعي',
        hex: '#C67D3B',
        img: '/media/images/lacquer/f027dd85-e4cb-458c-9519-adb0a6a46212.webp',
      },
      {
        id: 'slate-gray-lacquer',
        name: 'رمادي عصري راقٍ',
        hex: '#78828c',
        img: '/media/images/lacquer/a21976a4-bcaa-44cf-8207-61686bff3543.webp',
      },
    ],
  },
  {
    id: 'insulation',
    number: '06',
    title: 'مراحل عزل',
    subtitle: 'عزل وحماية فائقة ضد الصدأ والتآكل والرطوبة الجوية',
    items: ['بريمر بريكس كل الاوزان', 'بترو فورس'],
    image: '/media/images/insulation-rust.jpg',
    filterCategory: 'insulation',
    hasColors: false,
    isWhiteOnly: false,
    colorNote: 'حماية وعزل ضد الصدأ والرطوبة',
    fullDescription:
      'مركبات العزل والحماية الإنشائية والمعدنية المتطورة من بتروكيما (برايمر بريكس المضاد للصدأ والتآكل، وبترو فورس). يوفر طبقة حماية قصوى للحديد والأسطح والمنشآت من الصدأ والبارومة والنشع والأملاح ومنع تغلغل مياه الأمطار نهائياً لضمان عمر أطول للمنشآت.',
    features: [
      'حماية فائقة للحديد والمعادن من الصدأ والتآكل',
      'عزل مائي متفوق ومقاومة تامة للنشع والخرسانة',
      'قوة تحمل ميكانيكية استثنائية والتصاق صلب',
      'متوفر بكافة الأحجام والأوزان لتلبية احتياجات المشروعات',
    ],
  },
];

export const ProductsList = ({ onRequestQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section id="products" className="py-16 sm:py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with stylized orange dividers */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className="w-8 sm:w-12 h-0.5 bg-brand-orange rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
              منتجاتنا
            </h2>
            <span className="w-8 sm:w-12 h-0.5 bg-brand-orange rounded-full" />
          </div>

          <p className="text-sm sm:text-base text-slate-600 font-medium mt-2">
            مجموعة متكاملة من الدهانات والمواد عالية الجودة مقسمة حسب مراحل التطبيق المعماري — اضغط على أي تصنيف لاستعراض التفاصيل والألوان
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOME_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={(cat) => setSelectedCategory(cat)}
            />
          ))}
        </div>

        {/* Direct Link to Products Page */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-navy hover:bg-brand-navy/90 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span>استعراض كافة المنتجات (15 صنفاً مرتبة حسب المراحل)</span>
            <ArrowLeft className="w-5 h-5 transform transition-transform group-hover:-translate-x-1 text-brand-orange" />
          </Link>
        </div>



      </div>

      {/* Category Interactive Modal with Color Palette & Description */}
      <AnimatePresence>
        {selectedCategory && (
          <CategoryModal
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
            onRequestQuote={onRequestQuote}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductsList;
