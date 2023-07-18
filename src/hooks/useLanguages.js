import { useMemo } from 'react';
import { getLanguagesFromCatalog } from '../core/catalog';

function useLangauges({ catalog = [] }) {
  const languages = useMemo(() => {
    return getLanguagesFromCatalog({ catalog });
  }, [catalog]);

  return { languages };
}

export default useLangauges;
