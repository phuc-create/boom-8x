export const api_url =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5500'
    : 'https://findv2.herokuapp.com'
