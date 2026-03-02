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
                <i className="fa-brands fa-whatsapp text-lg" />
              </a>
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#1877f2] hover:scale-110 hover-lift" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f text-lg" />
              </a>
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-gradient-to-br hover:from-[#f09433] hover:to-[#dc2743] hover:scale-110 hover-lift" aria-label="Instagram">
                <i className="fa-brands fa-instagram text-lg" />
              </a>
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#1da1f2] hover:scale-110 hover-lift" aria-label="Twitter">
                <i className="fa-brands fa-twitter text-lg" />
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
                <i className="fa-solid fa-phone mt-0.5 text-[var(--teal)]" />
                <span>+254 704 454556</span>
              </a>
              <a href="mailto:jsbookshop4@gmail.com" className="flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-[var(--yellow)]">
                <i className="fa-solid fa-envelope mt-0.5 text-[var(--teal)]" />
                <span>jsbookshop4@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <i className="fa-solid fa-location-dot mt-0.5 text-[var(--teal)]" />
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
