'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
	Package,
	Plus,
	Search,
	Edit,
	Trash2,
	Eye,
	Filter,
	Download,
	Users,
	ShoppingCart,
	DollarSign,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Product {
	id: string
	name: string
	price: number
	stock: number
	category: string
	image: string
	status: 'active' | 'inactive'
}

const mockProducts: Product[] = [
	{
		id: '1',
		name: 'Manchester United Home Jersey 2024',
		price: 89.99,
		stock: 45,
		category: 'Jersey',
		image: '/red-manchester-united-football-jersey.png',
		status: 'active',
	},
	{
		id: '2',
		name: 'Nike Mercurial Football Boots',
		price: 159.99,
		stock: 23,
		category: 'Footwear',
		image: '/black-nike-football-boots-cleats.png',
		status: 'active',
	},
	{
		id: '3',
		name: 'Barcelona Away Kit 2024',
		price: 94.99,
		stock: 12,
		category: 'Jersey',
		image: '/pink-barcelona-football-jersey-away-kit.png',
		status: 'active',
	},
	{
		id: '4',
		name: 'Adidas Training Shorts',
		price: 34.99,
		stock: 67,
		category: 'Apparel',
		image: '/black-adidas-football-training-shorts.png',
		status: 'active',
	},
	{
		id: '5',
		name: 'Puma Goalkeeper Gloves',
		price: 49.99,
		stock: 8,
		category: 'Accessories',
		image: '/black-puma-goalkeeper-gloves.png',
		status: 'inactive',
	},
]

