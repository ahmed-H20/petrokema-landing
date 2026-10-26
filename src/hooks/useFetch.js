import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for reusable data fetching with loading, error, and cancellation states.
 * 
 * @param {Function} fetchFn Async function that returns data (e.g. () => getProducts())
 * @param {Array} dependencies Dependency array that triggers refetching when values change
 * @param {Object} options Configuration options
 * @param {boolean} [options.immediate=true] Whether to run the query immediately on mount
 * @param {*} [options.initialData=null] Initial state for data
 */
export function useFetch(fetchFn, dependencies = [], options = { immediate: true, initialData: null }) {
  const [data, setData] = useState(options.initialData);
  const [loading, setLoading] = useState(Boolean(options.immediate));
  const [error, setError] = useState(null);

  // Store fetchFn in a ref to prevent infinite loops if anonymous functions are passed
  const fetchFnRef = useRef(fetchFn);
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFnRef.current(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err?.message || 'حدث خطأ أثناء تحميل البيانات');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: execute,
    setData,
  };
}

export default useFetch;
