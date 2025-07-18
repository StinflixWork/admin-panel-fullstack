import axios, { CreateAxiosDefaults } from 'axios'
import { API_URL } from '@/constants/main.constants'
import { errorCatch, getContentType } from '@/api/api.helper'
import { getAccessToken, removeFromStorage } from '@/services/auth/auth.helper'
import { authService } from '@/services/auth/auth.service'

const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: getContentType(),
	withCredentials: true
}

export const axiosClassic = axios.create(axiosOptions)
export const instance = axios.create(axiosOptions)

instance.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.config && !error.config._isRetry) ||
			error?.response?.status === 401 ||
			errorCatch(error) === 'jwt expired' ||
			errorCatch(error) === 'jwt must be provided'
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return instance.request(originalRequest)
			} catch (e) {
				if (errorCatch(e) === 'jwt expired' || errorCatch(e) === 'Refresh token not passed') {
					removeFromStorage()
				}
			}
		}

		throw error
	}
)
