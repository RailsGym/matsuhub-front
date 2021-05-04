import axios from 'axios'
import {baseUrl, userAuthRequestHeader} from "./baseRequest";
import { Canvas } from '../models/canvases';

export async function getCanvases(): Promise<Canvas[] | null> {
  const url = baseUrl + 'api/v1/canvas';
  const userAuthHeader = await userAuthRequestHeader();
  if(!userAuthHeader) {
    return null;
  }

  try {
    const canvasesResponse = await axios.get<Canvas[]>(
      url,
      {
        headers: userAuthHeader
      }
    )
    return canvasesResponse.data.canvases
  } catch (err) {
    throw err
  }
}