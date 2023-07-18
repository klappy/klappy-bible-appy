import { useState, useEffect } from 'react';
import { getCatalog as _getCatalog } from '../core/catalog';

function useCatalog({ stage, catalog: _catalog = [] } = {}) {
  const [queueFetch, setQueueFetch] = useState(false);
  const [catalog, setCatalog] = useState(_catalog);
  const [loading, setLoading] = useState(false);

  const getCatalog = async ({ stage }) => {
    setLoading(true);
    const data = await _getCatalog({ stage });
    setCatalog(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!queueFetch) return;
    setQueueFetch(false);
    getCatalog({ stage });
  }, [queueFetch, stage]);

  useEffect(() => {
    setQueueFetch(true);
  }, [stage]);

  return { catalog, loading };
}

export default useCatalog;
