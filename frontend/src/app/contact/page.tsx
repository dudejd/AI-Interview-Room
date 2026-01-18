import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Get in Touch</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <p className="text-foreground/70 text-lg">Have questions about the platform? Need help with your account? We're here to help.</p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 glass p-4 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Mail size={20} /></div>
                            <div>
                                <div className="text-xs text-foreground/50 uppercase font-bold">Email Us</div>
                                <div className="text-foreground">support@ai-interview.com</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 glass p-4 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary"><Phone size={20} /></div>
                            <div>
                                <div className="text-xs text-foreground/50 uppercase font-bold">Call Us</div>
                                <div className="text-foreground">+1 (555) 123-4567</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 glass p-4 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-white"><MapPin size={20} /></div>
                            <div>
                                <div className="text-xs text-foreground/50 uppercase font-bold">Visit Us</div>
                                <div className="text-foreground">123 Tech Park, Silicon Valley, CA</div>
                            </div>
                        </div>
                    </div>
                </div>

                <form className="glass p-8 rounded-2xl border-white/10 space-y-4">
                    <h3 className="text-xl font-bold mb-4">Send us a message</h3>
                    <div>
                        <label className="text-xs uppercase font-bold text-foreground/50 mb-1 block">Name</label>
                        <input type="text" className="w-full bg-black/20 border border-white/10 p-3 rounded-lg outline-none focus:border-primary/50" />
                    </div>
                    <div>
                        <label className="text-xs uppercase font-bold text-foreground/50 mb-1 block">Email</label>
                        <input type="email" className="w-full bg-black/20 border border-white/10 p-3 rounded-lg outline-none focus:border-primary/50" />
                    </div>
                    <div>
                        <label className="text-xs uppercase font-bold text-foreground/50 mb-1 block">Message</label>
                        <textarea rows={4} className="w-full bg-black/20 border border-white/10 p-3 rounded-lg outline-none focus:border-primary/50"></textarea>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-black shadow-lg">Send Message</button>
                </form>
            </div>
        </div>
    )
}
