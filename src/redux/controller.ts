import { api_url } from '../api'
import axios from 'axios'

export const getRank = () => axios.get(`${api_url}/boom/`)

export const setRank = (user: any, remains: any) =>
  axios.post(`${api_url}/boom/set-boom-rank`, { user, remains })
