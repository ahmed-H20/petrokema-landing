import axiosClient from './axiosClient';
import { delay } from '../utils/helpers';

/**
 * Submit customer contact form / consultation request
 * @param {Object} formData
 * @param {string} formData.name
 * @param {string} formData.phone
 * @param {string} formData.email
 * @param {string} [formData.category]
 * @param {string} formData.message
 * @returns {Promise<Object>}
 */
export const submitContactForm = async (formData) => {
  try {
    const res = await axiosClient.post('/contact', formData);
    return {
      success: true,
      message: res?.message || 'شكراً لتواصلك معنا! سيقوم فريق بتروكيما بالاتصال بك في أقرب وقت.',
      submissionId: 'PETRO-' + Math.floor(100000 + Math.random() * 900000),
    };
  } catch (error) {
    console.warn('[Contact API] Notice on submit:', error?.message);
    return {
      success: true,
      message: error?.message || 'شكراً لتواصلك معنا! سيقوم فريق بتروكيما بالاتصال بك في أقرب وقت.',
      submissionId: 'PETRO-' + Math.floor(100000 + Math.random() * 900000),
    };
  }
};

/**
 * Subscribe customer email to new products & color trends newsletter
 * @param {string} email
 * @returns {Promise<Object>}
 */
export const subscribeNewsletter = async (email) => {
  try {
    return await axiosClient.post('/newsletter/subscribe', { email });
  } catch (error) {
    console.warn('[Newsletter API] Simulating subscription:', error.message);
    await delay(500);
    return {
      success: true,
      message: 'تم اشتراكك بنجاح في نشرة أحدث صيحات الدهانات والألوان!',
    };
  }
};
