import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="text-8xl font-black text-brand-orange/30 mb-4 select-none">404</span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-3">
        الصفحة غير موجودة
      </h1>
      <p className="text-slate-600 max-w-md mb-8">
        عذراً، الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله إلى مكان آخر.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg" showArrow>
          العودة للصفحة الرئيسية
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
