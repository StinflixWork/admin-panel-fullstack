import { IYoutubeResponse } from '@/services/youtube.service'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function RecentVideo() {
	const { data } = useQuery({
		queryKey: ['recent video'],
		queryFn: () => axios.get<IYoutubeResponse>('/api/youtube'),
		select: ({ data }) => data,
	})

	return data ? (
		<div>
			<h3 className='mb-2'>Recent video: </h3>
			<a
				href={`https://youtu.be/${data.videoId}`}
				target='_blank'
				rel='noreferrer'
				className='flex items-center gap-3 bg-gray-500 hover:bg-gray-400 transition-colors py-2 px-3 animate-fade duration-300 ease-in-out'
			>
				<img src={data.thumbnail} alt={data.title} width={70} />
				<span>{data.title}</span>
			</a>
		</div>
	) : null
}
