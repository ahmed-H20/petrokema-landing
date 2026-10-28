import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * CategoryCard Component
 * Displays a single product category card with:
 * - Numbered step badge (01, 02, 03, 04)
 * - Category showcase image with smooth zoom effect
 * - Orange vertical accent line next to title
 * - Category subtitle / description
 * - Sub-items / products pills
 * - Circular orange forward button in RTL (ArrowLeft)
 */
export const CategoryCard = ({ category, onSelect }) => {
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(category);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-2 select-none"
    >
      <div>
        {/* Category Image Frame */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />

          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
        </div>

        {/* Card Content Area */}
        <div className="p-4 sm:p-5 text-right">
          {/* Title row with orange accent bar & number pill */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-brand-orange rounded-full inline-block shrink-0 shadow-xs" />
              <h3 className="text-xl sm:text-2xl font-black text-brand-navy group-hover:text-brand-orange transition-colors">
                {category.title}
              </h3>
            </div>
            <span className="text-xs font-black text-brand-orange bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-100/80">
              {category.number}
            </span>
          </div>

          {/* Subtitle */}
          {category.subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mt-1">
              {category.subtitle}
            </p>
          )}

          {/* Items / Products List */}
          {category.items && category.items.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-slate-100">

              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-orange-50/70 border border-slate-200/70 hover:border-brand-orange/30 px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 flex items-center justify-between border-t border-slate-50">
        <span className="text-xs font-bold text-slate-400 group-hover:text-brand-orange transition-colors">
          استكشف
        </span>

        <button
          type="button"
          aria-label={`استعراض ${category.title}`}
          className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-md group-hover:bg-brand-orange-hover group-hover:scale-110 group-hover:shadow-lg transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
