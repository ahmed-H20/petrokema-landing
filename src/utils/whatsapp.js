import { COMPANY_INFO } from './constants';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';

/**
 * Standard sanitized WhatsApp number for Petrochem Paints
 */
export const COMPANY_WHATSAPP_NUMBER = (COMPANY_INFO?.whatsapp || '201008654772').replace(/[^0-9]/g, '');

/**
 * Builds formatted Arabic inquiry/quote text for Petrochem products
 * @param {Object} params
 * @param {Object|string} [params.product] Product object or title
 * @param {Object|string} [params.size] Selected packaging size
 * @param {Object|string} [params.color] Selected color or hex
 * @param {string} [params.category] Category label
 * @param {string} [params.note] Additional customer note
 * @returns {string} Formatted text
 */
export const createWhatsAppQuoteMessage = ({
  product,
  size,
  color,
  category,
  note,
} = {}) => {
  const lines = [
    'السلام عليكم ورحمة الله وبركاته،',
    'أرغب في الاستفسار وطلب عرض أسعار من *مصنع بتروكيما للدهانات*:',
    '',
  ];

  const productTitle =
    typeof product === 'object' && product !== null
      ? product.title || product.name
      : product;

  if (productTitle) {
    lines.push(`📌 *المنتج:* ${productTitle}`);
  }

  if (category) {
    lines.push(`🏷️ *القسم / التصنيف:* ${category}`);
  }

  if (size) {
    const sizeName = typeof size === 'object' && size !== null ? size.name : size;
    lines.push(`📦 *العبوة / الحجم:* ${sizeName}`);
  }

  if (color) {
    const colorName =
      typeof color === 'object' && color !== null
        ? `${color.name}${color.nameEn ? ` (${color.nameEn})` : ''}`
        : color;
    lines.push(`🎨 *درجة اللون:* ${colorName}`);
  }

  if (note) {
    lines.push(`📝 *تفاصيل إضافية:* ${note}`);
  }

  lines.push('');
  lines.push('برجاء تزويدي بعرض الأسعار والمواصفات الفنية ومواعيد التوريد. شكراً لكم.');

  return lines.join('\n');
};

/**
 * Builds direct WhatsApp URL with phone and encoded message
 * @param {Object} params
 * @param {string} [params.phone] Custom phone or defaults to company WhatsApp
 * @param {string} params.message
 * @returns {string} URL
 */
export const buildWhatsAppUrl = ({ phone = COMPANY_WHATSAPP_NUMBER, message = '' } = {}) => {
  const cleanPhone = (phone || COMPANY_WHATSAPP_NUMBER).replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

/**
 * Directly opens WhatsApp quote in a new window/tab
 * @param {Object} quoteParams
 */
export const openWhatsAppQuote = (quoteParams = {}) => {
  const message = createWhatsAppQuoteMessage(quoteParams);
  const url = buildWhatsAppUrl({
    phone: quoteParams.phone || COMPANY_WHATSAPP_NUMBER,
    message,
  });
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return url;
};

/**
 * Directly opens general WhatsApp chat with predefined message
 * @param {string} [customMessage]
 */
export const openGeneralWhatsApp = (customMessage) => {
  const message =
    customMessage ||
    'السلام عليكم ورحمة الله وبركاته،\nأرغب في الاستفسار عن منتجات ودهانات مصنع بتروكيما وطلب استشارة هندسية لمشروعي.';
  const url = buildWhatsAppUrl({ phone: COMPANY_WHATSAPP_NUMBER, message });
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return url;
};

export { WhatsAppIcon };

export default {
  COMPANY_WHATSAPP_NUMBER,
  createWhatsAppQuoteMessage,
  buildWhatsAppUrl,
  openWhatsAppQuote,
  openGeneralWhatsApp,
  WhatsAppIcon,
};
