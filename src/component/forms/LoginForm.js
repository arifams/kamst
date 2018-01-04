import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messeges/InlineError';

class LoginForm extends React.Component {
  state = {
  	data: {
  	  email: '',
  	  password: ''
  	},
  	loading: false,
  	errors: {}
  };

  onChange = e => 
    this.setState({ 
      data: { ...this.state.data, [e.target.name]: e.target.value } 
    });
  
  // show errors if there are any on validation
  onSubmit = () => {
  	const errors = this.validate(this.state.data);
  	this.setState({ errors });
  	if (Object.keys(errors).length === 0) {
      // adding loading from semantic UI if there is something happened
      this.setState({ loading: true });
  	  this.props
      // submitting user data
      .submit(this.state.data)
      // catching error and render it to page
      .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
  	}
  }

  // validation function
  validate = (data) => {
  	const errors = {};
  	// show erorrs on email and password input
  	if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
  	if (!data.password) errors.password = "No blank password";
  	return errors;
  }

  render() {
  	const { data, errors, loading } = this.state;
  	
  	return (
  	  <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}  	    <Form.Field error={!!errors.email}>
  	      <label htmlFor="email">Email</label>
  	      <input 
  	        type="email" 
  	        id="email" 
  	        name="email" 
  	        placeholder="my@email.com" 
  	        value={data.email}
  	        onChange={this.onChange}
  	      />
  	      { errors.email && <InlineError text={errors.email} /> }
  	    </Form.Field>
  	    <Form.Field error={!!errors.password}>
  	      <label htmlFor="password">Password</label>
  	      <input 
  	        type="password" 
  	        id="password" 
  	        name="password" 
  	        placeholder="password" 
  	        value={data.password}
  	        onChange={this.onChange}
  	      />
  	      { errors.password && <InlineError text={errors.password} /> }
  	    </Form.Field>
  	  	<Button primary>Login</Button>
  	  </Form>
  	);
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;