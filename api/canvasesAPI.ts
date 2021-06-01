import axios from 'axios';
import { baseUrl, userAuthRequestHeader } from './baseRequest';
import { Canvas } from 'models/canvases';

const url = baseUrl + 'api/v1/canvases';
export async function getCanvases(): Promise<Canvas[] | null> {
  const userAuthHeader = await userAuthRequestHeader();
  if (!userAuthHeader) {
    return null;
  }

  try {
    const canvasesResponse = await axios.get<Canvas[]>(url,{
      headers: userAuthHeader
    });
    return canvasesResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function createCanvas(title): Promise<Canvas> {
  const userAuthHeader = await userAuthRequestHeader();
  if (!userAuthHeader) {
    return null;
  }

  try {
    const canvasResponse = await axios.post<{'canvas': Canvas}>(
      url,
      {
        canvas: { title: title }
      },
      {
        headers: userAuthHeader
      }
    );
    return canvasResponse.data.canvas;
  } catch (err) {
    throw err.response.data.errors.toString();
  }
}

export async function getCanvas(canvasId): Promise<Canvas | null> {
  const userAuthHeader = await userAuthRequestHeader();
  if (!userAuthHeader) {
    return null;
  }

  try {
    const canvasResponse = await axios.get<{ canvas: Canvas }>(
      url + `/${canvasId}`,
      {
        headers: userAuthHeader
      }
    );
    return canvasResponse.data.canvas;
  } catch (err) {
    throw err;
  }
}

export async function patchCanvas(canvasId, title): Promise<Canvas> {
  const userAuthHeader = await userAuthRequestHeader();
  if (!userAuthHeader) {
    return null;
  }

  try {
    const canvasResponse = await axios.put<{ canvas: Canvas }>(
      url + `/${canvasId}`,
      {
        canvas: { title: title }
      },
      {
        headers: userAuthHeader
      }
    );
    return canvasResponse.data.canvas;
  } catch (err) {
    throw err.response.data.errors.toString();
  }
}

