import axios from 'axios'
import {User} from 'models/users';
import  {baseUrl, userAuthRequestHeader} from './baseRequest';
import Cookie from 'universal-cookie';

export async function getMe(): Promise<User | null> {
  const url = baseUrl + '/api/v1/users/me';
  const userAuthHeader = await userAuthRequestHeader();
  if(!userAuthHeader) {
    return null;
  }

  const response = await axios.get<User>(
    url,
    {
      headers: userAuthHeader
    }
  )
  return response.data
}

export async function createUser(email: string, username: string, password: string):Promise<boolean> {
  const url = baseUrl + '/api/v1/auth';
  const body = {
    email: email,
    name: username,
    password: password,
    password_confirmation: password,
  }

  try {
    await axios.post(
      url,
      body
    )
    return true
  } catch (err) {
    throw err.response.data.errors.full_messages.join('。').toString();
  }
}

export async function createSession(email: string, password: string):Promise<User | null> {
  const url = baseUrl + '/api/v1/auth/sign_in';
  const body = {
    email: email,
    password: password
  }

  try {
    const response = await axios.post<{'data': User}>(
      url,
      body
    )
    const cookie = new Cookie();
    const options = { path: '/' };
    const headers = response.headers
    cookie.set('client', headers['client'], options);
    cookie.set('access-token', headers['access-token'], options);
    cookie.set('uid', headers['uid'], options);
    return response.data.data
  } catch (err) {
    throw err
  }
}