import Navbar from '@/components/navbar.jsx'
import PageWraper from '@/components/pagewraper.jsx'
import RecipieList from '@/components/recipielist.jsx'
import React from 'react'

export default function Home() {
	return (
		<PageWraper>
			<div className="">
				<Navbar />
				<RecipieList />
			</div>
		</PageWraper>
	)
}
