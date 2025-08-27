'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// Mock product data
const mockProduct = {
	id: '1',
	name: 'Manchester United Home Jersey 2024',
	price: 89.99,
	description:
		'Official Manchester United home jersey for the 2024 season. Made with premium materials and featuring the classic red design with club crest.',
	category: 'jersey',
	stock: 45,
	image: '/red-manchester-united-football-jersey.png',
}

export default function EditProductPage() {
	const [formData, setFormData] = useState({
		name: '',
		price: '',
		description: '',
		category: '',
		stock: '',
		image: null as File | null,
	})
	const [isLoading, setIsLoading] = useState(false)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const router = useRouter()
	// const params = useParams()

	useEffect(() => {
		// Load product data (in real app, fetch from API)
		setFormData({
			name: mockProduct.name,
			price: mockProduct.price.toString(),
			description: mockProduct.description,
			category: mockProduct.category,
			stock: mockProduct.stock.toString(),
			image: null,
		})
		setImagePreview(mockProduct.image)
	}, [])

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setFormData((prev) => ({ ...prev, image: file }))
			const reader = new FileReader()
			reader.onload = () => setImagePreview(reader.result as string)
			reader.readAsDataURL(file)
		}
	}

	const removeImage = () => {
		setFormData((prev) => ({ ...prev, image: null }))
		setImagePreview(null)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		// Simulate product update
		setTimeout(() => {
			setIsLoading(false)
			alert('Product updated successfully!')
			router.push('/admin/dashboard')
		}, 2000)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
				>
					<Link
						href="/admin/dashboard"
						className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4 transition-colors"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to Dashboard
					</Link>
					<h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>
					<p className="text-slate-600">
						Update product information and details
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="max-w-2xl mx-auto"
				>
					<Card className="shadow-lg bg-white">
						<CardHeader>
							<CardTitle>Product Information</CardTitle>
							<CardDescription>
								Update the details for this product
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Product Name */}
								<div className="space-y-2">
									<Label htmlFor="name">Product Name *</Label>
									<Input
										id="name"
										placeholder="e.g., Manchester United Home Jersey 2024"
										value={formData.name}
										onChange={(e) => handleInputChange('name', e.target.value)}
										required
									/>
								</div>

								{/* Price and Stock */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="price">Price ($) *</Label>
										<Input
											id="price"
											type="number"
											step="0.01"
											placeholder="89.99"
											value={formData.price}
											onChange={(e) =>
												handleInputChange('price', e.target.value)
											}
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="stock">Stock Quantity *</Label>
										<Input
											id="stock"
											type="number"
											placeholder="50"
											value={formData.stock}
											onChange={(e) =>
												handleInputChange('stock', e.target.value)
											}
											required
										/>
									</div>
								</div>

								{/* Category */}
								<div className="space-y-2">
									<Label htmlFor="category">Category *</Label>
									<Select
										value={formData.category}
										onValueChange={(value) =>
											handleInputChange('category', value)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="jersey">Jersey</SelectItem>
											<SelectItem value="footwear">Footwear</SelectItem>
											<SelectItem value="accessories">Accessories</SelectItem>
											<SelectItem value="apparel">Apparel</SelectItem>
											<SelectItem value="equipment">Equipment</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{/* Description */}
								<div className="space-y-2">
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
										placeholder="Describe the product features, materials, and benefits..."
										value={formData.description}
										onChange={(e) =>
											handleInputChange('description', e.target.value)
										}
										rows={4}
									/>
								</div>

								{/* Image Upload */}
								<div className="space-y-2">
									<Label>Product Image</Label>
									<div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center relative">
										{imagePreview ? (
											<div className="relative">
												<Image
													width={300}
													height={192}
													src={imagePreview || '/placeholder.svg'}
													alt="Product preview"
													className="max-w-full h-48 object-cover mx-auto rounded-lg"
												/>
												<Button
													type="button"
													variant="destructive"
													size="sm"
													className="absolute top-2 right-2 z-10"
													onClick={removeImage}
												>
													<X className="h-4 w-4" />
												</Button>
											</div>
										) : (
											<label
												htmlFor="image-upload"
												className="cursor-pointer block"
											>
												<Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
												<p className="text-slate-600 mb-2">
													Click to upload product image
												</p>
												<p className="text-sm text-slate-500">
													PNG, JPG up to 10MB
												</p>
											</label>
										)}
										<input
											id="image-upload"
											type="file"
											accept="image/*"
											onChange={handleImageChange}
											className="hidden"
										/>
									</div>
								</div>

								{/* Submit Buttons */}
								<div className="flex flex-col sm:flex-row gap-4 pt-6">
									<Button
										type="submit"
										disabled={isLoading}
										className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
									>
										{isLoading ? (
											<motion.div
												animate={{ rotate: 360 }}
												transition={{
													duration: 1,
													repeat: Number.POSITIVE_INFINITY,
													ease: 'linear',
												}}
												className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
											/>
										) : null}
										{isLoading ? 'Updating Product...' : 'Update Product'}
									</Button>
									<Button
										type="button"
										variant="outline"
										onClick={() => router.push('/admin/dashboard')}
										className="flex-1"
									>
										Cancel
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	)
}
