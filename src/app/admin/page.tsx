'use client'

import type React from 'react'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Shield, User } from 'lucide-react'
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
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		// Simulate login process
		setTimeout(() => {
			setIsLoading(false)
			if (email === 'admin@k2fanflex.com' && password === 'admin123') {
				router.push('/admin/dashboard')
			} else {
				alert('Invalid credentials. Use admin@k2fanflex.com / admin123')
			}
		}, 1500)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-yellow-50 flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-md"
			>
				<Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
					<CardHeader className="text-center pb-8">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2 }}
							className="mx-auto w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4"
						>
							<Shield className="h-8 w-8 text-white" />
						</motion.div>
						<CardTitle className="text-2xl font-bold text-slate-900">
							K2 Fanflex Admin
						</CardTitle>
						<CardDescription className="text-slate-600">
							Sign in to access the admin dashboard
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleLogin} className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="email" className="text-slate-700 font-medium">
									Email
								</Label>
								<div className="relative">
									<User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
									<Input
										id="email"
										type="email"
										placeholder="admin@k2fanflex.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="pl-10 h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="password"
									className="text-slate-700 font-medium"
								>
									Password
								</Label>
								<div className="relative">
									<Input
										id="password"
										type={showPassword ? 'text' : 'password'}
										placeholder="Enter your password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="pr-10 h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
										required
									/>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4 text-slate-400" />
										) : (
											<Eye className="h-4 w-4 text-slate-400" />
										)}
									</Button>
								</div>
							</div>

							<Button
								type="submit"
								disabled={isLoading}
								className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
							>
								{isLoading ? (
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
									'Sign In'
								)}
							</Button>
						</form>

						<div className="mt-6 p-4 bg-slate-50 rounded-lg">
							<p className="text-xs text-slate-600 text-center">
								Demo credentials:
								<br />
								<span className="font-mono">admin@k2fanflex.com</span>
								<br />
								<span className="font-mono">admin123</span>
							</p>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	)
}
