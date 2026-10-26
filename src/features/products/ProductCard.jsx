import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const ProductCard = ({ product, onSelect }) => {
  return (
    <div
      onClick={() => onSelect && onSelect(product)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1.5"
    >
      <div>
        {/* Product Image Frame */}
        <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
            loading="lazy"
          />
          {product.tag && (
            <div className="absolute top-3 right-3 bg-brand-navy/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
              {product.tag}
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-5 text-right">
          <div className="flex items-center gap-2 mb-1.5">
            {/* Orange vertical accent line as seen in design */}
            <span className="w-1.5 h-4 bg-brand-orange rounded-full inline-block" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
              {product.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {product.subtitle}
          </p>
        </div>
      </div>

      {/* Action Area / Circular Orange Arrow Button */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex items-center justify-end">
        <button
          type="button"
          aria-label={`عرض تفاصيل ${product.title}`}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-md group-hover:bg-brand-orange-hover group-hover:scale-110 transition-all duration-200"
        >
          {/* In RTL, the flow direction forward is left */}
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform group-hover:-translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
