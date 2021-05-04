import Cookie from "universal-cookie";
export const baseUrl: string = process.env.NEXT_PUBLIC_RESTAPI_URL || "";
export const userAuthRequestHeader = async () => {

  const cookie = new Cookie()
  const accessToken = cookie.get('access-token')
  const client = cookie.get('client')
  const uid = cookie.get('uid')
  return {
    'access-token': accessToken,
    client: client,
    uid: uid
  }
}