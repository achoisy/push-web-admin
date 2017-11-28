import React, { Component } from 'react';
import { Fields, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Label } from 'semantic-ui-react'

import * as actions from '../../actions';
import logo from './logo.png';


class Signin extends Component {

  static renderLoginField({ login, password, error }) {
console.log('renderLoginField', error);

    return(
      <Segment stacked>
        <Form.Input
          {...login.input}
          error={login.meta.error ? true : false }
          fluid
          icon='user'
          iconPosition='left'
          placeholder='identifiant'
        />

        <Form.Input
          {...password.input}
          error={password.meta.error ? true : false }
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Mot de passe'
          type='password'
        />
        <Message negative hidden={ !error.status }>
          <Message.Header>Desole, il y a une erreur de connexion !</Message.Header>
          <p>{ error.msg }</p>
        </Message>
        <Button color='teal' fluid size='large' type='submit'>Login</Button>
      </Segment>
    );
  }

  handleFormSubmit({ login, password }) {
    console.log(login, password);
    this.props.signinUser({ login, password }, this.props.history); // action creator call
  }

  render() {
    const {history, error={status: false, msg:''}, handleSubmit, fields: { login, password }} = this.props;

    return (
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src={logo} />
              {' '}Connexion a votre compte
            </Header>
            <Form size='large' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Fields
                names={[ 'login', 'password' ]}
                component={Signin.renderLoginField}
                props={{error}}
              />
            </Form>
            <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}


function validate({ login, password }) {
  const errors = {};

  if (!login) {
    errors.login = 'Veuillez entrer votre identifiant';
  }

  if (!password) {
    errors.password = "Veuillez entrer votre mot de passe";
  }

  return errors;
};

function mapStateToProps(state) {
  return { error: state.auth.error };
};

export default withRouter(reduxForm({
  form: 'signin',
  fields: ['login', 'password'],
  validate,
})(
  connect(mapStateToProps, actions)(Signin)
));
