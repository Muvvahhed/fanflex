'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	Search,
	Filter,
	Grid,
	List,
	Star,
	Heart,
	ShoppingCart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import Image from 'next/image'

const products = [
	{
		id: 1,
		name: 'Manchester United Home Jersey 2024',
		price: 89.99,
		originalPrice: 109.99,
		image: '/red-manchester-united-football-jersey.png',
		category: 'Jerseys',
		brand: 'Adidas',
		sizes: ['S', 'M', 'L', 'XL'],
		rating: 4.8,
		reviews: 234,
		isNew: true,
		onSale: true,
	},
	{
		id: 2,
		name: 'Nike Mercurial Vapor 15 Elite',
		price: 249.99,
		image: '/black-nike-football-boots-cleats.png',
		category: 'Footwear',
		brand: 'Nike',
		sizes: ['7', '8', '9', '10', '11'],
		rating: 4.9,
		reviews: 156,
		isNew: true,
	},
	{
		id: 3,
		name: 'Barcelona Away Jersey 2024',
		price: 84.99,
		originalPrice: 99.99,
		image: '/pink-barcelona-football-jersey-away-kit.png',
		category: 'Jerseys',
		brand: 'Nike',
		sizes: ['S', 'M', 'L', 'XL', 'XXL'],
		rating: 4.7,
		reviews: 189,
		onSale: true,
	},
	{
		id: 4,
		name: 'Adidas Training Shorts',
		price: 34.99,
		image: '/black-adidas-football-training-shorts.png',
		category: 'Accessories',
		brand: 'Adidas',
		sizes: ['S', 'M', 'L', 'XL'],
		rating: 4.5,
		reviews: 98,
	},
	{
		id: 5,
		name: 'Real Madrid Home Jersey 2024',
		price: 89.99,
		image: '/white-real-madrid-football-jersey.png',
		category: 'Jerseys',
		brand: 'Adidas',
		sizes: ['S', 'M', 'L', 'XL'],
		rating: 4.8,
		reviews: 267,
		isNew: true,
	},
	{
		id: 6,
		name: 'Puma Goalkeeper Gloves',
		price: 59.99,
		originalPrice: 74.99,
		image: '/black-puma-goalkeeper-gloves.png',
		category: 'Accessories',
		brand: 'Puma',
		sizes: ['7', '8', '9', '10'],
		rating: 4.6,
		reviews: 78,
		onSale: true,
	},
	{
		id: 7,
		name: 'Chelsea Third Kit 2024',
		price: 79.99,
		image: '/yellow-chelsea-football-jersey-third-kit.png',
		category: 'Jerseys',
		brand: 'Nike',
		sizes: ['S', 'M', 'L', 'XL'],
		rating: 4.4,
		reviews: 145,
	},
	{
		id: 8,
		name: 'Liverpool Training Jersey',
		price: 64.99,
		image: '/red-liverpool-training-jersey.png',
		category: 'Jerseys',
		brand: 'Nike',
		sizes: ['S', 'M', 'L', 'XL'],
		rating: 4.7,
		reviews: 203,
	},
]

const categories = ['All', 'Jerseys', 'Footwear', 'Accessories']
const brands = ['All', 'Nike', 'Adidas', 'Puma']
const sizes = ['S', 'M', 'L', 'XL', 'XXL', '7', '8', '9', '10', '11']

