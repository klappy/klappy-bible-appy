import Catalog from './components/catalog/Catalog';

export default function Layout() {
  // "prod" (default); "preprod", "draft", "latest" -default branch (e.g. master)
  const stage = 'prod';

  return (
    <div id="layout">
      <Catalog stage={stage} />
    </div>
  );
}
