'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
	Star,
	Heart,
	ShoppingCart,
	Minus,
	Plus,
	Truck,
	Shield,
	RotateCcw,
	Share2,
	Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'

const products = [
	{
		id: 1,
		name: 'Manchester United Home Jersey 2024',
		price: 89.99,
		originalPrice: 109.99,
		images: [
			'/red-manchester-united-football-jersey.png',
			'/red-manchester-united-football-jersey.png',
			'/red-manchester-united-football-jersey.png',
		],
		category: 'Jerseys',
		brand: 'Adidas',
		sizes: ['S', 'M', 'L', 'XL', 'XXL'],
		rating: 4.8,
		reviews: 234,
		isNew: true,
		onSale: true,
		description:
			'The official Manchester United home jersey for the 2024 season. Made with recycled materials and featuring the iconic red design with club crest.',
		features: [
			'100% recycled polyester',
			'Moisture-wicking technology',
			'Official club crest and sponsor logos',
			'Slim fit design',
			'Machine washable',
		],
		inStock: true,
		stockCount: 15,
	},
]

const relatedProducts = [
	{
		id: 2,
		name: 'Manchester United Away Jersey 2024',
		price: 84.99,
		image: '/white-real-madrid-football-jersey.png',
		rating: 4.7,
		reviews: 189,
	},
	{
		id: 3,
		name: 'Manchester United Training Shorts',
		price: 39.99,
		image: '/black-adidas-football-training-shorts.png',
		rating: 4.5,
		reviews: 98,
	},
	{
		id: 4,
		name: 'Adidas Football Boots',
		price: 149.99,
		image: '/black-nike-football-boots-cleats.png',
		rating: 4.9,
		reviews: 156,
	},
	{
		id: 5,
		name: 'Training Gloves',
		price: 29.99,
		image: '/black-puma-goalkeeper-gloves.png',
		rating: 4.6,
		reviews: 78,
	},
]

