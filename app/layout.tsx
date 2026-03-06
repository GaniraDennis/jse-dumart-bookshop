import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
import Script from "next/script"

import "./globals.css"
import { LoadingScreen } from "@/components/loading-screen"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFAB } from "@/components/whatsapp-fab"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "JSEdumart - Best Online Bookstore in Kenya | Books, Textbooks & Stationery",
  description:
    "JSEdumart is Kenya's leading online bookstore. Shop quality KLB textbooks, exercise books, stationery, art supplies & office materials. Fast delivery in Nairobi. M-Pesa accepted. 📚",
  keywords:
    "bookstore Kenya, textbooks Kenya, stationery shop Kenya, KLB books, school supplies Nairobi, buy books online Kenya, educational materials, art supplies Kenya, M-Pesa bookstore",
  authors: [{ name: "JSEdumart Team" }],
  creator: "JSEdumart",
  publisher: "JSEdumart Bookstore",
  metadataBase: new URL('https://jsdumart.com'),
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://jsdumart.com",
    siteName: "JSEdumart Bookstore",
    title: "JSEdumart - Your Trusted Online Bookstore in Kenya",
    description: "Quality books, textbooks, and stationery delivered fast across Kenya. Best prices with M-Pesa payment.",
    images: [
      {
        url: "/images/Book Store Shop Logo (1).png",
        width: 1200,
        height: 630,
        alt: "JSEdumart Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSEdumart - Kenya's Best Online Bookstore",
    description: "Quality books and stationery with fast delivery. Shop now!",
    images: ["/images/Book Store Shop Logo (1).png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://jsdumart.com",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a365d",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1a365d" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="JSEdumart" />
        
        {/* FontAwesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-EvBWYkDuq1Om4i33k/4vM5VIqH5DP+6l7ZGYdNm9xVbVJRYgCM7z7Yt5+lfAC4wMKAHxq1M5cVXrpN4eSKHdg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          media="all"
        />
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          as="style"
          media="all"
        />

        
        {/* JSON-LD Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "JSEdumart Bookstore",
              image: "https://jsdumart.com/images/Book Store Shop Logo (1).png",
              description: "Kenya's trusted online bookstore for educational materials",
              url: "https://jsdumart.com",
              telephone: "+254704454556",
              email: "jsbookshop4@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kabiria Stage - Dagoretti",
                addressLocality: "Nairobi",
                addressRegion: "Nairobi",
                postalCode: "00100",
                addressCountry: "KE",
              },
              sameAs: [
                "https://wa.me/254704454556",
                "https://www.facebook.com/jsdumart",
                "https://www.instagram.com/jsdumart",
              ],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
        <AuthProvider>
          <CartProvider>
            <LoadingScreen />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppFAB />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
