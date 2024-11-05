"use client"

import { Button } from "@/components/ui/button"
import { UserType } from "@/components/lib/nextauth"
import UserNavigation from "@/components/auth/UserNavigation"
import Link from "next/link"

interface NavigationProps {
    user: UserType | null //ユーザー情報の型で、存在するならUserTypeを、存在しないならnullを指定
}
//ナビゲーション
const Navigation = ({ user }:NavigationProps) => {
    return (
        <header className="shadow-lg shadow-gray-100 mb-10">
            <div className="container mx-auto flex max-w-screen-md items-center justify-between">
                <Link href="/" className="cursor-pointer text-xl font-bold">
                TLEye's System
                </Link>
                {user ? (
                    <div>
                        <UserNavigation user={user} />
                    </div>
                    ) : (
                        <div className="flex items-center space-x-1">
                            <Button asChild variant="ghost" className="font-bold">
                                <Link href="/login">ログイン</Link>
                            </Button>
                            <Button asChild variant="default" className="font-bold">
                                <Link href="/signup">新規登録</Link>
                            </Button>
                        </div>
                        )}
            </div>
        </header>
    )
}

export default Navigation