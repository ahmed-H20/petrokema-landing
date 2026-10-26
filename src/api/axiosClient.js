import axios from 'axios';

/**
 * Production-ready Axios Client
 * Configured with base URL, timeout, custom headers, and comprehensive interceptors.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8400/api/v1';
export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8400';

/**
 * Resolves product image URLs cleanly (handles full URLs, base64 strings, and relative server upload paths)
 */
export const resolveImageUrl = (imgUrl) => {
  if (!imgUrl) return '/media/products/WhatsApp_Image_2026-10-18_at_22.05.58__1_-removebg-preview 1.png';
  if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://') || imgUrl.startsWith('data:image')) {
    return imgUrl;
  }
  if (imgUrl.startsWith('/uploads')) {
    return `${SERVER_BASE_URL}${imgUrl}`;
  }
  return imgUrl;
};

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': 'ar', // Strict RTL Arabic localization header
  },
});

/**
 * Request Interceptor
 * Injects auth tokens, tracking IDs, or logs in development
 */
axiosClient.interceptors.request.use(
  (config) => {
    // Retrieve authentication token if stored
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config);
    }

    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Unwraps data and normalizes error messages for the UI
 */
axiosClient.interceptors.response.use(
  (response) => {
    // Returning response.data simplifies feature hooks and components
    return response.data;
  },
  (error) => {
    // Normalize error object for consistent UI handling
    const normalizedError = {
      status: error.response?.status || 500,
      message: 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.',
      errors: error.response?.data?.errors || null,
      isNetworkError: !error.response,
    };

    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          normalizedError.message = data?.message || 'البيانات المرسلة غير صحيحة.';
          break;
        case 401:
          normalizedError.message = 'انتهت الجلسة، يرجى تسجيل الدخول مجدداً.';
          localStorage.removeItem('auth_token');
          // Optional: window.location.href = '/login';
          break;
        case 403:
          normalizedError.message = 'ليس لديك صلاحية للوصول إلى هذا المحتوى.';
          break;
        case 404:
          normalizedError.message = data?.message || 'العنصر المطلوب غير موجود.';
          break;
        case 422:
          normalizedError.message = data?.message || 'يرجى مراجعة الحقول والمدخلات.';
          break;
        case 500:
        default:
          normalizedError.message = data?.message || 'خطأ في خادم البيانات، نعمل على حله.';
          break;
      }
    } else if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      normalizedError.message = 'استغرقت الاستجابة وقتاً أطول من المتوقع، تحقق من الاتصال.';
    } else if (!navigator.onLine) {
      normalizedError.message = 'أنت غير متصل بالإنترنت حالياً.';
    }

    if (import.meta.env.DEV) {
      console.error(`[API Error ${normalizedError.status}]:`, normalizedError.message, error);
    }

    return Promise.reject(normalizedError);
  }
);

export default axiosClient;
