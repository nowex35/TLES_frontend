import type { Metadata } from 'next' //メタデータの型
import { Inter } from 'next/font/google' //フォントの読み込み
import { getAuthSession } from '@/components/lib/nextauth' //認証情報取得用のカスタム関数
import './globals.css'
import Navigation from "@/components/auth/Navigation" //ナビゲーション
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import MySidebar from "@/components/sidebar/Sidebar"
import AuthProvider from "@/components/providers/AuthProvider" //認証プロバイダー
import ToastProvider from "@/components/providers/ToastProvider" //トーストプロバイダー(通知機能を提供)
const inter = Inter({ subsets: ['latin'] }) // Google FontsからInterを読み込む

export const metadata: Metadata = {
  title: 'TLES',
  description: 'チケット分析アプリ',
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
        <SidebarProvider>
          <AuthProvider > {/*userに{user}のもつ認証情報を渡し、以下で使用*/}
            <ToastProvider /> {/*トーストプロバイダーのレンダリング、通知やアラート（トースト通知）を表示する*/}
            <MySidebar user={user} />
            <main className="container mx-auto max-w-screen-md flex-1 px-2 py-10">
              {children}
            </main>
          </AuthProvider>
        </SidebarProvider>
      </body>
    </html>
  )
}

export default RootLayout