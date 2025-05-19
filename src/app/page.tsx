import Footer from '@/components/layouts/common/Footer';
import Main from '@/components/layouts/common/Main';
import Navbar from '@/components/layouts/common/Navbar';
import LandingHero from '@/components/layouts/landing/LandingHero';
import LandingIntermezzo from '@/components/layouts/landing/LandingIntermezzo';
import LandingOngoingCampaigns from '@/components/layouts/landing/LandingOngoingCampaigns';

export default function Home() {

	return (
		<>
			<Navbar isHomePage />
			<Main>
				<LandingHero />
				<LandingIntermezzo />
				<LandingOngoingCampaigns />
			</Main>
			<Footer />
		</>
	);
}