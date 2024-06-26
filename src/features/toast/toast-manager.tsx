'use client'

import { Toast } from '@/components/ui/toast'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useToastStore } from './store'

export default function ToastManager() {
	const toasts = useToastStore((state) => state.toasts)
	const timeout = useRef<NodeJS.Timeout>()

	useEffect(() => {
		if (toasts) {
			timeout.current = setTimeout(() => {
				useToastStore.setState({ toasts: null })

				clearTimeout(timeout.current)
			}, 3000)
		}

		return () => {
			clearTimeout(timeout.current)
		}
	}, [toasts])

	return (
		<section className="absolute top-16 z-10 flex w-full items-center justify-center">
			<AnimatePresence mode="wait">
				{toasts && (
					<Toast key={toasts.id} className="absolute w-[800px]">
						<span className="font-extrabold text-[#FFF0C7] text-xl tracking-wide">{toasts.content}</span>
					</Toast>
				)}
			</AnimatePresence>
		</section>
	)
}
