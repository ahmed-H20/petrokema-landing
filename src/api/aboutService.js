import { axiosClient } from './axiosClient';

/**
 * Mock Data for About Us Page
 */
const MOCK_ABOUT_DATA = {
  hero: {
    tag: 'عن بتروكيما للدهانات',
    titleLine1: 'نصنع ألواناً تدوم..',
    titleLine2: 'ونمنح كل مساحة حياة',
    description:
      'نؤمن بأن كل جدار هو مساحة للتعبير وحكاية تستحق أن تروى بأرقى الألوان وأعلى معايير الحماية والاستدامة الصناعية.',
    bgImage: '/media/images/about-hero-interior.png',
  },
  stats: {
    percentage: '100%',
    percentageLabel: 'جودة معتمدة ومطابقة للمواصفات',
    years: '+25',
    yearsLabel: 'عاماً من الابتكار والصدارة',
    branches: '150',
    branchesLabel: 'مركز توزيع وشريك معتمد',
  },
  leadership: {
    tag: 'ريادة وخبرة',
    title: 'ريادة صناعية ترسخ مفهوماً جديداً لجمال واستدامة الأسطح',
    description:
      'منذ انطلاقتنا، وضعت بتروكيما نصب أعينها تطوير صناعة الدهانات في مصر والشرق الأوسط من خلال دمج أحدث تقنيات الكيمياء البوليمرية مع فهم عميق لاحتياجات البيئة المعمارية وتحديات الطقس القاسي.',
    points: [
      {
        id: 1,
        title: 'خطوط إنتاج آلية فائقة الدقة',
        desc: 'مصانع مجهزة بأحدث المعدات الألمانية لخلط ومطابقة الألوان بدقة متناهية في كل تشغيلة.',
      },
      {
        id: 2,
        title: 'مختبرات فحص ومراقبة جودة صارمة',
        desc: 'اختبارات دورية لمقاومة الرطوبة، والحرارة، وثبات درجات الألوان تحت أشعة الشمس المباشرة.',
      },
    ],
    image: '/media/images/about-factory.png',
    cardBadge: 'مصانع ومختبرات بتروكيما',
    cardSub: 'طاقة إنتاجية كبرى ومعايير فحص ISO المعتمدة',
  },
  visionMission: {
    vision: {
      badge: 'رؤيتنا المستقبلية',
      title: 'رؤيتنا',
      description:
        'أن نكون الخيار الأول والأكثر موثوقية لكل مهندس، مقاول، وصاحب منزل في مصر والشرق الأوسط، وأن نقود التحول نحو دهانات ذكية وصديقة للبيئة ترتقي بجودة الحياة وتلهم الإبداع المعماري.',
    },
    mission: {
      badge: 'رسالتنا وقيمنا',
      title: 'رسالتنا',
      description:
        'تصنيع وتقديم حلول دهانات متكاملة ومواد بناء حديثة بأعلى معايير الجودة العالمية وأفضل قيمة اقتصادية، مع الالتزام بالدعم الفني الاحترافي والمسؤولية البيئية تجاه مجتمعنا وعملائنا.',
    },
  },
  expertise: [
    {
      id: 1,
      title: 'الجدران والمساحات الداخلية',
      category: 'داخلي فاخر',
      image: '/media/images/expertise-interior.png',
      description:
        'تشكيلات راقية من الدهانات البلاستيكية والأكريليكية فائقة النعومة، بتركيبات قابلة للغسيل ومقاومة للبقع تدوم نضارتها طويلاً.',
      features: ['ملمس حريري ومطفي', 'مقاومة تامة للغسيل', 'خالية من الروائح النفاذة'],
    },
    {
      id: 2,
      title: 'الواجهات والمباني الحديثة',
      category: 'حماية متطورة',
      image: '/media/images/expertise-exterior.png',
      description:
        'أنظمة حماية خارجية مدعمة ضد الأشعة فوق البنفسجية والأمطار والتقلبات الجوية، تضمن بقاء واجهات المباني متألقة لسنوات.',
      features: ['مقاومة فائقة للطقس', 'مرونة تمنع التشققات', 'عزل ضد امتصاص الماء'],
    },
    {
      id: 3,
      title: 'حماية وتشطيبات الأخشاب',
      category: 'أناقة وحماية',
      image: '/media/images/expertise-wood.png',
      description:
        'ورنيشات وسيلرات ولاكيهات متطورة تبرز الملمس الطبيعي للأخشاب وتمنحها درعاً متيناً ضد الخدوش والرطوبة والاصفرار.',
      features: ['إبراز عروق الخشب', 'حماية ضد الرطوبة', 'بريق يدوم طويلاً'],
    },
    {
      id: 4,
      title: 'تجهيز الأسطح والمعاجين',
      category: 'أساس متين',
      image: '/media/images/expertise-putty.png',
      description:
        'معاجين وبرايمرات بوليمرية فائقة الالتصاق تمهد الجدران والأسطح الخرسانية بدقة، مما يمنح طبقات الطلاء النهائية نعومة وثباتاً مثالياً.',
      features: ['سهولة في الفرد والصنفرة', 'قوة ملء المسام', 'قوة التصاق عالية'],
    },
  ],
  whyUs: [
    {
      id: 1,
      title: 'الابتكار وجودة الخامات',
      description:
        'نعتمد على أجود الخامات الأوروبية والمستحلبات البوليمرية لضمان ثبات اللون ومقاومة الظروف المناخية القاسية.',
      icon: 'ShieldCheck',
    },
    {
      id: 2,
      title: 'تنوع الحلول والألوان',
      description:
        'منظومة تلوين بالكمبيوتر تضم آلاف الدرجات العصرية لتناسب كافة الأذواق والأنماط المعمارية الكلاسيكية والحديثة.',
      icon: 'Palette',
    },
    {
      id: 3,
      title: 'استشارات ودعم فني متخصص',
      description:
        'فريق من المهندسين والفنيين جاهز لمعاينة المشاريع وتقديم التوصيات الدقيقة لكل مرحلة من مراحل التشطيب.',
      icon: 'Users',
    },
    {
      id: 4,
      title: 'استدامة ومسؤولية بيئية',
      description:
        'منتجات مائية آمنة على الصحة وصديقة للبيئة بنسب مركبات متطايرة شبه معدومة (Zero/Low VOC) لبيئة منزلية نقية.',
      icon: 'Leaf',
    },
  ],
  cta: {
    title: 'كل مساحة تستحق لوناً مميزاً',
    subtitle:
      'سواء كنت تشطب منزلك الخاص أو تدير مشروعاً معمارياً ضخماً، فريق بتروكيما جاهز لمساعدتك في كل خطوة.',
    primaryButton: 'تواصل معنا',
    secondaryButton: 'تصفح المنتجات',
  },
};

/**
 * Fetch About Page Data
 * Simulates API network latency with realistic timing.
 * 
 * =========================================================================
 * HOW TO SWITCH TO A REAL BACKEND ENDPOINT LATER:
 * Simply replace the mock return with:
 * 
 * const response = await axiosClient.get('/about');
 * return response.data;
 * =========================================================================
 * 
 * @returns {Promise<Object>} About page data object
 */
export async function fetchAboutData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ABOUT_DATA);
    }, 300); // 300ms realistic mock delay
  });

  /*
  // REAL BACKEND INTEGRATION:
  // try {
  //   const response = await axiosClient.get('/about');
  //   return response.data;
  // } catch (error) {
  //   console.error('Failed to fetch about data:', error);
  //   throw error;
  // }
  */
}

export default {
  fetchAboutData,
};
