
import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ShopStore from 'models/ShopList';
import { debounce } from 'lodash';

import './shop-list.scss';

// reactstrap components
import {
	Card,
	CardHeader,
	CardBody,
	Row,
	Col,
	Button,
} from 'reactstrap';
import DataTable from 'components/DataTable/DataTable';
import { fullURLBase } from 'config/default.conf';

@observer
class Shop extends React.Component {
	constructor() {
		super();

		this.store = new ShopStore();
	}

	render() {
		const { shopList, exportData, handleChangePage, handleOnSizePerPageChange, limit, total, currentPage, isLoadingExport } = this.store;
		const data = toJS(shopList);
		return (
			<>
				<div className="content shop-list">
					<Row>
						<Col md="12">
							<Card>
								<CardHeader className='edit-header'>
									<span className="total-text text-muted">
										Có <b>{total}</b> cửa hàng.
									</span>
									<Button
										block
										color="primary"
										disabled={isLoadingExport}
										onClick={debounce(exportData, 500)}
										href={`${fullURLBase}/export-files`}
										target="_blank"
									>
										Xuất file
									</Button>
								</CardHeader>
								<CardBody
									className="shop-list-body"
								>
									<DataTable
										columns={ShopStore.columns}
										data={data}
										onTableChange={handleChangePage}
										onSizePerPageChange={handleOnSizePerPageChange}
										sizePerPage={limit}
										totalSize={total}
										page={currentPage}
										// rowEvents={{
										// 	onClick: (...rest) => {
										// 		console.log('rest: ', rest);
										// 		alert('go to detail');
										// 	}
										// }}
									/>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default Shop;
