import type { Metadata } from 'next' //メタデータの型
import { Inter } from 'next/font/google' //フォントの読み込み
import { getAuthSession } from '@/lib/nextauth' //認証情報取得用のカスタム関数
import './globals.css'
import Navigation from "@/components/auth/Navigation" //ナビゲーション
import AuthProvider from "@/components/providers/AuthProvider" //認証プロバイダー
import ToastProvider from "@/components/providers/ToastProvider" //トーストプロバイダー(通知機能を提供)
const inter = Inter({ subsets: ['latin'] }) // Google FontsからInterを読み込む

export const metadata: Metadata = {
  title: 'Next.js+DRF入門',
  description: 'Next.js+DRF入門',
}

interface RootLayoutProps {
  /*
  コンポーネントが受け取るpropsの型定義
  childrenはこのレイアウトに含まれるコンポーネントのことで、
  ReactNode型はReactで使われる要素の型の一つでJSX・文字列・nullなどが入る
  */
  children: React.ReactNode 
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  //認証情報の取得
  const user = await getAuthSession() //awaitによりgetAuthSession()の返すPromiseの結果を待つ
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AuthProvider user={user}> {/*userに{user}のもつ認証情報を渡し、以下で使用*/}
          <div className="flex min-h-screen flex-col">
            <Navigation /> {/*ナビゲーションバーのレンダリング*/}
            <ToastProvider /> {/*トーストプロバイダーのレンダリング、通知やアラート（トースト通知）を表示する*/}
            
            <main className="container mx-auto max-w-screen-md flex-1 px-2">
              {children}
            </main>

            {/* フッター */}
            <footer className="py-5">
              <div className="text-center text-sm">
                Copyright © All rights reserved | {" "}
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