export default function ExplorePage() {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [selectedBrand, setSelectedBrand] = useState('All')
	const [selectedSizes, setSelectedSizes] = useState<string[]>([])
	const [priceRange, setPriceRange] = useState([0, 300])
	const [sortBy, setSortBy] = useState('featured')
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
	const [currentPage, setCurrentPage] = useState(1)
	const [showFilters, setShowFilters] = useState(false)
	const itemsPerPage = 8

	const filteredProducts = useMemo(() => {
		const filtered = products.filter((product) => {
			const matchesSearch =
				product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.brand.toLowerCase().includes(searchQuery.toLowerCase())
			const matchesCategory =
				selectedCategory === 'All' || product.category === selectedCategory
			const matchesBrand =
				selectedBrand === 'All' || product.brand === selectedBrand
			const matchesPrice =
				product.price >= priceRange[0] && product.price <= priceRange[1]
			const matchesSize =
				selectedSizes.length === 0 ||
				selectedSizes.some((size) => product.sizes.includes(size))

			return (
				matchesSearch &&
				matchesCategory &&
				matchesBrand &&
				matchesPrice &&
				matchesSize
			)
		})

		// Sort products
		switch (sortBy) {
			case 'price-low':
				filtered.sort((a, b) => a.price - b.price)
				break
			case 'price-high':
				filtered.sort((a, b) => b.price - a.price)
				break
			case 'rating':
				filtered.sort((a, b) => b.rating - a.rating)
				break
			case 'newest':
				filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
				break
			default:
				// Keep original order for "featured"
				break
		}

		return filtered
	}, [
		searchQuery,
		selectedCategory,
		selectedBrand,
		selectedSizes,
		priceRange,
		sortBy,
	])

	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
	const paginatedProducts = filteredProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const handleSizeToggle = (size: string) => {
		setSelectedSizes((prev) =>
			prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
		)
	}

	const clearFilters = () => {
		setSelectedCategory('All')
		setSelectedBrand('All')
		setSelectedSizes([])
		setPriceRange([0, 300])
		setSearchQuery('')
	}

	const FilterContent = () => (
		<div className="space-y-6">
			<div>
				<h3 className="font-semibold mb-3">Categories</h3>
				<div className="space-y-2">
					{categories.map((category) => (
						<label
							key={category}
							className="flex items-center space-x-2 cursor-pointer"
						>
							<Checkbox
								checked={selectedCategory === category}
								onCheckedChange={() => setSelectedCategory(category)}
							/>
							<span className="text-sm">{category}</span>
						</label>
					))}
				</div>
			</div>

			<div>
				<h3 className="font-semibold mb-3">Brands</h3>
				<div className="space-y-2">
					{brands.map((brand) => (
						<label
							key={brand}
							className="flex items-center space-x-2 cursor-pointer"
						>
							<Checkbox
								checked={selectedBrand === brand}
								onCheckedChange={() => setSelectedBrand(brand)}
							/>
							<span className="text-sm">{brand}</span>
						</label>
					))}
				</div>
			</div>

			<div>
				<h3 className="font-semibold mb-3">Price Range</h3>
				<div className="px-2">
					<Slider
						value={priceRange}
						onValueChange={setPriceRange}
						max={300}
						min={0}
						step={10}
						className="mb-2"
					/>
					<div className="flex justify-between text-sm text-muted-foreground">
						<span>${priceRange[0]}</span>
						<span>${priceRange[1]}</span>
					</div>
				</div>
			</div>

			<div>
				<h3 className="font-semibold mb-3">Sizes</h3>
				<div className="grid grid-cols-3 gap-2">
					{sizes.map((size) => (
						<Button
							key={size}
							variant={selectedSizes.includes(size) ? 'default' : 'outline'}
							size="sm"
							onClick={() => handleSizeToggle(size)}
							className="h-8"
						>
							{size}
						</Button>
					))}
				</div>
			</div>

			<Button
				onClick={clearFilters}
				variant="outline"
				className="w-full bg-transparent"
			>
				Clear All Filters
			</Button>
		</div>
	)

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<Link href="/" className="text-2xl font-bold text-emerald-600">
							K2 Fanflex
						</Link>
						<nav className="hidden md:flex space-x-8">
							<Link
								href="/"
								className="text-gray-600 hover:text-emerald-600 transition-colors"
							>
								Home
							</Link>
							<Link href="/explore" className="text-emerald-600 font-medium">
								Shop
							</Link>
							<Link
								href="#"
								className="text-gray-600 hover:text-emerald-600 transition-colors"
							>
								About
							</Link>
							<Link
								href="#"
								className="text-gray-600 hover:text-emerald-600 transition-colors"
							>
								Contact
							</Link>
						</nav>
						<div className="flex items-center gap-4">
							<Button variant="ghost" size="sm">
								<Search className="w-4 h-4" />
							</Button>
							<Button variant="ghost" size="sm">
								<ShoppingCart className="w-4 h-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Search Bar */}
				<div className="mb-8">
					<div className="relative max-w-2xl mx-auto">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
						<Input
							placeholder="Search for jerseys, boots, accessories..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 h-12 text-lg"
						/>
					</div>
				</div>

				<div className="flex gap-8">
					{/* Desktop Sidebar Filters */}
					<div className="hidden lg:block w-64 flex-shrink-0">
						<Card className="sticky top-4">
							<CardContent className="p-6">
								<div className="flex items-center justify-between mb-4">
									<h2 className="text-lg font-semibold">Filters</h2>
									<Filter className="h-5 w-5 text-gray-400" />
								</div>
								<FilterContent />
							</CardContent>
						</Card>
					</div>

					{/* Main Content */}
					<div className="flex-1">
						{/* Mobile Filter Button & Controls */}
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-4">
								<Sheet open={showFilters} onOpenChange={setShowFilters}>
									<SheetTrigger asChild>
										<Button
											variant="outline"
											className="lg:hidden bg-transparent"
										>
											<Filter className="h-4 w-4 mr-2" />
											Filters
										</Button>
									</SheetTrigger>
									<SheetContent side="left" className="w-80">
										<SheetHeader>
											<SheetTitle>Filters</SheetTitle>
										</SheetHeader>
										<div className="mt-6">
											<FilterContent />
										</div>
									</SheetContent>
								</Sheet>

								<div className="text-sm text-gray-600">
									{filteredProducts.length} products found
								</div>
							</div>

							<div className="flex items-center gap-4">
								<Select value={sortBy} onValueChange={setSortBy}>
									<SelectTrigger className="w-40">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="featured">Featured</SelectItem>
										<SelectItem value="newest">Newest</SelectItem>
										<SelectItem value="price-low">
											Price: Low to High
										</SelectItem>
										<SelectItem value="price-high">
											Price: High to Low
										</SelectItem>
										<SelectItem value="rating">Highest Rated</SelectItem>
									</SelectContent>
								</Select>

								<div className="hidden sm:flex border rounded-lg">
									<Button
										variant={viewMode === 'grid' ? 'default' : 'ghost'}
										size="sm"
										onClick={() => setViewMode('grid')}
									>
										<Grid className="h-4 w-4" />
									</Button>
									<Button
										variant={viewMode === 'list' ? 'default' : 'ghost'}
										size="sm"
										onClick={() => setViewMode('list')}
									>
										<List className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>

						{/* Product Grid */}
						<AnimatePresence mode="wait">
							<motion.div
								key={currentPage}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								className={
									viewMode === 'grid'
										? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
										: 'space-y-4'
								}
							>
								{paginatedProducts.map((product) => (
									<motion.div
										key={product.id}
										layout
										whileHover={{ y: -4 }}
										transition={{ duration: 0.2 }}
									>
										<Link href={`/product/${product.id}`}>
											<Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
												<div className="relative">
													<Image
														src={product.image || '/placeholder.svg'}
														alt={product.name}
														className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
														width={100}
														height={100}
													/>
													{product.isNew && (
														<Badge className="absolute top-2 left-2 bg-emerald-500">
															New
														</Badge>
													)}
													{product.onSale && (
														<Badge className="absolute top-2 right-2 bg-yellow-500">
															Sale
														</Badge>
													)}
													<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
														<Button
															size="sm"
															variant="secondary"
															className="h-8 w-8 p-0"
														>
															<Heart className="h-4 w-4" />
														</Button>
													</div>
												</div>
												<CardContent className="p-4">
													<div className="flex items-center gap-1 mb-2">
														<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
														<span className="text-sm font-medium">
															{product.rating}
														</span>
														<span className="text-sm text-gray-500">
															({product.reviews})
														</span>
													</div>
													<h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
														{product.name}
													</h3>
													<p className="text-sm text-gray-600 mb-2">
														{product.brand}
													</p>
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<span className="text-lg font-bold text-emerald-600">
																${product.price}
															</span>
															{product.originalPrice && (
																<span className="text-sm text-gray-500 line-through">
																	${product.originalPrice}
																</span>
															)}
														</div>
														<Button
															size="sm"
															className="opacity-0 group-hover:opacity-100 transition-opacity"
														>
															<ShoppingCart className="h-4 w-4" />
														</Button>
													</div>
												</CardContent>
											</Card>
										</Link>
									</motion.div>
								))}
							</motion.div>
						</AnimatePresence>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="flex justify-center mt-12">
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										onClick={() =>
											setCurrentPage((prev) => Math.max(1, prev - 1))
										}
										disabled={currentPage === 1}
									>
										Previous
									</Button>

									{Array.from({ length: totalPages }, (_, i) => i + 1).map(
										(page) => (
											<Button
												key={page}
												variant={currentPage === page ? 'default' : 'outline'}
												onClick={() => setCurrentPage(page)}
												className="w-10"
											>
												{page}
											</Button>
										)
									)}

									<Button
										variant="outline"
										onClick={() =>
											setCurrentPage((prev) => Math.min(totalPages, prev + 1))
										}
										disabled={currentPage === totalPages}
									>
										Next
									</Button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
