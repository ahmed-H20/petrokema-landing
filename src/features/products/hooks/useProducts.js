import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '@/api/products.api';

/**
 * Custom feature hook for querying products with category filters and search
 */
export function useProducts(initialCategory = 'all') {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProductsList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts({
        category: activeCategory,
        search: searchQuery,
      });
      setProducts(data);
    } catch (err) {
      setError(err?.message || 'تعذر تحميل المنتجات، يرجى إعادة المحاولة.');
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    fetchProductsList();
  }, [fetchProductsList]);

  return {
    products,
    loading,
    error,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    refetch: fetchProductsList,
  };
}

export default useProducts;
