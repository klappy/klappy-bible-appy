import { useMemo } from 'react';
import { getResourcesFromCatalog } from '../core/catalog';

function useResources({ catalog = [], language, owner }) {
  const resources = useMemo(() => {
    return getResourcesFromCatalog({ catalog, language, owner });
  }, [catalog, language, owner]);

  return { resources };
}

export default useResources;
