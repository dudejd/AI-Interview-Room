import Hero from "@/components/Hero";
import OnboardingPopup from "@/components/OnboardingPopup";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <OnboardingPopup />

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-glass-border glass mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">AI Interview Room</h3>
            <p className="text-sm text-foreground/60">The future of career preparation powered by cutting edge AI.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="text-sm space-y-2 text-foreground/60">
              <li><a href="/how-it-works" className="hover:text-primary transition-colors">How it works</a></li>
              <li><a href="/pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="text-sm space-y-2 text-foreground/60">
              <li><a href="/interview-tips" className="hover:text-primary transition-colors">Interview Tips</a></li>
              <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              {/* Social icons could go here */}
              <div className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-primary transition-colors cursor-pointer">In</div>
              <div className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-primary transition-colors cursor-pointer">Tw</div>
              <div className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-primary transition-colors cursor-pointer">Gh</div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-glass-border text-center text-xs text-foreground/40">
          &copy; 2026 AI Interview Room. All rights reserved. Built with futuristic precision.
        </div>
      </footer>
    </div>
  );
}
