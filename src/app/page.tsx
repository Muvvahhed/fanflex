'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
	Star,
	ShoppingCart,
	Search,
	Filter,
	ChevronLeft,
	ChevronRight,
	Menu,
	X,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function K2FanflexApp() {
	const [currentPage, setCurrentPage] = useState<'landing' | 'explore'>(
		'landing'
	)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState('all')
	const [priceRange, setPriceRange] = useState([0, 200])

	const featuredProducts = [
		{
			id: 1,
			name: 'Manchester United Home Jersey',
			price: 89.99,
			originalPrice: 109.99,
			image: '/red-manchester-united-football-jersey.png',
			rating: 4.8,
			reviews: 124,
			badge: 'Best Seller',
			category: 'jerseys',
		},
		{
			id: 2,
			name: 'Nike Air Zoom Football Boots',
			price: 159.99,
			image: '/black-nike-football-boots-cleats.png',
			rating: 4.9,
			reviews: 89,
			badge: 'New',
			category: 'footwear',
		},
		{
			id: 3,
			name: 'Barcelona Away Kit',
			price: 79.99,
			originalPrice: 99.99,
			image: '/pink-barcelona-football-jersey-away-kit.png',
			rating: 4.7,
			reviews: 156,
			badge: 'Sale',
			category: 'jerseys',
		},
		{
			id: 4,
			name: 'Adidas Training Shorts',
			price: 34.99,
			image: '/black-adidas-football-training-shorts.png',
			rating: 4.6,
			reviews: 78,
			category: 'apparel',
		},
	]

	const allProducts = [
		...featuredProducts,
		{
			id: 5,
			name: 'Real Madrid Home Jersey',
			price: 89.99,
			image: '/white-real-madrid-football-jersey.png',
			rating: 4.8,
			reviews: 203,
			category: 'jerseys',
		},
		{
			id: 6,
			name: 'Puma Football Gloves',
			price: 24.99,
			image: '/black-puma-goalkeeper-gloves.png',
			rating: 4.5,
			reviews: 45,
			category: 'accessories',
		},
		{
			id: 7,
			name: 'Chelsea Third Kit',
			price: 74.99,
			originalPrice: 94.99,
			image: '/yellow-chelsea-football-jersey-third-kit.png',
			rating: 4.6,
			reviews: 92,
			category: 'jerseys',
			badge: 'Sale',
		},
		{
			id: 8,
			name: 'Under Armour Cleats',
			price: 129.99,
			image: '/white-under-armour-football-cleats.png',
			rating: 4.7,
			reviews: 67,
			category: 'footwear',
		},
	]

	const categories = [
		{
			id: 'jerseys',
			name: 'Jerseys',
			image: '/football-jerseys-collection.png',
		},
		{
			id: 'accessories',
			name: 'Accessories',
			image: '/football-accessories-gloves-shin-pads.png',
		},
		{
			id: 'footwear',
			name: 'Footwear',
			image: '/football-boots-cleats-collection.png',
		},
	]

	const testimonials = [
		{
			name: 'Alex Johnson',
			rating: 5,
			comment:
				'Amazing quality jerseys! Fast shipping and great customer service.',
			avatar: '/male-customer-avatar.png',
		},
		{
			name: 'Sarah Williams',
			rating: 5,
			comment:
				'Love the authentic feel of the jerseys. Perfect fit and great prices!',
			avatar: '/female-customer-avatar.png',
		},
		{
			name: 'Mike Chen',
			rating: 4,
			comment: 'Great selection of football gear. Will definitely order again.',
			avatar: '/male-customer-avatar-asian.png',
		},
	]

	const filteredProducts =
		selectedCategory === 'all'
			? allProducts
			: allProducts.filter((product) => product.category === selectedCategory)

	const ProductCard = ({
		product,
	}: {
		product: {
			id: number
			name: string
			price: number
			originalPrice?: number
			image: string
			rating: number
			reviews: number
			badge?: string
		}
		featured?: boolean
	}) => (
		<motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
			<Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
				<div className="relative">
					<Image
						fill
						src={product.image || '/placeholder.svg'}
						alt={product.name}
						className="w-full h-48 object-cover"
					/>
					{product.badge && (
						<Badge
							className={`absolute top-2 left-2 ${
								product.badge === 'Sale'
									? 'bg-accent text-accent-foreground'
									: product.badge === 'New'
									? 'bg-primary text-primary-foreground'
									: 'bg-secondary text-secondary-foreground'
							}`}
						>
							{product.badge}
						</Badge>
					)}
				</div>
				<CardContent className="p-4">
					<h3 className="font-semibold text-sm mb-2 line-clamp-2">
						{product.name}
					</h3>
					<div className="flex items-center gap-1 mb-2">
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`w-3 h-3 ${
										i < Math.floor(product.rating)
											? 'fill-accent text-accent'
											: 'text-muted-foreground'
									}`}
								/>
							))}
						</div>
						<span className="text-xs text-muted-foreground">
							({product.reviews})
						</span>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="font-bold text-primary">${product.price}</span>
							{product.originalPrice && (
								<span className="text-sm text-muted-foreground line-through">
									${product.originalPrice}
								</span>
							)}
						</div>
						<Button size="sm" className="h-8 px-3">
							<ShoppingCart className="w-3 h-3" />
						</Button>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)

	if (currentPage === 'explore') {
		return (
			<div className="min-h-screen bg-background">
				{/* Header */}
				<header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
					<div className="container mx-auto px-4 h-16 flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setCurrentPage('landing')}
								className="text-primary hover:text-primary/80"
							>
								<ChevronLeft className="w-4 h-4 mr-1" />
								Back
							</Button>
							<h1 className="text-xl font-bold text-primary">K2 Fanflex</h1>
						</div>
						<Button
							variant="ghost"
							size="sm"
							className="md:hidden"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							<Menu className="w-5 h-5" />
						</Button>
					</div>
				</header>

				{/* Search Bar */}
				<div className="container mx-auto px-4 py-6">
					<div className="relative max-w-2xl mx-auto">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
						<input
							type="text"
							placeholder="Search for jerseys, boots, accessories..."
							className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
						/>
					</div>
				</div>

				<div className="container mx-auto px-4 pb-8">
					<div className="flex gap-6">
						{/* Filters Sidebar - Desktop */}
						<div className="hidden md:block w-64 shrink-0">
							<Card className="p-6">
								<h3 className="font-semibold mb-4">Filters</h3>

								<div className="space-y-6">
									<div>
										<h4 className="font-medium mb-3">Categories</h4>
										<div className="space-y-2">
											{[
												{ id: 'all', name: 'All Products' },
												{ id: 'jerseys', name: 'Jerseys' },
												{ id: 'footwear', name: 'Footwear' },
												{ id: 'accessories', name: 'Accessories' },
											].map((category) => (
												<button
													key={category.id}
													onClick={() => setSelectedCategory(category.id)}
													className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
														selectedCategory === category.id
															? 'bg-primary text-primary-foreground'
															: 'hover:bg-muted'
													}`}
												>
													{category.name}
												</button>
											))}
										</div>
									</div>

									<div>
										<h4 className="font-medium mb-3">Price Range</h4>
										<div className="space-y-2">
											<div className="flex justify-between text-sm text-muted-foreground">
												<span>${priceRange[0]}</span>
												<span>${priceRange[1]}</span>
											</div>
											<input
												type="range"
												min="0"
												max="200"
												value={priceRange[1]}
												onChange={(e) =>
													setPriceRange([
														priceRange[0],
														Number.parseInt(e.target.value),
													])
												}
												className="w-full"
											/>
										</div>
									</div>

									<div>
										<h4 className="font-medium mb-3">Size</h4>
										<div className="grid grid-cols-3 gap-2">
											{['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
												<button
													key={size}
													className="px-3 py-2 text-sm border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
												>
													{size}
												</button>
											))}
										</div>
									</div>
								</div>
							</Card>
						</div>

						{/* Mobile Filters Button */}
						<div className="md:hidden fixed bottom-4 right-4 z-40">
							<Button
								onClick={() => setMobileFiltersOpen(true)}
								className="rounded-full w-14 h-14 shadow-lg"
							>
								<Filter className="w-5 h-5" />
							</Button>
						</div>

						{/* Product Grid */}
						<div className="flex-1">
							<div className="flex items-center justify-between mb-6">
								<p className="text-muted-foreground">
									Showing {filteredProducts.length} products
								</p>
								<select className="px-3 py-2 border border-border rounded-lg bg-background">
									<option>Sort by: Featured</option>
									<option>Price: Low to High</option>
									<option>Price: High to Low</option>
									<option>Newest First</option>
								</select>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{filteredProducts.map((product) => (
									<ProductCard key={product.id} product={product} />
								))}
							</div>

							{/* Pagination */}
							<div className="flex justify-center mt-12">
								<div className="flex items-center gap-2">
									<Button variant="outline" size="sm">
										<ChevronLeft className="w-4 h-4" />
									</Button>
									{[1, 2, 3, 4, 5].map((page) => (
										<Button
											key={page}
											variant={page === 1 ? 'default' : 'outline'}
											size="sm"
											className="w-10"
										>
											{page}
										</Button>
									))}
									<Button variant="outline" size="sm">
										<ChevronRight className="w-4 h-4" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile Filters Overlay */}
				{mobileFiltersOpen && (
					<div className="fixed inset-0 z-50 bg-black/50 md:hidden">
						<div className="fixed right-0 top-0 h-full w-80 bg-background p-6 shadow-xl">
							<div className="flex items-center justify-between mb-6">
								<h3 className="font-semibold">Filters</h3>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setMobileFiltersOpen(false)}
								>
									<X className="w-4 h-4" />
								</Button>
							</div>

							<div className="space-y-6">
								<div>
									<h4 className="font-medium mb-3">Categories</h4>
									<div className="space-y-2">
										{[
											{ id: 'all', name: 'All Products' },
											{ id: 'jerseys', name: 'Jerseys' },
											{ id: 'footwear', name: 'Footwear' },
											{ id: 'accessories', name: 'Accessories' },
										].map((category) => (
											<button
												key={category.id}
												onClick={() => {
													setSelectedCategory(category.id)
													setMobileFiltersOpen(false)
												}}
												className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
													selectedCategory === category.id
														? 'bg-primary text-primary-foreground'
														: 'hover:bg-muted'
												}`}
											>
												{category.name}
											</button>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
				<div className="container mx-auto px-4 h-16 flex items-center justify-between">
					<div className="flex items-center">
						<h1 className="text-2xl font-bold text-primary">K2 Fanflex</h1>
					</div>

					<nav className="hidden md:flex items-center space-x-8">
						<a
							href="#"
							className="text-foreground hover:text-primary transition-colors"
						>
							Home
						</a>
						<a
							href="#"
							className="text-foreground hover:text-primary transition-colors"
						>
							Shop
						</a>
						<a
							href="#"
							className="text-foreground hover:text-primary transition-colors"
						>
							About
						</a>
						<a
							href="#"
							className="text-foreground hover:text-primary transition-colors"
						>
							Contact
						</a>
					</nav>

					<div className="flex items-center gap-4">
						<Button variant="ghost" size="sm">
							<Search className="w-4 h-4" />
						</Button>
						<Button variant="ghost" size="sm">
							<ShoppingCart className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="md:hidden"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							<Menu className="w-5 h-5" />
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="md:hidden border-t bg-background">
						<nav className="container mx-auto px-4 py-4 space-y-2">
							<a
								href="#"
								className="block py-2 text-foreground hover:text-primary transition-colors"
							>
								Home
							</a>
							<a
								href="#"
								className="block py-2 text-foreground hover:text-primary transition-colors"
							>
								Shop
							</a>
							<a
								href="#"
								className="block py-2 text-foreground hover:text-primary transition-colors"
							>
								About
							</a>
							<a
								href="#"
								className="block py-2 text-foreground hover:text-primary transition-colors"
							>
								Contact
							</a>
						</nav>
					</div>
				)}
			</header>

			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
				<div className="container mx-auto px-4 py-12 md:py-20">
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
								Gear Up for
								<span className="text-primary"> Victory</span>
							</h1>
							<p className="text-lg text-muted-foreground mb-8 text-pretty">
								Discover authentic football jerseys, premium boots, and
								professional gear from the world&apos;s top teams and brands.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									size="lg"
									className="text-lg px-8"
									onClick={() => setCurrentPage('explore')}
								>
									Shop Now
								</Button>
								<Button
									variant="outline"
									size="lg"
									className="text-lg px-8 bg-transparent"
								>
									View Collections
								</Button>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="relative"
						>
							<Image
								fill
								src="/football-player-in-action-wearing-jersey-and-boots.png"
								alt="Football player in action"
								className="w-full h-auto rounded-2xl shadow-2xl"
							/>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Featured Products */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Featured Products
						</h2>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							Discover our most popular items, handpicked for quality and
							performance
						</p>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{featuredProducts.map((product, index) => (
							<motion.div
								key={product.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<ProductCard product={product} featured />
							</motion.div>
						))}
					</div>

					<div className="text-center mt-12">
						<Button
							variant="outline"
							size="lg"
							onClick={() => setCurrentPage('explore')}
						>
							View All Products
						</Button>
					</div>
				</div>
			</section>

			{/* Category Highlights */}
			<section className="py-16 bg-muted/30">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Shop by Category
						</h2>
						<p className="text-muted-foreground text-lg">
							Find exactly what you need for your game
						</p>
					</motion.div>

					{/* Mobile: Horizontal Scroll */}
					<div className="md:hidden">
						<div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
							{categories.map((category, index) => (
								<motion.div
									key={category.id}
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									className="flex-shrink-0 w-64 snap-start"
								>
									<Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
										<div className="relative h-32">
											<Image
												fill
												src={category.image || '/placeholder.svg'}
												alt={category.name}
												className="w-full h-full object-cover"
											/>
											<div className="absolute inset-0 bg-black/20" />
											<div className="absolute inset-0 flex items-center justify-center">
												<h3 className="text-white font-bold text-xl">
													{category.name}
												</h3>
											</div>
										</div>
									</Card>
								</motion.div>
							))}
						</div>
					</div>

					{/* Desktop: Grid */}
					<div className="hidden md:grid md:grid-cols-3 gap-6">
						{categories.map((category, index) => (
							<motion.div
								key={category.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -4 }}
							>
								<Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300">
									<div className="relative h-48">
										<Image
											fill
											src={category.image || '/placeholder.svg'}
											alt={category.name}
											className="w-full h-full object-cover"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
										<div className="absolute bottom-4 left-4">
											<h3 className="text-white font-bold text-2xl">
												{category.name}
											</h3>
										</div>
									</div>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							What Our Customers Say
						</h2>
						<p className="text-muted-foreground text-lg">
							Join thousands of satisfied football fans
						</p>
					</motion.div>

					{/* Mobile: Carousel */}
					<div className="md:hidden">
						<div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									className="flex-shrink-0 w-80 snap-start"
								>
									<Card className="p-6 h-full">
										<div className="flex items-center gap-3 mb-4">
											<Image
												fill
												src={testimonial.avatar || '/placeholder.svg'}
												alt={testimonial.name}
												className="w-12 h-12 rounded-full"
											/>
											<div>
												<h4 className="font-semibold">{testimonial.name}</h4>
												<div className="flex">
													{[...Array(testimonial.rating)].map((_, i) => (
														<Star
															key={i}
															className="w-4 h-4 fill-accent text-accent"
														/>
													))}
												</div>
											</div>
										</div>
										<p className="text-muted-foreground">
											{testimonial.comment}
										</p>
									</Card>
								</motion.div>
							))}
						</div>
					</div>

					{/* Desktop: Grid */}
					<div className="hidden md:grid md:grid-cols-3 gap-6">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<Card className="p-6 h-full">
									<div className="flex items-center gap-3 mb-4">
										<Image
											fill
											src={testimonial.avatar || '/placeholder.svg'}
											alt={testimonial.name}
											className="w-12 h-12 rounded-full"
										/>
										<div>
											<h4 className="font-semibold">{testimonial.name}</h4>
											<div className="flex">
												{[...Array(testimonial.rating)].map((_, i) => (
													<Star
														key={i}
														className="w-4 h-4 fill-accent text-accent"
													/>
												))}
											</div>
										</div>
									</div>
									<p className="text-muted-foreground">{testimonial.comment}</p>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-muted/50 py-12">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div className="md:col-span-1">
							<h3 className="text-2xl font-bold text-primary mb-4">
								K2 Fanflex
							</h3>
							<p className="text-muted-foreground mb-4">
								Your ultimate destination for authentic football gear and
								sportswear.
							</p>
							<div className="flex gap-4">
								<Button variant="ghost" size="sm">
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
									</svg>
								</Button>
								<Button variant="ghost" size="sm">
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
									</svg>
								</Button>
								<Button variant="ghost" size="sm">
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
									</svg>
								</Button>
							</div>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Quick Links</h4>
							<ul className="space-y-2 text-muted-foreground">
								<li>
									<a href="#" className="hover:text-primary transition-colors">
										About Us
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-primary transition-colors">
										Contact
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-primary transition-colors">
										Size Guide
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-primary transition-colors">
										Shipping Info
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Categories</h4>
							<ul className="space-y-2 text-muted-foreground">
								<li>
									<a href="#" className="hover:text-primary transition-colors">
										Jerseys
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-primary transition-colors">
										Footwear
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-primary transition-colors">
										Accessories
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-primary transition-colors">
										Training Gear
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Contact Info</h4>
							<ul className="space-y-2 text-muted-foreground">
								<li>Email: support@k2fanflex.com</li>
								<li>Phone: +1 (555) 123-4567</li>
								<li>Address: 123 Sports Ave, City, State 12345</li>
							</ul>
						</div>
					</div>

					<div className="border-t mt-8 pt-8 text-center text-muted-foreground">
						<p>&copy; 2024 K2 Fanflex. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
