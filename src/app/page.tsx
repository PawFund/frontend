"use client"

import LandingHero from '@/components/layouts/LandingHero';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useSignMessage } from 'wagmi'

export default function Home() {

	const { signMessage } = useSignMessage()

	return (
		<>
			<LandingHero/>
		</>
	);
}
