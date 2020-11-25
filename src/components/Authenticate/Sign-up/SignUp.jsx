import React, { Component } from 'react';
import {
	CardImg, CardTitle,
	Button, FormGroup,
	Input, Form,
	Row, Col,
} from 'reactstrap';

import logo from 'images/logo.svg';
import './sign-up-style.scss';

export default class Login extends Component {
	render() {
		return (
			<div className="sign-up-wrapper">
				<CardImg top src={logo}/>
				<CardTitle>Start your free trial</CardTitle>
				<div className="social-actions">
					<Button color="primary" className="facebook-button">
						<span className="fa fa-facebook" />
						<span className="social-title">
							Continue with Facebook
						</span>
					</Button>
					<Button outline color="danger">
						<span className="fa fa-google" />
						<span className="social-title">
							Continue with Google
						</span>
					</Button>
				</div>
				<div className="word-seperator">
					<span className="word-separator-line"></span>
					<span className="word-separator-content color-light-gray">Or sign up with</span>
					<span className="word-separator-line"></span>
				</div>
				<Form>
					<FormGroup>
						<Input type="text" placeholder="Store Name" />
					</FormGroup>
					<Row form>
						<Col md={6}>
							<FormGroup>
								<Input type="email" placeholder="First Name" />
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Input type="password" id="examplePassword" placeholder="Last Name" />
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Input type="email" placeholder="Email Address" />
					</FormGroup>
					<FormGroup>
						<Input type="email" placeholder="Choose A Password" />
					</FormGroup>
					<Row>
						<Col md={12}>
							<Button color="primary">Sign Up</Button>
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