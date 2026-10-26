import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useProducts from './hooks/useProducts';
import ProductCard from './ProductCard';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { AlertCircle, RefreshCw, X, Check } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const ProductsList = ({ onRequestQuote }) => {
  const {
    products,
    loading,
    error,
    refetch,
  } = useProducts('all');

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section id="products" className="py-16 sm:py-20 bg-slate-50/50">
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
            مجموعة متكاملة من الدهانات والمواد عالية الجودة لكل احتياجاتك
          </p>
        </div>

        {/* Loading Skeleton State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm animate-pulse space-y-3"
              >
                <div className="aspect-square bg-slate-200 rounded-xl" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-8 w-8 bg-slate-200 rounded-full mr-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="max-w-md mx-auto text-center py-12 px-4 bg-white rounded-2xl shadow-sm border border-red-100">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">تعذر تحميل قائمة المنتجات</h3>
            <p className="text-sm text-slate-500 mb-4">{error}</p>
            <Button variant="primary" size="sm" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 ml-2" />
              إعادة المحاولة
            </Button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {/* only 6 products */}
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 font-medium">لا توجد منتجات متطابقة مع التصنيف المختار.</p>
          </div>
        )}
      </div>

      {/* Product Quick-View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-rtl">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-right overflow-hidden">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-40 h-40 sm:w-48 sm:h-48 shrink-0 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="orange" size="sm">
                    {selectedProduct.tag || 'منتج معتمد'}
                  </Badge>
                  <span className="text-xs text-slate-400">تقييم: ★ {selectedProduct.rating}</span>
                </div>

                <h3 className="text-2xl font-black text-brand-navy">
                  {selectedProduct.title}
                </h3>
                <p className="text-sm font-semibold text-brand-orange">
                  {selectedProduct.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {selectedProduct.features && (
                  <ul className="space-y-1.5 pt-1">
                    {selectedProduct.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">السعر التقديري للعبوة</span>
                <span className="text-xl font-black text-slate-900">
                  {formatCurrency(selectedProduct.price)}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to={`/products/${selectedProduct.id}`}
                  onClick={() => setSelectedProduct(null)}
                  className="text-xs font-bold text-slate-600 hover:text-brand-orange py-2 px-3 rounded-lg border border-slate-200 hover:border-brand-orange transition-colors"
                >
                  عرض التفاصيل بالكامل
                </Link>

                <Button
                  variant="primary"
                  size="md"
                  showArrow
                  className="flex-1 sm:flex-initial"
                  onClick={() => {
                    const prod = selectedProduct;
                    setSelectedProduct(null);
                    onRequestQuote && onRequestQuote(prod);
                  }}
                >
                  طلب استشارة وكميات
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsList;
