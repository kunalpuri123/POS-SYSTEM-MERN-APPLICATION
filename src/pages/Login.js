import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {message} from 'antd'
import axios from 'axios';
import{useDispatch} from 'react-redux';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      dispatch({ type: 'SHOW_LOADING' });
      const res = await axios.post('http://localhost:8080/api/users/login' , values);
      message.success('User Login Succesfully.')
      console.log(res.data)
      localStorage.setItem('auth',JSON.stringify(res.data));
      navigate('/');
    
   
  } catch (error) {
    message.error('Something went wrong.')
      console.log(error);
      console.log(values)
  } finally {
      dispatch({ type: 'HIDE_LOADING' });
  }
  };
  useEffect (() =>{
    if(localStorage.getItem("auth")){
      localStorage.getItem('auth');
      navigate('/');
    }
  },[navigate]);

  return (
    <>
      <div className='register'>
        <div className='register-form'>
          <h1>POS APP</h1>
          <h3>Login Page</h3>
          <Form layout='vertical' onFinish={handleSubmit}>
            <Form.Item name='userId' label='User ID'>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password'>
              <Input type='password' />
            </Form.Item>
            <div className='d-flex justify-content-between'>
              <p>
                Not a User Please{' '}
                <Link to='/register'>Register Here!</Link>
              </p>
              <Button type='primary' htmlType='submit' shape='round' className='custom-button'>
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
