import React from 'react'
import { ConciergeBellIcon, MoonStarIcon, Save } from 'lucide-react'

export default function Navbar() {
	return (
		<div className="flex justify-between items-center mb-7  ">
			<div className="flex gap-2 items-center">
				<ConciergeBellIcon className="h-7 w-7 text-orange-600 font-bold" />
				<h1 className="font-bold text-2xl ">Cook</h1>
			</div>
		</div>
	)
}
