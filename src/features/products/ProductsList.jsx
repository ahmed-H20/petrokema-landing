import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CategoryCard from './CategoryCard';
import CategoryModal from './CategoryModal';
import { ArrowLeft } from 'lucide-react';

/**
 * Main Product Categories Configuration (4 Categories)
 * 
 * Features interactive color palettes (color batle) for each category,
 * specifically utilizing the lacquer suite from /media/images/لكيه.
 */
export const HOME_CATEGORIES = [
  {
    id: 'foundation',
    number: '01',
    title: 'التأسيس',
    subtitle: 'عزل وحماية وتأسيس قوي للأسطح والخرسانة',
    items: ['سيلر مقاوم 333', 'بريمر'],
    // Default image
    image: '/media/images/دهانات داخلية.png',
    filterCategory: 'sealer',
    fullDescription:
      'مرحلة التأسيس هي حجر الأساس لأي عمل دهان ناجح ومستدام. منتجات السيلر والبرايمر من بتروكيما مصنعة بتركيبات كيميائية فائقة الجودة تخترق المسام الخرسانية لتعزل الرطوبة والأملاح وتمنع تسرب المياه، مما يوفر قاعدة صلبة ومثالية تضمن أقصى قوة تماسك لطبقات المعجون والدهانات اللاحقة دون تقشير أو تلف.',
    features: [
      'عزل تام للرطوبة والأملاح والنشع',
      'قوة التصاق استثنائية بالخرسانة والمحارة',
      'توفير في استهلاك الدهانات اللاحقة',
      'مقاومة فائقة للعوامل الجوية الصعبة',
    ],
    colors: [
      {
        id: 'primer-1',
        name: 'سيلر مائي عازل 333',
        hex: '#38bdf8',
        img: '/media/images/دهانات داخلية.png',
      },
      {
        id: 'primer-2',
        name: 'برايمر حماية الواجهات',
        hex: '#64748b',
        img: '/media/images/expertise-exterior.png',
      },
      {
        id: 'primer-3',
        name: 'عزل خرساني فائق المقاومة',
        hex: '#0284c7',
        img: '/media/images/مواد العوازل.png',
      },
    ],
  },
  {
    id: 'putty',
    number: '02',
    title: 'المعجون',
    subtitle: 'معجون داخلي وخارجي لتسوية وتجهيز الجدران',
    items: ['معجون داخلي', 'معجون خارجي'],
    // Default image
    image: '/media/images/expertise-putty.png',
    filterCategory: 'putty',
    fullDescription:
      'مرحلة المعجون تمنح الجدران والأسقف استواءً تاماً وملمساً حريرياً ناعماً. معاجين بتروكيما المعمارية تتميز بقوة ملء استثنائية للفراغات والتشققات، وسهولة فائقة في الفرد والصنفرة دون ترك غبار متطاير، لتهيئة الأسطح لاستقبال الألوان بدقة ونقاء لا مثيل له.',
    features: [
      'تسوية تامة ومعالجة دقيقة للتشققات وفروق اللياسة',
      'نعومة حريرية وسهولة فائقة في الصنفرة والتشغيل',
      'بياض شاهق يوفر تغطية متجانسة لكافة ألوان الدهان',
      'تركيبة صديقة للبيئة خالية من الروائح النفاذة',
    ],
    colors: [
      {
        id: 'putty-white',
        name: 'معجون داخلي ناعم (أبيض شاهق)',
        hex: '#f8fafc',
        img: '/media/images/expertise-putty.png',
      },
      {
        id: 'putty-exterior',
        name: 'معجون خارجي معزز ضد الرطوبة',
        hex: '#cbd5e1',
        img: '/media/images/تجهيز الأسطح والمعاجين المعمارية.png',
      },
    ],
  },
  {
    id: 'paints',
    number: '03',
    title: 'الدهانات',
    subtitle: 'دهانات معمارية فاخرة داخلية وخارجية بأعلى تغطية',
    items: ['كيما برو', 'بلس', 'ستار'],
    // Default image
    image: '/media/images/expertise-interior.png',
    filterCategory: 'acrylic',
    fullDescription:
      'تشكيلة بتروكيما الفاخرة من دهانات البلاستيك والأكريليك (كيما برو، بلس، ستار). تمنحك تغطية ممتازة ومعدل انتشار واسع مع بياض ناصع وألوان حيوية وثابتة لا تتغير مع مرور الزمن. صممت لمقاومة البقع والغسيل المتكرر والاحتكاك، مع لمسات نهائية مطفية ولامعة تناسب أحدث صيحات الديكور الحديث.',
    features: [
      'تغطية استثنائية تخفي عيوب الحائط بكفاءة عالية',
      'قابلة للغسيل الفائق ومقاومة للبقع والاحتكاك',
      'ثبات لوني يدوم لسنوات ومقاومة لأشعة الشمس UV',
      'لمسات نهائية متعددة: مطفي، نصف لامع، وحريري',
    ],
    colors: [
      { id: 'blue', name: 'أزرق (921)', hex: '#1550A2', img: '/media/images/hero/hero-wall-blue.jpg' },
      { id: 'skyblue', name: 'لبني (922)', hex: '#76BDE8', img: '/media/images/hero/hero-wall-skyblue.jpg' },
      { id: 'green', name: 'أخضر (919)', hex: '#187B42', img: '/media/images/hero/hero-wall-green.jpg' },
      { id: 'yellow', name: 'أصفر (964)', hex: '#F3CC21', img: '/media/images/hero/hero-wall-yellow.jpg' },
      { id: 'red', name: 'أحمر (915)', hex: '#C71E2D', img: '/media/images/hero/hero-wall-red.jpg' },
      { id: 'camel', name: 'جملي (991)', hex: '#BD8955', img: '/media/images/hero/hero-wall-camel.jpg' },
      { id: 'brown', name: 'بني (909)', hex: '#75452D', img: '/media/images/hero/hero-wall-brown.jpg' },
      { id: 'darkbrown', name: 'بني غامق (951)', hex: '#482719', img: '/media/images/hero/hero-wall-darkbrown.jpg' },
      { id: 'gray', name: 'رصاصي (925)', hex: '#85898C', img: '/media/images/hero/hero-wall-gray.jpg' },
      { id: 'black', name: 'أسود (950)', hex: '#111111', img: '/media/images/hero/hero-wall-black.jpg' },
    ],
  },
  {
    id: 'finishing',
    number: '04',
    title: 'التشطيب',
    subtitle: 'ورنيش ولاكيه للمسات نهائية متألقة وحماية فائقة',
    items: ['ورنيش مائي', 'لاكيه'],
    // Default image
    image: '/media/images/expertise-wood.png',
    filterCategory: 'lacquer',
    fullDescription:
      'المرحلة الختامية لأناقة وفخامة المساحات. تشمل أرقى دهانات اللاكيه السينتيتك والميتالك والورنيش المائي للأخشاب والأبواب والمطابخ والخزائن والمعادن. توفر حماية فائقة ضد الخدوش والعوامل الجوية والحرارة والرطوبة، مع طبقة حماية بلورية غنية تبرز جمال الأسطح وتعكس بريقاً ولمعاناً زجاجياً يدوم طويلاً، مع باقة ألوان ساحرة تناسب كافة الأذواق المعمارية الراقية.',
    features: [
      'لمعان بلوري زجاجي مذهل ومقاوم للاصفرار',
      'حماية فائقة للأخشاب والمعادن من الخدوش والحرارة',
      'مقاومة ممتازة للماء والمنظفات المنزلية',
      'باقة ألوان لاكيه حصرية عصرية وفائقة الأناقة',
    ],
    // 7 Lacquer Colors from /media/images/لكيه
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
            مجموعة متكاملة من الدهانات والمواد عالية الجودة لكل احتياجاتك — اضغط على أي تصنيف لاستعراض الألوان والتفاصيل
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={(cat) => setSelectedCategory(cat)}
            />
          ))}
        </div>

        {/* Explore All Catalog CTA Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-0.5"
          >
            <span>استعراض كتالوج المنتجات بالكامل</span>
            <ArrowLeft className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" />
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
