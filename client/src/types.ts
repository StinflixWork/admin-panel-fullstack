export enum UserRole {
	Admin = 'ADMIN',
	User = 'USER'
}

export interface IUser {
	id: string
	name?: string
	email: string
	avatarUrl?: string
	country?: string
	role: UserRole
}

export interface IAuthFormData extends Pick<IUser, 'email'> {
	password: string
}
