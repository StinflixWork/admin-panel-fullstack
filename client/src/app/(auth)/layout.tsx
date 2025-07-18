import { getServerAuth } from '@/utils/get-server-auth'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {
	const user = await getServerAuth()

	if (user?.isLoggedIn) {
		return redirect(user.isAdmin ? '/' : '/')
	}

	return children
}