export default function AdminDashboard() {
	const [products, setProducts] = useState<Product[]>(mockProducts)
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const router = useRouter()

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.category.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const deleteProduct = (id: string) => {
		setProducts(products.filter((p) => p.id !== id))
	}

	const stats = [
		{
			title: 'Total Products',
			value: products.length,
			icon: Package,
			color: 'text-emerald-600',
			bgColor: 'bg-emerald-100',
		},
		{
			title: 'Total Revenue',
			value: '$12,847',
			icon: DollarSign,
			color: 'text-yellow-600',
			bgColor: 'bg-yellow-100',
		},
		{
			title: 'Active Orders',
			value: '23',
			icon: ShoppingCart,
			color: 'text-blue-600',
			bgColor: 'bg-blue-100',
		},
		{
			title: 'Customers',
			value: '1,247',
			icon: Users,
			color: 'text-purple-600',
			bgColor: 'bg-purple-100',
		},
	]

	return (
		<div className="min-h-screen bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
				>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-3xl font-bold text-slate-900">
								Admin Dashboard
							</h1>
							<p className="text-slate-600">
								Manage your K2 Fanflex inventory and orders
							</p>
						</div>
						<Button
							onClick={() => router.push('/admin/product/new')}
							className="bg-emerald-600 hover:bg-emerald-700 text-white"
						>
							<Plus className="h-4 w-4 mr-2" />
							Add Product
						</Button>
					</div>
				</motion.div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<Card className="hover:shadow-lg transition-shadow bg-white border-1">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-medium text-slate-600">
												{stat.title}
											</p>
											<p className="text-2xl font-bold text-slate-900">
												{stat.value}
											</p>
										</div>
										<div className={`p-3 rounded-full ${stat.bgColor}`}>
											<stat.icon className={`h-6 w-6 ${stat.color}`} />
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>

				{/* Inventory Management */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<Card className="shadow-lg bg-white">
						<CardHeader>
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
								<div>
									<CardTitle className="text-xl">
										Inventory Management
									</CardTitle>
									<CardDescription>
										Manage your product catalog and stock levels
									</CardDescription>
								</div>
								<div className="flex gap-2">
									<Button variant="outline" size="sm">
										<Filter className="h-4 w-4 mr-2" />
										Filter
									</Button>
									<Button variant="outline" size="sm">
										<Download className="h-4 w-4 mr-2" />
										Export
									</Button>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							{/* Search */}
							<div className="relative mb-6">
								<Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
								<Input
									placeholder="Search products..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>

							{/* Mobile Cards */}
							<div className="block md:hidden space-y-4">
								{filteredProducts.map((product) => (
									<Card key={product.id} className="overflow-hidden">
										<CardContent className="p-4">
											<div className="flex gap-4">
												<div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100">
													<Image
														src={product.image || '/placeholder.svg'}
														alt={product.name}
														fill
														className="object-cover"
													/>
												</div>
												<div className="flex-1 min-w-0">
													<h3 className="font-semibold text-slate-900 truncate">
														{product.name}
													</h3>
													<p className="text-sm text-slate-500">
														{product.category}
													</p>
													<div className="flex items-center gap-2 mt-1">
														<span className="text-lg font-bold text-emerald-600">
															${product.price}
														</span>
														<Badge
															variant={
																product.stock > 20
																	? 'default'
																	: product.stock > 0
																	? 'secondary'
																	: 'destructive'
															}
														>
															{product.stock} in stock
														</Badge>
													</div>
												</div>
											</div>
											<div className="flex gap-2 mt-4">
												<Dialog>
													<DialogTrigger asChild>
														<Button
															variant="outline"
															size="sm"
															onClick={() => setSelectedProduct(product)}
														>
															<Eye className="h-3 w-3 mr-1" />
															View
														</Button>
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>{selectedProduct?.name}</DialogTitle>
															<DialogDescription>
																Product details and information
															</DialogDescription>
														</DialogHeader>
														{selectedProduct && (
															<div className="space-y-4">
																<div className="relative w-full h-48 rounded-lg overflow-hidden bg-slate-100">
																	<Image
																		src={
																			selectedProduct.image ||
																			'/placeholder.svg'
																		}
																		alt={selectedProduct.name}
																		fill
																		className="object-cover"
																	/>
																</div>
																<div className="grid grid-cols-2 gap-4">
																	<div>
																		<p className="text-sm text-slate-500">
																			Price
																		</p>
																		<p className="font-semibold">
																			${selectedProduct.price}
																		</p>
																	</div>
																	<div>
																		<p className="text-sm text-slate-500">
																			Stock
																		</p>
																		<p className="font-semibold">
																			{selectedProduct.stock} units
																		</p>
																	</div>
																	<div>
																		<p className="text-sm text-slate-500">
																			Category
																		</p>
																		<p className="font-semibold">
																			{selectedProduct.category}
																		</p>
																	</div>
																	<div>
																		<p className="text-sm text-slate-500">
																			Status
																		</p>
																		<Badge
																			variant={
																				selectedProduct.status === 'active'
																					? 'default'
																					: 'secondary'
																			}
																		>
																			{selectedProduct.status}
																		</Badge>
																	</div>
																</div>
															</div>
														)}
													</DialogContent>
												</Dialog>
												<Button
													variant="outline"
													size="sm"
													onClick={() =>
														router.push(`/admin/product/${product.id}`)
													}
												>
													<Edit className="h-3 w-3 mr-1" />
													Edit
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={() => deleteProduct(product.id)}
													className="text-red-500 hover:text-red-700"
												>
													<Trash2 className="h-3 w-3" />
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
							</div>

							{/* Desktop Table */}
							<div className="hidden md:block">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Product</TableHead>
											<TableHead>Category</TableHead>
											<TableHead>Price</TableHead>
											<TableHead>Stock</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredProducts.map((product) => (
											<TableRow key={product.id}>
												<TableCell>
													<div className="flex items-center gap-3">
														<div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
															<Image
																src={product.image || '/placeholder.svg'}
																alt={product.name}
																fill
																className="object-cover"
															/>
														</div>
														<div>
															<p className="font-medium text-slate-900">
																{product.name}
															</p>
															<p className="text-sm text-slate-500">
																ID: {product.id}
															</p>
														</div>
													</div>
												</TableCell>
												<TableCell>
													<Badge variant="outline">{product.category}</Badge>
												</TableCell>
												<TableCell className="font-medium">
													${product.price}
												</TableCell>
												<TableCell>
													<Badge
														variant={
															product.stock > 20
																? 'default'
																: product.stock > 0
																? 'secondary'
																: 'destructive'
														}
													>
														{product.stock} units
													</Badge>
												</TableCell>
												<TableCell>
													<Badge
														variant={
															product.status === 'active'
																? 'default'
																: 'secondary'
														}
													>
														{product.status}
													</Badge>
												</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end gap-2">
														<Dialog>
															<DialogTrigger asChild>
																<Button
																	variant="ghost"
																	size="sm"
																	onClick={() => setSelectedProduct(product)}
																>
																	<Eye className="h-4 w-4" />
																</Button>
															</DialogTrigger>
															<DialogContent>
																<DialogHeader>
																	<DialogTitle>
																		{selectedProduct?.name}
																	</DialogTitle>
																	<DialogDescription>
																		Product details and information
																	</DialogDescription>
																</DialogHeader>
																{selectedProduct && (
																	<div className="space-y-4">
																		<div className="relative w-full h-48 rounded-lg overflow-hidden bg-slate-100">
																			<Image
																				src={
																					selectedProduct.image ||
																					'/placeholder.svg'
																				}
																				alt={selectedProduct.name}
																				fill
																				className="object-cover"
																			/>
																		</div>
																		<div className="grid grid-cols-2 gap-4">
																			<div>
																				<p className="text-sm text-slate-500">
																					Price
																				</p>
																				<p className="font-semibold">
																					${selectedProduct.price}
																				</p>
																			</div>
																			<div>
																				<p className="text-sm text-slate-500">
																					Stock
																				</p>
																				<p className="font-semibold">
																					{selectedProduct.stock} units
																				</p>
																			</div>
																			<div>
																				<p className="text-sm text-slate-500">
																					Category
																				</p>
																				<p className="font-semibold">
																					{selectedProduct.category}
																				</p>
																			</div>
																			<div>
																				<p className="text-sm text-slate-500">
																					Status
																				</p>
																				<Badge
																					variant={
																						selectedProduct.status === 'active'
																							? 'default'
																							: 'secondary'
																					}
																				>
																					{selectedProduct.status}
																				</Badge>
																			</div>
																		</div>
																	</div>
																)}
															</DialogContent>
														</Dialog>
														<Button
															variant="ghost"
															size="sm"
															onClick={() =>
																router.push(`/admin/product/${product.id}`)
															}
														>
															<Edit className="h-4 w-4" />
														</Button>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => deleteProduct(product.id)}
															className="text-red-500 hover:text-red-700"
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	)
}
