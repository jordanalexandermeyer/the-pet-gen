import Head from "next/head"
import BottomNavbar from "./BottomNavbar"
import TopNavbar from "./TopNavbar"

type LayoutProps = {
  children: React.ReactNode
  title?: string
  description?: string
}

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title || "The Pet Gen"}</title>
        <meta
          name="description"
          content={
            description ||
            "With just a few clicks, ThePetGen generates an image of your dream pet. Create whatever you want, or browse other user-created pets!"
          }
        ></meta>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="application-name" content="The Pet Gen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopNavbar />
        <BottomNavbar />
        <div className="pb-14 sm:pb-0 pt-14 top-14 bg-zinc-800 overflow-x-hidden min-h-screen">
          {children}
        </div>
      </main>
    </>
  )
}
