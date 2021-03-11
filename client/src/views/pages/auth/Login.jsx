import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Alert, Spinner } from 'reactstrap';
// import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";
import { useMutation, gql } from '@apollo/client';

import authCookies from "../../../util/authCookies";

import './login.css';

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`;

function Login() {
  let history = useHistory();

  //check if user is already logged in
  useEffect(()=>{
    if(authCookies.getAuthCookies()){
      history.push("/");
    }
  }, []);

  const { register, handleSubmit } = useForm();
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    update(_, result) {
      //DATA IS HERE
      authCookies.setLoginAuthCookies(result);
      history.push("/");
    },
    onError(err){}
  });

  const onSubmit = sdata => {
    console.log(sdata);
    loginUser({ variables: { email: sdata.email, password: sdata.password } });
  };

  return (
    <>
      <div className="loginBody">
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Login</h5>
                  {error && <Alert color="danger">{error.message}</Alert>}
                  <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
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
                    {loading === true ? (
                      // loading
                      <button className="btn btn-lg btn-primary btn-block text-uppercase" disabled type="submit">
                        <Spinner size="sm" color="secondary" />
                        Login
                      </button>
                    ) : (
                      // not loading
                      <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                        Login
                      </button>
                    )}

                    <p style={{ textAlign: 'center', paddingTop: '25px' }}>
                      Don't have an account? <Link to="/register">Register</Link>
                    </p>
                  </form>

                  {/* ------- */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
