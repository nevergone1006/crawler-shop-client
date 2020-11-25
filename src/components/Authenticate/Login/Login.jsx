import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {
	CardImg, CardTitle,
	Button, FormGroup, Row, Col, Spinner,
} from 'reactstrap';
import { USER_STORE } from 'constants/stores.const';

import logo from 'images/logo.svg';
import LoginModel from './login.model';
import './style.scss';
import { REQUEST_STATUS } from 'constants/common.const';

@inject(USER_STORE)
@observer
class Login extends Component {
	constructor(props) {
		super();
		this.model = new LoginModel();
		this.userStore = props[USER_STORE];
	}

	submitSignin = () => {
		const { username, password } = this.model;
		this.userStore.doLogin(username, password);
	}

	render() {
		const { username, password, set } = this.model;
		return (
			<div className="login-wrapper">
				<CardImg top src={logo}/>
				<CardTitle>Đăng Nhập</CardTitle>
				{/* <div className="social-actions">
					<Button color="primary" className="facebook-button">
						<span className="fa fa-facebook" />
						<span className="social-title">
							Login with Facebook
						</span>
					</Button>
					<Button outline color="danger">
						<span className="fa fa-google" />
						<span className="social-title">
							Login with Google
						</span>
					</Button>
				</div>
				<div className="word-seperator">
					<span className="word-separator-line"></span>
					<span className="word-separator-content color-light-gray">Or connect with</span>
					<span className="word-separator-line"></span>
				</div> */}
				<AvForm onValidSubmit={this.submitSignin}>
					<FormGroup>
						<AvField
							label={<span>Tên tài khoản <b>*</b></span>}
							type="text"
							name="username"
							id="usernameInput"
							placeholder="Nhập tên tài khoản"
							value={username}
							onChange={(event) => {
								set({
									username: event.target.value,
								});
								this.userStore.set({ state: REQUEST_STATUS.NOT_AUTHENTICATED });
							}}
							errorMessage="Vui lòng nhập tên tài khoản"
							validate={{
								required: {value: true},
							}}
						/>
					</FormGroup>
					<FormGroup>
						<AvField
							label={<span>Mật khẩu <b>*</b></span>}
							type="password"
							name="password"
							id="passwordInput"
							placeholder="Nhập Mật khẩu"
							value={password}
							onChange={(event) => {
								set({
									password: event.target.value,
								});
								this.userStore.set({ state: REQUEST_STATUS.NOT_AUTHENTICATED });
							}}
							errorMessage="Vui lòng nhập Mật khẩu"
							validate={{
								required: {value: true},
							}}
						/>
					</FormGroup>
					
					<Row>
						<Col md={12}>
							<Button color="primary"
								// onClick={this.submitSignin}
							>
								Đăng Nhập
								{this.userStore.state === REQUEST_STATUS.PENDING && (<Spinner style={{ marginLeft: 20 }} size="sm" color="light" />)}
							</Button>
							{/* <div className="action-group">
								<a href="sign-up"> Sign up </a>
								<a href="reset-password"> I forgot my password </a>
							</div> */}
						</Col>
					</Row>

					{this.userStore.state === REQUEST_STATUS.ERROR && (
						<p className="text-danger">
							Lỗi đăng nhập. Sai tên tài khoản hoặc mật khẩu.
						</p>
					)}
				</AvForm>
			</div>
		);
	}
}

export default Login;
