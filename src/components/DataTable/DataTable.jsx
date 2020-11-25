import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './DataTable.scss';

const sizePerPageRenderer = ({
	options,
	currSizePerPage,
	onSizePerPageChange
}) => (
	<div className="btn-group" role="group">
		{
			options.map((option) => {
				const isSelect = currSizePerPage === `${option.page}`;
				return (
					<button
						key={ option.text }
						type="button"
						onClick={ () => onSizePerPageChange(option.page) }
						className={ `btn ${isSelect ? 'btn-primary' : 'btn-default'}` }
					>
						{ option.text }
					</button>
				);
			})
		}
	</div>
);

const DataTable = ({ columns, data, onTableChange, sizePerPage, totalSize, page, onSizePerPageChange, rowEvents, defaultSort }) => {
	const options = {
		sizePerPageRenderer,
		page,
		sizePerPage,
		totalSize,
		onSizePerPageChange,
		showTotal: false,
		paginationSize: 7,
		// hideSizePerPage: true,
	};

	return (
		<span className="bootstrap-table-custom" >
			<BootstrapTable
				remote
				keyField='_id'
				data={data}
				defaultSort={defaultSort}
				columns={columns}
				pagination={ paginationFactory(options) }
				onTableChange={ onTableChange }
				onSizePerPageChange= {onSizePerPageChange}
				headerClasses="header-class"
				rowEvents = {rowEvents}
			/>
		</span>
	);
};

DataTable.propTypes = {
	columns: PropTypes.array,
	data: PropTypes.array,
	onTableChange: PropTypes.func,
	sizePerPage: PropTypes.number,
	onSizePerPageChange: PropTypes.func,
	rowEvents: PropTypes.func,
	totalSize: PropTypes.number,
	page: PropTypes.number,
};

export default DataTable;
