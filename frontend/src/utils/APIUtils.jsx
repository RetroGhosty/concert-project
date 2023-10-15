// export const apiBaseUrl = `http://localhost:8000`;
// export const mediaBaseUrl = `http://localhost:8000`;
// export const apiBaseUrl = `https://${process.env.REACT_APP_API_URL}`
// export const mediaBaseUrl = `https://talipapa-bucket.s3.amazonaws.com`

export const apiBaseUrl = `http://${import.meta.env.REACT_APP_API_URL}`;
export const mediaBaseUrl = `https://${import.meta.env.REACT_APP_API_URL}`;
export const apiStaticURL = `/media/`;
