import { useMemo } from 'react';
import { getOwnersFromCatalog } from '../core/catalog';

function useOwners({ catalog = [], language }) {
  const owners = useMemo(() => {
    return getOwnersFromCatalog({ catalog, language });
  }, [catalog, language]);

  return { owners };
}

export default useOwners;
