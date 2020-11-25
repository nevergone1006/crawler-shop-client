import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { AvForm, AvField } from 'availity-reactstrap-validation';

// reactstrap components
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	FormGroup,
	Input,
	Row,
	Col
} from 'reactstrap';
import { USER_ROLES } from 'constants/common.const';
import './user-form.scss';
import AccountInfo from 'models/EditAccount/accountInfo.model';

@observer
class UserForm extends React.Component {
	constructor(props) {
		super();
		this.accountInfo = new AccountInfo({userData : props.selectedItem});
	}

	onSubmitForm = (e) => {
		this.accountInfo.setProperties({ errors: null });
		e.preventDefault();
		this.accountInfo.onUpdateAccount()
			.then(() => {
				this.props.cancelModal(true);
			})
			.catch((errors) => {
				this.accountInfo.setProperties({ errors });
			});
	}

	render() {
		const {
			currentUser, modal,
			cancelModal,
		} = this.props;
		const { 
			errors, password, confirmPassword,
			username, role, name, email, storeRole,
			phone, isUpdate, onAccountInfoChange,
		} = this.accountInfo;
		return (
			<Modal isOpen={modal} toggle={cancelModal} className="card-user from-user ">
				<ModalHeader>
					{isUpdate ? 'Sửa thông tin tài khoản' : 'Tạo tài khoản'}
				</ModalHeader>
				<ModalBody>
					<AvForm onValidSubmit={this.onSubmitForm}>
						<Row>
							<Col md="6">
								<FormGroup>
									<label>Tên tài khoản <b>*</b></label>
									<AvField
										// placeholder="Username"
										type="text"
										name="username"
										disabled={isUpdate}
										onChange={onAccountInfoChange}
										value={username}
										errorMessage="Vui lòng nhập tên tài khoản"
										validate={{
											required: {value: true},
										}}
									/>
								</FormGroup>
							</Col>
							<Col className="pl-1" md="6">
								<FormGroup>
									<label>Vai trò <b>*</b></label>
									<Input
										type="select"
										name="role"
										disabled={currentUser.role !== USER_ROLES.SUPERADMIN || storeRole === USER_ROLES.SUPERADMIN}
										onChange={onAccountInfoChange}
										value={role}
									>
										<option value={USER_ROLES.NORMAL}>Normal</option>
										<option value={USER_ROLES.ADMIN}>Admin</option>
										<option value={USER_ROLES.SUPERADMIN}>Super Admin</option>
									</Input>
									
								</FormGroup>
							</Col>
						</Row>
						
						{ !isUpdate && (
							<Row>
								<Col md="6">
									<FormGroup>
										<label>Mật khẩu <b>*</b></label>
										<AvField
											// placeholder="password"
											name="password"
											type="password"
											onChange={onAccountInfoChange}
											value={password}
											errorMessage="Vui lòng nhập mật khẩu"
											validate={{
												required: {value: true},
											}}
										/>
									</FormGroup>
								</Col>
								<Col className="pl-1" md="6">
									<FormGroup>
										<label>Nhập lại mật khẩu</label>
										<AvField
											// placeholder="confirm password"
											name="confirmPassword"
											type="password"
											onChange={onAccountInfoChange}
											value={confirmPassword}
											
											validate={{
												required: {value: true, errorMessage: 'Vui lòng nhập lại mật khẩu'},
												match: {value: 'password' , errorMessage: 'Nhập sai mật khẩu'},
											}}
										/>
									</FormGroup>
								</Col>
							</Row>
						)}

						<Row>
							<Col md="12">
								<FormGroup>
									<label>Họ và Tên <b>*</b></label>
									<AvField
										// placeholder="Name"
										name="name"
										type="text"
										onChange={onAccountInfoChange}
										value={name}
										validate={{
											required: {value: true, errorMessage: 'Nhập họ và tên'},
										}}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="6">
								<FormGroup>
									<label>Email <b>*</b></label>
									<AvField
										// placeholder="Email"
										type="text"
										name="email"
										onChange={onAccountInfoChange}
										value={email}
										validate={{
											required: { value: true, errorMessage: 'Vui lòng nhập Email' },
											email: { value: true, errorMessage: 'Email sai định dạng' },
										}}
									/>
								</FormGroup>
							</Col>
							<Col className="pl-1" md="6">
								<FormGroup>
									<label>
										SĐT
									</label>
									<Input
										// placeholder="Phone"
										name="phone"
										onChange={onAccountInfoChange}
										value={phone}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="6" className="card-user-submit">
								<Button
									className="btn-round"
									color="primary"
									type="submit"
								>
									{ isUpdate ? 'Cập nhật' : 'Tạo'}
								</Button>
							</Col>
							<Col md="6" className="pl-1 card-user-cancel">
								<Button
									className="btn-round"
									color="danger"
									onClick={cancelModal}
								>
									Huỷ
								</Button>
							</Col>
						</Row>
						{errors && (
							<p className="text-danger">
								{ errors.message }
							</p>
						)}
					</AvForm>
				</ModalBody>
			</Modal>
		);
	}
}

UserForm.propTypes = {
	modal: PropTypes.bool,
	onUpdateAccount: PropTypes.func,
	cancelModal: PropTypes.func,
	selectedItem: PropTypes.object,
	currentUser: PropTypes.object,
	onAccountInfoChange: PropTypes.func,
	isUpdate: PropTypes.bool,
};

export default UserForm;
