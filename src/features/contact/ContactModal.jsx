import React, { useState } from 'react';
import { X, CheckCircle2, User, Phone, Mail, MessageSquare } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { submitContactForm } from '../../api/contact.api';
import { WhatsAppIcon, openWhatsAppQuote } from '../../utils/whatsapp';

export const ContactModal = ({ isOpen, onClose, product = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'دهانات داخلية',
    message: '',
  });

  // Pre-fill message and category if a specific product was selected
  React.useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        category: product.categoryLabel || product.title || 'دهانات',
        message: `أرغب في طلب عرض أسعار واستشارة فنية لمنتج: ${product.title || product.name}`,
      }));
    }
  }, [product]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('يرجى ملء الاسم ورقم الهاتف على الأقل للتواصل.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      await submitContactForm({
        ...formData,
        productName: product?.title || product?.name || '',
        productId: product?.id || product?._id || '',
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', phone: '', email: '', category: 'دهانات داخلية', message: '' });
        onClose();
      }, 2500);
    } catch (err) {
      setErrorMessage(err?.message || 'تعذر إرسال الطلب، يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-rtl">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-right overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">تم استلام طلبك بنجاح!</h3>
            <p className="text-slate-600 max-w-sm">
              شكراً لتواصلك مع بتروكيما. سيتواصل معك أحد مستشاري الدهانات لدينا خلال دقائق.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                استشارة وتواصل مجاني
              </span>
              <h2 className="text-2xl font-extrabold text-brand-navy mt-1">
                تواصل مع مستشاري بتروكيما
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                اترك بياناتك وسنساعدك في اختيار نوع الدهان والكميات المناسبة لمشروعك.
              </p>
            </div>

            {/* Quick WhatsApp Fast Track Card */}
            <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-right">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-emerald-950">
                    تفضل الرد الفوري المباشر؟
                  </h4>
                  <p className="text-[11px] text-emerald-700">
                    تواصل فوراً عبر واتساب مع مهندسينا للحصول على عرض السعر
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  openWhatsAppQuote({
                    product,
                    category: formData.category,
                    note: formData.message || 'طلب استشارة وعرض أسعار',
                  });
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>مراسلة واتساب الآن</span>
              </button>
            </div>

            <div className="relative flex py-1 items-center mb-4">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-xs text-slate-400 font-semibold">أو عبر النموذج الإلكتروني</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="الاسم بالكامل *"
                name="name"
                placeholder="أحمد محمد"
                value={formData.name}
                onChange={handleChange}
                icon={User}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="رقم الهاتف / واتساب *"
                  name="phone"
                  placeholder="01023452349"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={Phone}
                  required
                />
                <Input
                  label="البريد الإلكتروني (اختياري)"
                  name="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  نوع الدهان أو الخدمة المطلوبة
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none"
                >
                  <option value="دهانات داخلية">دهانات داخلية (بلاستيك ومط)</option>
                  <option value="دهانات خارجية">دهانات خارجية (أكريليك مقاوم)</option>
                  <option value="دهانات أخشاب">دهانات أخشاب وسيلر وورنيش</option>
                  <option value="معجون وبرايمر">معجون وبرايمر وعوازل</option>
                  <option value="ميتالك ولاكيه">لاكيه ميتالك وشامبين</option>
                  <option value="استشارة شاملة لمشروع">استشارة شاملة لمشروع أو مبنى كامل</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  ملاحظات أو تفاصيل إضافية
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="اكتب أي استفسار أو مساحة المكان المطلوب دهانه..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center shadow-lg hover:shadow-orange-500/25"
                  isLoading={loading}
                >
                  إرسال الطلب الآن
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
