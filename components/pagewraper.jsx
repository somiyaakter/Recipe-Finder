import React from 'react'

export default function PageWraper({ children }) {
	return (
		<div className=" w-full  ">
			<div className="mx-auto max-w-[1440px] mt-9 bg-white rounded-2xl min-h-[100vh] p-5">
				{children}
			</div>
		</div>
	)
}
