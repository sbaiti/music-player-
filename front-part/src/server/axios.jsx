import axios from 'axios'
import url from './baseUrl.json'

const instance = axios.create({
    baseURL: url.REACT_APP_BASE_URL,
    headers: {
        'Accept-Version': 1,
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
    }
})

export function Get(url, payload) {
    return new Promise(resolve => {
        resolve(instance.get(url, payload))
    })
}

export function Post(url, payload) {
    return new Promise(resolve => {
        resolve(instance.post(url, payload))
    })
}

export function Patch(url, payload) {
    return new Promise(resolve => {
        resolve(instance.patch(url, payload))
    })
}

export function Delete(url, payload) {
    return new Promise(resolve => {
        if (payload) {
            resolve(instance.delete(url, payload))
        } else {
            resolve(instance.delete(url))
        }
    })
}
export function Put(url, payload) {
    return new Promise(resolve => {
        resolve(instance.put(url, payload))
    })
}
const { interceptors, defaults } = instance
export default {
    Put,
    Get,
    Post,
    Patch,
    Delete,
    interceptors,
    defaults,
}
