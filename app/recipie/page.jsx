'use client'

import React from 'react'

export default async function Recipie() {
	const res = await axios.get('https://dummyjson.com/recipes')
	const recipes = res.data.recipes
	console.log(recipes)
	return (
		<div>
			<main className="p-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredRecipes.map(recipe => (
						<div
							key={recipe.id}
							className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
						>
							<img
								src={recipe.image || 'https://via.placeholder.com/300'}
								alt={recipe.name || 'Recipe'}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h2 className="text-xl font-bold text-gray-800">
									{recipe.name || 'Untitled Recipe'}
								</h2>
								<p className="text-sm text-gray-500 mt-2">
									Cuisine: {recipe.cuisine || 'N/A'}
								</p>
								<p className="text-sm text-gray-500 mt-1">
									Difficulty: {recipe.difficulty || 'Unknown'}
								</p>
								<p className="text-sm text-gray-500 mt-1">
									Cooking Time: {recipe.cookTimeMinutes || 'N/A'} mins
								</p>
								<div className="mt-4 flex items-center justify-between">
									<span className="bg-orange-100 text-orange-600 px-3 py-1 text-xs font-medium rounded-full">
										{recipe.tags?.[0] || 'Tag'}
									</span>
									<span className="text-sm font-medium text-gray-600">
										{recipe.rating || 0} ⭐ ({recipe.reviewCount || 0} reviews)
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
				{filteredRecipes.length === 0 && (
					<p className="text-center text-gray-500 mt-6">No recipes found!</p>
				)}
			</main>
		</div>
	)
}
