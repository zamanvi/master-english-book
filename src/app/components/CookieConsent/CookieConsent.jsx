'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const COOKIE_KEY = 'cookieConsentGiven'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem(COOKIE_KEY, 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1ae5] text-white p-4 shadow-md flex flex-row items-center justify-between gap-4 text-sm ">
      <p className=" max-w-3xl">
        This website uses cookies and third-party technologies to deliver personalized ads, analyze traffic,
        and improve your experience. We do not collect personal data or require user registration. By using
        this site, you consent to the use of cookies.{' '}
        <Link href="/PrivacyPolicy" className="underline hover:text-gray-300">
          Learn more
        </Link>
        .
      </p>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss cookie consent"
        className="text-white hover:text-gray-300 transition"
      >
        <X size={20} />
      </button>
    </div>
  )
}
