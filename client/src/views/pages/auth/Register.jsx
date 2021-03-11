import React, { useState, useEffect } from 'react';
import { Alert, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import authCookies from '../../../util/authCookies';

const REGISTER_USER = gql`
  mutation register($email: String!, $password: String!, $username: String!) {
    register(email: $email, password: $password, username: $username) {
      token
      refreshToken
    }
  }
`;

function Register() {
  let history = useHistory();

  //check if user is already logged in
  useEffect(() => {
    if (authCookies.getAuthCookies()) {
      history.push('/');
    }
  }, []);

  const { register, handleSubmit } = useForm();
  const [confirmError, setConfirmError] = useState(false);

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    update(_, result) {
      //DATA IS HERE
      authCookies.setRegisterAuthCookies(result);
      history.push('/');
      // setSuccess(true);
    },
    onError(err) {
      console.log(err);
    },
  });

  const onSubmit = (sdata) => {
    console.log(sdata);
    if (sdata.password !== sdata.confirmPassword) return setConfirmError(true);
    setConfirmError(false);
    registerUser({ variables: { email: sdata.email, password: sdata.password, username: sdata.username } });
  };

  return (
    <div className="loginBody">
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Register</h5>
                {/* ////////// */}
                {error && <Alert color="danger">{error.message}</Alert>}
                {confirmError && <Alert color="danger">Passwords don't match</Alert>}

                <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-label-group">
                    <input
                      id="inputUsername"
                      className="form-control"
                      placeholder="Username"
                      required
                      autoFocus
                      name="username"
                      ref={register}
                    />
                    <label htmlFor="inputUsername">Username</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                      autoFocus
                      name="email"
                      ref={register}
                    />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                      name="password"
                      ref={register}
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputCPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      required
                      name="confirmPassword"
                      ref={register}
                    />
                    <label htmlFor="inputCPassword">Confirm Password</label>
                  </div>

                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                      name="agree"
                      ref={register}
                      required
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                      Do you agree to our TOS?
                    </label>
                  </div>

                  {loading === true ? (
                    // loading
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" disabled type="submit">
                      <Spinner size="sm" color="secondary" />
                      Register
                    </button>
                  ) : (
                    // not loading
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                      Register
                    </button>
                  )}
                  <p style={{ textAlign: 'center', paddingTop: '25px' }}>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </form>

                {/* ------- */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
