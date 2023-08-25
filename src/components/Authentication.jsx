import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import Input from './Input';
import { AUTH } from '../constants/actionTypes';
import { useNavigate } from 'react-router-dom';
import { signup, signin } from '../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Authentication = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigateTo));
    } else {
      dispatch(signin(formData, navigateTo));
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  }

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  }

  const onGoogleSuccess = async (res) => {
    const token = res?.credential
    const result = jwtDecode(token);

    try {
      dispatch({ type: AUTH, data: { result, token } });

      navigateTo('/');
    } catch (error) {
      console.log(error);
    }
  }

  const onGoogleError = (error) => {
    console.log(error);
    console.log('Google sign in was unsuccessful. Try Again.')
  }

  return (
    <div className='relative flex flex-col justify-center items-center my-6 mx-2'>
      <div className="w-1/2 h-screen fixed left-[-48px] top-[-56 px] rounded-full bg-gradient-to-l from-colorDB to to-colorB transform rotate-45"></div>
      <div className="w-1/2 h-screen fixed right-[48px] top-[56px] rounded-full bg-gradient-to-l from-colorDB to to-colorB transform rotate-135"></div>
      <div className='z-20 border border-colorDB w-full top-10 max-w-md mx-2 p-6 bg-white rounded-3xl shadow-md'>
        <div className='flex items-center justify-center text-green-600 pb-2'>
          <ion-icon size='small' name="lock-closed-outline" className='text-green-500 text-4xl'></ion-icon>
        </div>
          <div className='flex justify-between items-center cursor-pointer text-md bg-colorG mx-8 rounded-3xl m-2'>
            <div onClick={() => setIsSignup(true)} className={`flex text-colorDG rounded-3xl p-2 w-1/2 items-center justify-center ${isSignup ? 'bg-green-500 text-white' : ''}`}>
              SignUp
            </div>
            <div onClick={() => setIsSignup(false)} className={`flex text-colorDG rounded-3xl p-2 w-1/2 items-center justify-center ${!isSignup ? 'bg-green-500 text-white' : ''}`}>
              Sign In
            </div>
          </div>
        <form className='mt-8' onSubmit={handleSubmit}>
          <div className='mt-10'>
            {isSignup && (
              <div className="grid md:grid-cols-2 md:gap-6">
                <Input name='firstName' labelName='First Name' onChange={handleChange} autoFocus type='text' />
                <Input name='lastName' labelName='Last Name' onChange={handleChange} autoFocus type='text' />
              </div>
            )}
            <Input name='email' labelName='Email Address' onChange={handleChange} autoFocus type='email' />
            <Input name='password' labelName='Password' onChange={handleChange} autoFocus type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && (
              <Input name='confirmPassword' labelName='Repeat Password' onChange={handleChange} autoFocus type='password' />
            )}
          </div>
          <div className='flex justify-center'>
            <button type='submit' className='mb-5 mx-2 text-white bg-colorDB hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className='flex w-full justify-center items-center'>
          <GoogleLogin onSuccess={onGoogleSuccess} onError={onGoogleError} />
        </div>
      </div>
    </div>
  )
}

export default Authentication