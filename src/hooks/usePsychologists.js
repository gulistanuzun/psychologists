import { useCallback, useEffect, useState } from "react";
import { fetchPsychologists } from "../api/psychologists";

const PAGE = 3;

export function usePsychologists() {
  const [sort, setSort] = useState("name-asc");
  const [limit, setLimit] = useState(PAGE);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setError(null);

    fetchPsychologists(sort, limit)
      .then((rows) => {
        if (ignore) return;
        setItems(rows);
        setHasMore(rows.length === limit);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [sort, limit]);

  const loadMore = useCallback(() => setLimit((n) => n + PAGE), []);

  const changeSort = useCallback((value) => {
    setSort(value);
    setLimit(PAGE);
  }, []);

  return { items, sort, changeSort, loadMore, hasMore, isLoading, error };
}
