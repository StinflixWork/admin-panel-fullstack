import { instance } from '@/api/axios'

export interface IFileResource {
	url: string
	name: string
}

class FileService {
	async upload(file: FormData, folder?: string) {
		return instance.post<IFileResource[]>(`/media`, file, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}
}

export const fileService = new FileService()
