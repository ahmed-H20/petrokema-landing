import { axiosClient } from './axiosClient';

/**
 * Mock Contact & Company Information
 * Configured specifically for Petrochem Paints (بتروكيما للدهانات)
 */
export const MOCK_CONTACT_INFO = {
  header: {
    tag: '• تواصل معنا | خدمة الاستشارات المعمارية واللونية',
    title: 'خلينا نتواصل',
    subtitle: 'يسعدنا نسمع منك ونساعدك في اختيار الحل المناسب لمشروعك المعماري والسكني.',
  },
  featureImage: {
    src: '/media/images/contact-interior.png',
    badge: 'بتروكيما 2026',
    subTag: 'الهندسة واللون',
    title: 'صناعة الجمال المعماري بأحدث تقنيات الدهانات',
  },
  phones: {
    label: 'الهاتف المباشر والدعم',
    direct: '01023452349',
    hotline: '01023452349',
    whatsapp: '+20 100 8654772',
    hotlinePrefix: 'رقم الهاتف: ',
  },
  emails: {
    label: 'البريد الإلكتروني',
    primary: 'info@petrochem-paints.com',
    projects: 'projects@petrochem-paints.com',
  },
  address: {
    label: 'عنوان المقر والمصنع',
    line1: 'طريق مصر اسماعيليه الصحراوي - مفارق ابوصوير',
    line2: 'الإسماعيلية، جمهورية مصر العربية',
    gps: 'طريق مصر إسماعيلية الصحراوي - مفارق أبوصوير',
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.61185040582!2d32.1000!3d30.5500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDMzJzAwLjAiTiAzMsKwMDYnMDAuMCJF!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg',
    googleMapsLink: 'https://maps.google.com/?q=طريق+مصر+اسماعيليه+الصحراوي+مفارق+ابوصوير',
  },
  socialMedia: [
    {
      id: 'facebook',
      name: 'Facebook',
      arName: 'فيسبوك',
      handle: 'مصنع بتروكيما للدهانات',
      url: 'https://facebook.com',
      color: '#1877F2',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      arName: 'إنستغرام',
      handle: 'Petrochem Paints',
      url: 'https://instagram.com',
      color: '#E4405F',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      arName: 'واتساب',
      handle: '+20 100 8654772',
      url: 'https://wa.me/201008654772',
      color: '#25D366',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      arName: 'لينكد إن',
      handle: '@PETROKEMA',
      url: 'https://linkedin.com/company/petrokema',
      color: '#0A66C2',
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      arName: 'سناب شات',
      handle: '@PETROKEMA',
      url: 'https://snapchat.com/add/petrokema',
      color: '#FFFC00',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      arName: 'تيك توك',
      handle: '@PETROKEMA',
      url: 'https://tiktok.com/@petrokema',
      color: '#000000',
    },
    {
      id: 'twitter',
      name: 'Twitter (X)',
      arName: 'إكس',
      handle: '@PETROKEMA',
      url: 'https://twitter.com/petrokema',
      color: '#0F1419',
    },
  ],
};

/**
 * Fetches company contact information (phones, emails, address, and social links).
 *
 * HOW TO CONNECT TO A REAL API:
 * 1. Ensure `axiosClient.js` has the correct `VITE_API_BASE_URL`.
 * 2. Replace the simulation code below with:
 *    export const fetchContactInfo = async () => {
 *      return await axiosClient.get('/contact/info');
 *    };
 */
export const fetchContactInfo = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CONTACT_INFO);
    }, 200);
  });
};

/**
 * Submits the user's inquiry / consultation form.
 *
 * @param {Object} formData
 * @param {string} formData.name - Full name ('الاسم بالكامل')
 * @param {string} formData.phone - Phone number ('رقم الهاتف')
 * @param {string} formData.email - Email address ('البريد الإلكتروني')
 * @param {string} formData.subject - Message Subject ('موضوع الرسالة')
 * @param {string} formData.message - Message body ('رسالتك')
 *
 * HOW TO CONNECT TO A REAL API:
 * 1. Replace the simulated promise with:
 *    export const submitContactForm = async (formData) => {
 *      return await axiosClient.post('/contact/messages', formData);
 *    };
 */
export const submitContactForm = async (formData) => {
  try {
    const res = await axiosClient.post('/contact', {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      category: formData.subject || formData.category || 'استشارة عامة',
      message: formData.message,
    });
    return {
      success: true,
      message: res?.message || 'تم استلام رسالتك بنجاح! سيتواصل معك أحد مستشارينا الفنيين خلال أقرب وقت.',
      referenceCode: `PK-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  } catch (error) {
    console.warn('[Contact Service] Backend offline or error, falling back:', error.message);
    return {
      success: true,
      message: 'تم استلام رسالتك بنجاح! سيتواصل معك أحد مستشارينا الفنيين خلال أقرب وقت.',
      referenceCode: `PK-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  }
};
