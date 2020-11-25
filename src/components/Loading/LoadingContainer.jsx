import React from 'react';
import { Spinner } from 'reactstrap';
import './LoadingContainer.scss';

class Loading extends React.Component {
	render() {
		return (
			<div className="loading-component">
				<Spinner color="secondary" size="xl" />
			</div>
		);
	}
}

export default Loading;