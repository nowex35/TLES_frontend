import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getAuthSession } from '@/lib/nextauth'
import './globals.css'
import Navigation from "@/components/auth/Navigation"
import AuthProvider from "@/components/providers/AuthProvider"
import ToastProvider from "@/components/providers/ToastProvider"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js+DRF入門',
  description: 'Next.js+DRF入門',
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  //認証情報の取得
  const user = await getAuthSession()

  return (
    <html lang="ja">
      <body className={inter.className}>
        <AuthProvider user={user}>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <ToastProvider />
            
            <main className="container mx-auto max-w-screen-md flex-1 px-2">
              {children}
            </main>

            {/* フッター */}
            <footer className="py-5">
              <div className="text-center text-sm">
                Copyrighy © All rights reserved | {" "}
                <a 
                href="https://www.youtube.com/@fullstackchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                >
                  FullStack Channel
                </a>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout