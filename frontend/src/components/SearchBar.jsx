import { UserRoundSearch } from 'lucide-react'

export function SearchBar({setFilter}) {
	return (
		<div className='flex items-center'>
			<UserRoundSearch />
			<input onChange={(e)=>setFilter(e.target.value)} className="w-full border-b-2 border-black focus:outline-none my-10 mx-2" placeholder='Search User'/>
		</div>
	)
}