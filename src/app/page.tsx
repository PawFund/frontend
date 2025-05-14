import LandingHero from '@/components/layouts/LandingHero';
import LandingIntermezzo from '@/components/layouts/LandingIntermezzo';
import LandingOngoingCampaigns from '@/components/layouts/LandingOngoingCampaigns';

export default function Home() {

	return (
		<>
			<LandingHero/>
			<LandingIntermezzo/>
			<LandingOngoingCampaigns/>
		</>
	);
}
