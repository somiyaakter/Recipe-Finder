'use client'
import axios from 'axios'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function RecipeList() {
	const [recipes, setRecipes] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredRecipes, setFilteredRecipes] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const recipesPerPage = 10

	// Fetch recipes on component mount
	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await axios.get('https://dummyjson.com/recipes')
				const data = response.data
				setRecipes(data.recipes || [])
				setFilteredRecipes(data.recipes || []) // Initialize filtered recipes
			} catch (error) {
				console.error('Error fetching recipes:', error)
			}
		}
		fetchRecipes()
	}, [])

	// Handle search input change
	const handleSearch = value => {
		setSearchTerm(value)
		const filtered = recipes.filter(recipe =>
			recipe.name.toLowerCase().includes(value.toLowerCase()),
		)
		setFilteredRecipes(filtered)
		setCurrentPage(1) // Reset to first page on search
	}

	// Pagination logic
	const indexOfLastRecipe = currentPage * recipesPerPage
	const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
	const currentRecipes = filteredRecipes.slice(
		indexOfFirstRecipe,
		indexOfLastRecipe,
	)

	const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage)

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber)
	}

	return (
		<div className="">
			<section className="h-[50vh]  bg-[url('/sanji.jpg')] bg-no-repeat bg-cover  rounded ">
				<div className="flex flex-col items-center space-y-5 ">
					<h1 className="text-3xl font-bold mt-36">Your Favourite Recipes??</h1>
					<div className="flex items-center gap-2 bg-black h-12 w-2/5 rounded justify-between p-2">
						<input
							type="text"
							placeholder="Search for a recipe..."
							className="w-full bg-black text-white px-4 py-2 focus:outline-none "
							onChange={e => handleSearch(e.target.value)}
							value={searchTerm}
						/>
					</div>
				</div>
			</section>

			{/* Recipe Grid Section */}
			<main className="">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20">
					{currentRecipes.map(recipe => (
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
				{/* No Recipes Found Message */}
				{filteredRecipes.length === 0 && (
					<p className="text-center text-gray-500 mt-6">No recipes found!</p>
				)}

				{/* Pagination Controls */}
				<div className="flex justify-center items-center mt-8 space-x-2">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
						<button
							key={page}
							className={`px-4 py-2 rounded ${
								currentPage === page
									? 'bg-orange-600 text-white'
									: 'bg-gray-200 text-gray-800'
							}`}
							onClick={() => handlePageChange(page)}
						>
							{page}
						</button>
					))}
				</div>
			</main>
		</div>
	)
}
