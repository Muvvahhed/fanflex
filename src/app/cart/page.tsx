'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	Minus,
	Plus,
	Trash2,
	ShoppingBag,
	ArrowLeft,
	Search,
	ShoppingCart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'

interface CartItem {
	id: string
	name: string
	price: number
	image: string
	size: string
	quantity: number
	category: string
}

const initialCartItems: CartItem[] = [
	{
		id: '1',
		name: 'Manchester United Home Jersey 2024',
		price: 89.99,
		image: '/red-manchester-united-football-jersey.png',
		size: 'L',
		quantity: 1,
		category: 'Jersey',
	},
	{
		id: '2',
		name: 'Nike Mercurial Football Boots',
		price: 159.99,
		image: '/black-nike-football-boots-cleats.png',
		size: '42',
		quantity: 1,
		category: 'Footwear',
	},
	{
		id: '3',
		name: 'Barcelona Away Kit 2024',
		price: 94.99,
		image: '/pink-barcelona-football-jersey-away-kit.png',
		size: 'M',
		quantity: 2,
		category: 'Jersey',
	},
]

export default function CartPage() {
	const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
	const [isCheckingOut, setIsCheckingOut] = useState(false)

	const updateQuantity = (id: string, newQuantity: number) => {
		if (newQuantity < 1) return
		setCartItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, quantity: newQuantity } : item
			)
		)
	}

	const removeItem = (id: string) => {
		setCartItems((items) => items.filter((item) => item.id !== id))
	}

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	)
	const tax = subtotal * 0.08 // 8% tax
	const total = subtotal + tax

	const handleCheckout = () => {
		setIsCheckingOut(true)
		// Simulate checkout process
		setTimeout(() => {
			setIsCheckingOut(false)
			alert('Checkout functionality would be implemented here!')
		}, 2000)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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

			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
				>
					<Link
						href="/explore"
						className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4 transition-colors"
					>
						<ArrowLeft className="h-4 w-4" />
						Continue Shopping
					</Link>
					<div className="flex items-center gap-3">
						<ShoppingBag className="h-8 w-8 text-emerald-600" />
						<h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
						<Badge
							variant="secondary"
							className="bg-emerald-100 text-emerald-700"
						>
							{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
						</Badge>
					</div>
				</motion.div>

				{cartItems.length === 0 ? (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						className="text-center py-16"
					>
						<ShoppingBag className="h-16 w-16 text-slate-400 mx-auto mb-4" />
						<h2 className="text-2xl font-semibold text-slate-700 mb-2">
							Your cart is empty
						</h2>
						<p className="text-slate-500 mb-6">
							Add some amazing sports gear to get started!
						</p>
						<Button asChild className="bg-emerald-600 hover:bg-emerald-700">
							<Link href="/explore">Start Shopping</Link>
						</Button>
					</motion.div>
				) : (
					<div className="grid lg:grid-cols-3 gap-8">
						{/* Cart Items */}
						<div className="lg:col-span-2 space-y-4">
							<AnimatePresence>
								{cartItems.map((item, index) => (
									<motion.div
										key={item.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, x: -100 }}
										transition={{ delay: index * 0.1 }}
									>
										<Card className="overflow-hidden hover:shadow-lg transition-shadow">
											<CardContent className="p-0">
												{/* Mobile Layout */}
												<div className="block md:hidden p-4">
													<div className="flex gap-4">
														<div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100">
															<Image
																src={item.image || '/placeholder.svg'}
																alt={item.name}
																fill
																className="object-cover"
															/>
														</div>
														<div className="flex-1 min-w-0">
															<h3 className="font-semibold text-slate-900 truncate">
																{item.name}
															</h3>
															<p className="text-sm text-slate-500">
																Size: {item.size}
															</p>
															<p className="text-lg font-bold text-emerald-600">
																${item.price}
															</p>
														</div>
													</div>
													<div className="flex items-center justify-between mt-4">
														<div className="flex items-center gap-2">
															<Button
																variant="outline"
																size="sm"
																onClick={() =>
																	updateQuantity(item.id, item.quantity - 1)
																}
																className="h-8 w-8 p-0"
															>
																<Minus className="h-3 w-3" />
															</Button>
															<span className="w-8 text-center font-medium">
																{item.quantity}
															</span>
															<Button
																variant="outline"
																size="sm"
																onClick={() =>
																	updateQuantity(item.id, item.quantity + 1)
																}
																className="h-8 w-8 p-0"
															>
																<Plus className="h-3 w-3" />
															</Button>
														</div>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => removeItem(item.id)}
															className="text-red-500 hover:text-red-700 hover:bg-red-50"
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</div>

												{/* Desktop Layout */}
												<div className="hidden md:block">
													<div className="flex items-center p-6 gap-6">
														<div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-100">
															<Image
																src={item.image || '/placeholder.svg'}
																alt={item.name}
																fill
																className="object-cover"
															/>
														</div>
														<div className="flex-1 min-w-0">
															<h3 className="text-lg font-semibold text-slate-900">
																{item.name}
															</h3>
															<p className="text-slate-500">
																Size: {item.size}
															</p>
															<Badge variant="outline" className="mt-1">
																{item.category}
															</Badge>
														</div>
														<div className="text-right">
															<p className="text-xl font-bold text-emerald-600">
																${item.price}
															</p>
														</div>
														<div className="flex items-center gap-2">
															<Button
																variant="outline"
																size="sm"
																onClick={() =>
																	updateQuantity(item.id, item.quantity - 1)
																}
																className="h-8 w-8 p-0"
															>
																<Minus className="h-3 w-3" />
															</Button>
															<span className="w-12 text-center font-medium">
																{item.quantity}
															</span>
															<Button
																variant="outline"
																size="sm"
																onClick={() =>
																	updateQuantity(item.id, item.quantity + 1)
																}
																className="h-8 w-8 p-0"
															>
																<Plus className="h-3 w-3" />
															</Button>
														</div>
														<div className="text-right">
															<p className="text-lg font-bold text-slate-900">
																${(item.price * item.quantity).toFixed(2)}
															</p>
														</div>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => removeItem(item.id)}
															className="text-red-500 hover:text-red-700 hover:bg-red-50"
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</AnimatePresence>
						</div>

						{/* Cart Summary */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							className="lg:sticky lg:top-8 h-fit"
						>
							<Card className="shadow-lg">
								<CardContent className="p-6">
									<h2 className="text-xl font-bold text-slate-900 mb-4">
										Order Summary
									</h2>

									<div className="space-y-3">
										<div className="flex justify-between text-slate-600">
											<span>
												Subtotal (
												{cartItems.reduce(
													(sum, item) => sum + item.quantity,
													0
												)}{' '}
												items)
											</span>
											<span>${subtotal.toFixed(2)}</span>
										</div>
										<div className="flex justify-between text-slate-600">
											<span>Tax (8%)</span>
											<span>${tax.toFixed(2)}</span>
										</div>
										<div className="flex justify-between text-slate-600">
											<span>Shipping</span>
											<span className="text-emerald-600 font-medium">FREE</span>
										</div>
										<Separator />
										<div className="flex justify-between text-lg font-bold text-slate-900">
											<span>Total</span>
											<span>${total.toFixed(2)}</span>
										</div>
									</div>

									<Button
										onClick={handleCheckout}
										disabled={isCheckingOut}
										className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3"
									>
										{isCheckingOut ? (
											<motion.div
												animate={{ rotate: 360 }}
												transition={{
													duration: 1,
													repeat: Number.POSITIVE_INFINITY,
													ease: 'linear',
												}}
												className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
											/>
										) : (
											'Proceed to Checkout'
										)}
									</Button>

									<p className="text-xs text-slate-500 text-center mt-3">
										Secure checkout with SSL encryption
									</p>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				)}
			</div>
		</div>
	)
}
