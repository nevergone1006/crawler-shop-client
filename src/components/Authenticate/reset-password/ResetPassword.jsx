import React, { Component } from 'react';
import {
	CardImg, CardTitle,
	CardSubtitle, Button,
	FormGroup, Input,
	Form, Row, Col,
} from 'reactstrap';

import logo from 'images/logo.svg';
import './reset-password-style.scss';

export default class Login extends Component {
	render() {
		return (
			<div className="reset-password-wrapper">
				<CardImg top src={logo}/>
				<CardTitle>Forgot your password?</CardTitle>
				<CardSubtitle> Input your registered email to reset password </CardSubtitle>
				<Form className="input-form">
					<FormGroup>
						<Input type="email" placeholder="Email address" />
					</FormGroup>
					<Row>
						<Col md={12}>
							<Button color="primary">Email Instruction</Button>
							<div className="action-group">
								<a href="/authenticate"> Back to login </a>
							</div>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}