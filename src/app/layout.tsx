import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const gracela = localFont({
  src: [
    {
      path: "../../public/fonts/gracela/Gracela.woff",
      weight: "400",
      style: "normal",
    },

  ],
  variable: "--font-gracela",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Millenium Marbles",
  description: "Top Imported Italian Marbles & Stones in India",
  verification: {
    google: "zE2V693J7NudAkY0HA9OPZ0g3iZNRsQApkSlajkv1DM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${gracela.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="zE2V693J7NudAkY0HA9OPZ0g3iZNRsQApkSlajkv1DM"
        />
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DJHM7YSB5D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-DJHM7YSB5D');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WGX9T5DT');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className="relative  min-h-full flex flex-col" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WGX9T5DT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <div className="w-full  max-w-[1920px] mx-auto ">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}