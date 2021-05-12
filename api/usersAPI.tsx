import axios from 'axios'
import {User} from "models/users";
import  {baseUrl, userAuthRequestHeader} from "./baseRequest";

export async function getMe(): Promise<User | null> {
  const url = baseUrl + '/api/v1/users/me';
  const userAuthHeader = await userAuthRequestHeader();
  if(!userAuthHeader) {
    return null;
  }

  const response = await axios.get<{'user': User}>(
    url,
    {
      headers: userAuthHeader
    }
  )
  return response.data.user

}