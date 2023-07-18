import useCatalog from '../../hooks/useCatalog';
import Languages from './Languages';
import useLanguages from '../../hooks/useLanguages';
import { CircularProgress } from '@mui/joy';

export default function Catalog({ stage }) {
  const { catalog, loading } = useCatalog({ stage });
  const { languages } = useLanguages({ catalog });

  let component = null;

  let loadingComponent = <CircularProgress />;
  let catalogComponent = (
    <div id="catalog">
      <Languages loading={loading} languages={languages} catalog={catalog} />
    </div>
  );
  let noLanguagesComponent = <div>No languages found.</div>;

  if (!languages) component = noLanguagesComponent;
  if (catalog) component = catalogComponent;
  if (loading) component = loadingComponent;

  return <div id="languages">{component}</div>;
}