export default function ProductPage() {
	const params = useParams()
	const productId = Number.parseInt(params.id as string)
	const product = products.find((p) => p.id === productId) || products[0]

	const [selectedImage, setSelectedImage] = useState(0)
	const [selectedSize, setSelectedSize] = useState('')
	const [quantity, setQuantity] = useState(1)
	const [isWishlisted, setIsWishlisted] = useState(false)

	const handleAddToCart = () => {
		if (!selectedSize) {
			alert('Please select a size')
			return
		}
		// Add to cart logic here
		alert(
			`Added ${quantity} x ${product.name} (Size: ${selectedSize}) to cart!`
		)
	}

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
							<Link
								href="/explore"
								className="text-gray-600 hover:text-emerald-600 transition-colors"
							>
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
				{/* Breadcrumb */}
				<nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
					<Link href="/" className="hover:text-emerald-600">
						Home
					</Link>
					<span>/</span>
					<Link href="/explore" className="hover:text-emerald-600">
						Shop
					</Link>
					<span>/</span>
					<span className="text-gray-900">{product.name}</span>
				</nav>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Product Images */}
					<div className="space-y-4">
						<motion.div
							key={selectedImage}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
							className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg"
						>
							<Image
								width={100}
								height={100}
								src={product.images[selectedImage] || '/placeholder.svg'}
								alt={product.name}
								className="w-full h-full object-cover"
							/>
						</motion.div>

						<div className="flex space-x-4 overflow-x-auto">
							{product.images.map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(index)}
									className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
										selectedImage === index
											? 'border-emerald-500 ring-2 ring-emerald-200'
											: 'border-gray-200 hover:border-gray-300'
									}`}
								>
									<Image
										width={100}
										height={100}
										src={image || '/placeholder.svg'}
										alt={`${product.name} ${index + 1}`}
										className="w-full h-full object-cover"
									/>
								</button>
							))}
						</div>
					</div>

					{/* Product Details */}
					<div className="space-y-6">
						<div>
							<div className="flex items-center gap-2 mb-2">
								{product.isNew && <Badge className="bg-emerald-500">New</Badge>}
								{product.onSale && (
									<Badge className="bg-yellow-500">Sale</Badge>
								)}
								<span className="text-sm text-gray-600">{product.brand}</span>
							</div>

							<h1 className="text-3xl font-bold text-gray-900 mb-4">
								{product.name}
							</h1>

							<div className="flex items-center gap-4 mb-4">
								<div className="flex items-center gap-1">
									<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
									<span className="font-medium">{product.rating}</span>
									<span className="text-gray-500">
										({product.reviews} reviews)
									</span>
								</div>
								<Button variant="ghost" size="sm" className="p-0 h-auto">
									Write a review
								</Button>
							</div>

							<div className="flex items-center gap-4 mb-6">
								<span className="text-3xl font-bold text-emerald-600">
									${product.price}
								</span>
								{product.originalPrice && (
									<span className="text-xl text-gray-500 line-through">
										${product.originalPrice}
									</span>
								)}
								{product.onSale && (
									<Badge variant="destructive">
										Save ${(product.originalPrice! - product.price).toFixed(2)}
									</Badge>
								)}
							</div>
						</div>

						{/* Size Selection */}
						<div>
							<h3 className="font-semibold mb-3">Size</h3>
							<div className="grid grid-cols-5 gap-2">
								{product.sizes.map((size) => (
									<Button
										key={size}
										variant={selectedSize === size ? 'default' : 'outline'}
										onClick={() => setSelectedSize(size)}
										className="h-12"
									>
										{size}
									</Button>
								))}
							</div>
							<Button
								variant="ghost"
								size="sm"
								className="mt-2 p-0 h-auto text-emerald-600"
							>
								Size Guide
							</Button>
						</div>

						{/* Quantity */}
						<div>
							<h3 className="font-semibold mb-3">Quantity</h3>
							<div className="flex items-center gap-4">
								<div className="flex items-center border rounded-lg">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										disabled={quantity <= 1}
									>
										<Minus className="h-4 w-4" />
									</Button>
									<span className="px-4 py-2 font-medium">{quantity}</span>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setQuantity(quantity + 1)}
									>
										<Plus className="h-4 w-4" />
									</Button>
								</div>
								<span className="text-sm text-gray-600">
									{product.stockCount} in stock
								</span>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="space-y-4">
							<Button
								onClick={handleAddToCart}
								className="w-full h-12 text-lg font-semibold"
								disabled={!selectedSize}
							>
								<ShoppingCart className="h-5 w-5 mr-2" />
								Add to Cart - ${(product.price * quantity).toFixed(2)}
							</Button>

							<div className="flex gap-4">
								<Button
									variant="outline"
									onClick={() => setIsWishlisted(!isWishlisted)}
									className="flex-1"
								>
									<Heart
										className={`h-4 w-4 mr-2 ${
											isWishlisted ? 'fill-red-500 text-red-500' : ''
										}`}
									/>
									{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
								</Button>
								<Button variant="outline" size="icon">
									<Share2 className="h-4 w-4" />
								</Button>
							</div>
						</div>

						{/* Features */}
						<Card>
							<CardContent className="p-6">
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
									<div className="flex items-center gap-3">
										<Truck className="h-5 w-5 text-emerald-600" />
										<div>
											<p className="font-medium text-sm">Free Shipping</p>
											<p className="text-xs text-gray-600">
												On orders over $75
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<RotateCcw className="h-5 w-5 text-emerald-600" />
										<div>
											<p className="font-medium text-sm">Easy Returns</p>
											<p className="text-xs text-gray-600">
												30-day return policy
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<Shield className="h-5 w-5 text-emerald-600" />
										<div>
											<p className="font-medium text-sm">Authentic</p>
											<p className="text-xs text-gray-600">
												100% genuine products
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Product Details Tabs */}
				<div className="mt-16">
					<Tabs defaultValue="description" className="w-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="description">Description</TabsTrigger>
							<TabsTrigger value="features">Features</TabsTrigger>
							<TabsTrigger value="reviews">
								Reviews ({product.reviews})
							</TabsTrigger>
						</TabsList>

						<TabsContent value="description" className="mt-6">
							<Card>
								<CardContent className="p-6">
									<p className="text-gray-700 leading-relaxed">
										{product.description}
									</p>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="features" className="mt-6">
							<Card>
								<CardContent className="p-6">
									<ul className="space-y-3">
										{product.features.map((feature, index) => (
											<li key={index} className="flex items-center gap-3">
												<div className="w-2 h-2 bg-emerald-500 rounded-full" />
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="reviews" className="mt-6">
							<Card>
								<CardContent className="p-6">
									<div className="text-center py-8">
										<p className="text-gray-600">Reviews coming soon...</p>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>

				{/* Related Products */}
				<div className="mt-16">
					<h2 className="text-2xl font-bold text-gray-900 mb-8">
						Related Products
					</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:hidden">
						{relatedProducts.map((relatedProduct) => (
							<Link
								key={relatedProduct.id}
								href={`/product/${relatedProduct.id}`}
							>
								<Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
									<div className="relative">
										<Image
											width={100}
											height={100}
											src={relatedProduct.image || '/placeholder.svg'}
											alt={relatedProduct.name}
											className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
									<CardContent className="p-4">
										<div className="flex items-center gap-1 mb-2">
											<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
											<span className="text-sm font-medium">
												{relatedProduct.rating}
											</span>
											<span className="text-sm text-gray-500">
												({relatedProduct.reviews})
											</span>
										</div>
										<h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
											{relatedProduct.name}
										</h3>
										<span className="text-lg font-bold text-emerald-600">
											${relatedProduct.price}
										</span>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>

					{/* Horizontal scroll for mobile */}
					<div className="lg:hidden">
						<div className="flex gap-4 overflow-x-auto pb-4">
							{relatedProducts.map((relatedProduct) => (
								<Link
									key={relatedProduct.id}
									href={`/product/${relatedProduct.id}`}
									className="flex-shrink-0 w-64"
								>
									<Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
										<div className="relative">
											<Image
												width={100}
												height={100}
												src={relatedProduct.image || '/placeholder.svg'}
												alt={relatedProduct.name}
												className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
											/>
										</div>
										<CardContent className="p-4">
											<div className="flex items-center gap-1 mb-2">
												<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
												<span className="text-sm font-medium">
													{relatedProduct.rating}
												</span>
												<span className="text-sm text-gray-500">
													({relatedProduct.reviews})
												</span>
											</div>
											<h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
												{relatedProduct.name}
											</h3>
											<span className="text-lg font-bold text-emerald-600">
												${relatedProduct.price}
											</span>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
