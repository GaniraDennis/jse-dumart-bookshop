import Image from "next/image"
import Link from "next/link"

const quickLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=textbooks", label: "Textbooks" },
  { href: "/shop?category=exercise-books", label: "Exercise Books" },
  { href: "/shop?category=art-supplies", label: "Art Supplies" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
]

const supportLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/cart", label: "Shopping Cart" },
  { href: "/auth/signin", label: "My Account" },
  { href: "/contact", label: "Returns & Refunds" },
  { href: "/contact", label: "Delivery Info" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--navy)] text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-3 hover-lift">
              <div className="animate-bounce-in">
                <Image src="/images/Book Store Shop Logo (1).png" alt="JSEdumart" width={52} height={52} className="rounded-lg bg-white/10 object-contain p-1 drop-shadow-lg" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">JSEdumart</p>
                <p className="text-xs text-[var(--teal)] font-medium">Your Trusted Bookstore</p>
              </div>
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-white/70">
              Your one-stop shop for quality educational materials in Kenya. From textbooks to art supplies, we deliver excellence to your doorstep.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/254704454556" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#25d366] hover:scale-110 hover-lift" aria-label="WhatsApp">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.869 1.171l-.346.194-3.57-.374.76 2.77-.179.286a9.874 9.874 0 001.515 5.031h.001a9.926 9.926 0 005.313 3.116l.552.105 3.635.363-.375-3.548.202-.32c.553-.894.867-1.965.867-3.113 0-5.335-4.343-9.67-9.681-9.67z"/>
                </svg>
              </a>
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#1877f2] hover:scale-110 hover-lift" aria-label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-gradient-to-br hover:from-[#f09433] hover:to-[#dc2743] hover:scale-110 hover-lift" aria-label="Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.769 5.017 15.622 5 12c.017-3.629.285-4.769 1.557-5.892 2.099-.143 6.782-.143 8.883 0 1.271 1.122 1.54 2.271 1.557 5.892-.017 3.621-.285 4.769-1.557 5.892z"/>
                </svg>
              </a>
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#1da1f2] hover:scale-110 hover-lift" aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75-2.25 7-7 7-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0323 3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-[var(--yellow)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Customer Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-[var(--yellow)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contact Us</h3>
            <div className="space-y-3">
              <a href="tel:+254704454556" className="flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-[var(--yellow)]">
                <svg className="h-5 w-5 mt-0.5 text-[var(--teal)] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+254 704 454556</span>
              </a>
              <a href="mailto:jsbookshop4@gmail.com" className="flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-[var(--yellow)]">
                <svg className="h-5 w-5 mt-0.5 text-[var(--teal)] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>jsbookshop4@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <svg className="h-5 w-5 mt-0.5 text-[var(--teal)] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>Kabiria Stage - Dagoretti, Nairobi, Kenya</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <i className="fa-solid fa-clock mt-0.5 text-[var(--teal)]" />
                <div>
                  <p>Mon - Sat: 8:00 AM - 7:00 PM</p>
                  <p>Sun: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment methods & copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} JSEdumart Bookstore. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50">We accept:</span>
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#4caf50] px-2 py-0.5 text-[10px] font-bold text-white">M-PESA</span>
              <i className="fa-brands fa-cc-visa text-lg text-white/50" />
              <i className="fa-brands fa-cc-mastercard text-lg text-white/50" />
              <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/50">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
