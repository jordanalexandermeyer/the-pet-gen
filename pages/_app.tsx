import Terms from "@/components/Terms"
import "@/styles/globals.css"
import initializeFirebaseApp from "@/utils/initializeFirebase"
import { FirehoseProvider } from "@/utils/useFirehose"
import { GenerateProvider } from "@/utils/useGenerate"
import { TagProvider } from "@/utils/useTags"
import type { AppProps } from "next/app"
import Script from "next/script"
import { Toaster } from "react-hot-toast"

initializeFirebaseApp()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NEXT_PUBLIC_VERCEL_ENV == "production" && (
        <>
          {/* Google Analytics */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=INSERT_HERE"
          ></Script>
          <Script>
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','INSERT_HERE');`}
          </Script>
        </>
      )}
      <Toaster />
      <Terms />
      <FirehoseProvider>
        <TagProvider>
          <GenerateProvider>
            <Component {...pageProps} />
          </GenerateProvider>
        </TagProvider>
      </FirehoseProvider>
    </>
  )
}
