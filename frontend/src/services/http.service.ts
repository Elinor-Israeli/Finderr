import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const BASE_URL: string =
import.meta.env.VITE_API_URL || '//localhost:3033/api/'
const axiosInstance: AxiosInstance = Axios.create({
    withCredentials: true
})

export const httpService = {
    get<T>(endpoint: string, data?: Record<string, any>): Promise<T> {
        return ajax<T>(endpoint, 'GET', data)
    },
    post<T>(endpoint: string, data?: Record<string, any>): Promise<T> {
        return ajax<T>(endpoint, 'POST', data)
    },
    put<T>(endpoint: string, data?: Record<string, any>): Promise<T> {
        return ajax<T>(endpoint, 'PUT', data)
    },
    delete<T>(endpoint: string, data?: Record<string, any>): Promise<T> {
        return ajax<T>(endpoint, 'DELETE', data)
    }
}

async function ajax<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data: Record<string, any> | null = null
): Promise<T> {
    try {
        const config: AxiosRequestConfig = {
            url: `${BASE_URL}${endpoint}`,
            method,
            data: method !== 'GET' ? data : null,
            params: method === 'GET' ? data : null
        }

        const res: AxiosResponse<T> = await axiosInstance(config)
        return res.data
    } catch (err: any) {
        console.error(`Error ${method}ing to backend: ${endpoint}, data:`, data, err)
        if (err.response?.status === 401) {
            sessionStorage.clear()
        }
        throw err
    }
}
