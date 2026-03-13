import { ModalProvider } from '@/contexts/ModalContext';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import About from '@/components/About';
import Programs from '@/components/Programs';
import Competition from '@/components/Competition';
import Team from '@/components/Team';
import Gallery from '@/components/Gallery';
import InstagramStrip from '@/components/InstagramStrip';
import Testimonials from '@/components/Testimonials';
import FreeTrialBanner from '@/components/FreeTrialBanner';
import EnrollmentForm from '@/components/EnrollmentForm';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FreeTrialModal from '@/components/FreeTrialModal';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function HomePage() {
  return (
    <ModalProvider>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Programs />
        <Competition />
        <Team />
        <Gallery />
        <InstagramStrip />
        <Testimonials />
        <FreeTrialBanner />
        <EnrollmentForm />
        <Contact />
      </main>
      <Footer />
      <FreeTrialModal />
      <WhatsAppButton />
    </ModalProvider>
  );
}
