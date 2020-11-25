import React from 'react';
import { observer, inject } from 'mobx-react';
import editAccount from 'models/EditAccount';
import { toJS } from 'mobx';

import './edit-account.scss';

// reactstrap components
import {
	Card,
	CardHeader,
	CardBody,
	Table,
	Row,
	Col,
	Button,
	Pagination,
	PaginationItem,
	PaginationLink,
} from 'reactstrap';
import UserForm from './UserForm';
import { USER_ROLES } from 'constants/common.const';
import { USER_STORE } from 'constants/stores.const';

@inject(USER_STORE)
@observer
class EditAccount extends React.Component {
	constructor(props) {
		super();

		this.store = new editAccount();
		this.userStore = props[USER_STORE];
		this.pageSize = 10;
	}

	renderPagination = () => {
		const { currentPage, pagesCount, handleChangePage } = this.store;
		return (
			<Pagination aria-label="Page navigation example">
				<PaginationItem disabled={currentPage <= 0}>
					
					<PaginationLink
						onClick={e => handleChangePage(e, currentPage - 1)}
						previous
						href="#"
					/>
					
				</PaginationItem>
	
				{[...Array(pagesCount)].map((page, i) => 
					<PaginationItem active={i === currentPage} key={i}>
						<PaginationLink onClick={e => handleChangePage(e, i)} href="#">
							{i + 1}
						</PaginationLink>
					</PaginationItem>
				)}
	
				<PaginationItem disabled={currentPage >= pagesCount - 1}>
					
					<PaginationLink
						onClick={e => handleChangePage(e, currentPage + 1)}
						next
						href="#"
					/>
					
				</PaginationItem>
				
			</Pagination>
		);
	}

	showUpdateButtonActions = (item) => {
		const currentUser = this.userStore.user;
		if (currentUser.role === USER_ROLES.SUPERADMIN) {
			return (item.role !== USER_ROLES.SUPERADMIN) || (currentUser._id === item._id);
		}
		if (currentUser.role === USER_ROLES.ADMIN) {
			return (item.role === USER_ROLES.NORMAL) || (currentUser._id === item._id);
		}
		return currentUser._id === item._id;
	}

	showDeleteButtonActions = (item) => {
		const currentUser = this.userStore.user;
		if (item.role === USER_ROLES.SUPERADMIN || currentUser._id === item._id) {
			return false;
		}
		if (item.role === USER_ROLES.ADMIN) {
			return (currentUser.role === USER_ROLES.SUPERADMIN);
		}
		return (currentUser.role === USER_ROLES.SUPERADMIN || currentUser.role === USER_ROLES.ADMIN);
	}

	render() {
		const {
			userAccount, handleDeleteAccount, onUpdateAccount,
			toggleModal, selectedItem, modalOpen, cancelModal,
		} = this.store;
		const data = toJS(userAccount);
		return (
			<>
				<div className="content">
					<Row>
						<Col md="12">
							<Card>
								<CardHeader className='edit-header'>
									<Button
										block
										color="primary"
										onClick={() => toggleModal()}
									>
										Thêm
									</Button>
								</CardHeader>
								<CardBody>
									<Table responsive>
										<thead className="text-primary">
											<tr>
												<th>Tên</th>
												<th>Tên tài khoản</th>
												<th>Vai trò</th>
												<th>Email</th>
												<th>Điện thoại</th>
												<th>Sửa thông tin</th>
											</tr>
										</thead>
										<tbody>
											{
												data.map((item) => (
													<tr key={item._id}>
														<td> {item.name} </td>
														<td> {item.username} </td>
														<td> {item.role} </td>
														<td> {item.email} </td>
														<td> {item.phone} </td>
														<td className='action-zone'> 
															{this.showUpdateButtonActions(item) && (
																<Button
																	block
																	color="primary"
																	onClick={() => toggleModal(item, true)}
																>
																	Sửa
																</Button>
															)}
															{this.showDeleteButtonActions(item) && (
																<Button
																	block
																	color="danger"
																	onClick={() => handleDeleteAccount(item._id)}
																>
																	Xoá
																</Button>
															)}
																		
														</td>
													</tr>
												))
											}
										</tbody>
									</Table>
								</CardBody>
							</Card>
						</Col>
					</Row>

					{/* { userAccount.length > 0 && this.renderPagination() } */}
				</div>

				{modalOpen && <UserForm
					modal
					cancelModal={cancelModal}
					onUpdateAccount={onUpdateAccount}
					selectedItem={toJS(selectedItem)}
					currentUser={this.userStore.user}
				/>}
			</>
		);
	}
}

export default EditAccount;
