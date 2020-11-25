import Loadable from 'react-loadable';
import LoaderComponent from 'components/loader-component/LoaderComponent';

const DynamicImport = (Component, LoadingComponent) => Loadable({
	loader: Component,
	loading: LoadingComponent ? LoadingComponent : LoaderComponent,
});

export default DynamicImport;
