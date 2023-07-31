import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Modal from "./Modal"

export default function Terms() {
  const [showTermsModal, setShowTermsModal] = useState(false)
  const router = useRouter()

  const excludedPages = ["/terms"]

  useEffect(() => {
    const hasAcceptedTerms = localStorage.getItem("accepted_terms")
    if (
      hasAcceptedTerms != "true" &&
      !excludedPages.includes(router.pathname)
    ) {
      setShowTermsModal(true)
      document.body.style.overflow = "hidden"
    } else {
      setShowTermsModal(false)
      document.body.style.overflow = "auto"
    }
  }, [router.pathname])

  const handleAccept = () => {
    localStorage.setItem("accepted_terms", "true")
    setShowTermsModal(false)
    document.body.style.overflow = "auto"
  }

  const handleDecline = () => {
    window.location.href = "https://google.com"
  }

  return (
    <>
      {showTermsModal && (
        <Modal
          setShowModal={setShowTermsModal}
          showEscape={false}
          allowClickOutsideToDismiss={false}
        >
          <div className="max-w-xl flex flex-col gap-6 p-6">
            <div className="space-y-4 text-left">
              <h3 className="text-2xl text-center font-bold leading-6 pb-2">
                The Pet Gen
              </h3>
              <p className="font-semibold text-red-600">
                Warning, this site is for pet lovers only. It contains
                AI-generated images of fantastical pets.
              </p>
              <p>
                By entering this website, I recognize that I am a pet lover. By
                using the site, you agree to our{" "}
                <Link href="/terms" className="underline">
                  Terms of Service
                </Link>
                .We use cookies for basic analytics and spam detection.
              </p>
              <p>
                Any generations of content on this website that resemble real
                pets are purely coincidental.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                className="flex items-center overflow-hidden justify-center rounded-lg text-white bg-blue-700 px-4 py-2"
                type="button"
                onClick={() => {
                  handleAccept()
                }}
              >
                I accept
              </button>
              <button
                className="flex items-center overflow-hidden justify-center rounded-lg text-gray-900 border border-gray-200 px-4 py-2"
                type="button"
                onClick={() => {
                  handleDecline()
                }}
              >
                Decline
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
