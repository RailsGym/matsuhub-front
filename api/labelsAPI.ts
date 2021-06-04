import axios from 'axios';
import { baseUrl, userAuthRequestHeader } from './baseRequest';
import { Label } from 'models/labels';

const url = baseUrl + 'api/v1/canvases';
export async function createLabel(title, areaId, canvasId): Promise<Label> {
  const userAuthHeader = await userAuthRequestHeader();
  if (!userAuthHeader) {
    return null;
  }

  try {
    const labelResponse = await axios.post<{ 'label': Label }>(
      url + `/${canvasId}/` + 'labels',
      {
        label: {
          title: title,
          area_id: areaId
        }
      },
      {
        headers: userAuthHeader
      }
    );
    return labelResponse.data.label;
  } catch (err) {
    throw err.response.data.errors.toString();
  }
}
