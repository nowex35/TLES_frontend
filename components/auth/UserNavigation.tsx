"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { UserType } from "@/lib/nextauth"
import Link from "next/link"
import Image from "next/image"

interface UserNavigationProps {
    user: UserType
}

//ユーザーナビゲーション
const UserNavigation = ({ user }: UserNavigationProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="relative w-10 flex-shrink-0">
                    <Image
                        src={user.avatar || "/default.png"}
                        className="rounded-full object-cover"
                        alt={user.name || "avatar"}
                        fill
                    />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white p-2 w-[300px]" align="end">
                <Link href={`/user/${user.uid}`}>
                    <DropdownMenuItem className="cursor-pointer">
                        <div className="break-words">
                            <div className="mb-2">{user.name || ""}</div>
                            <div className="text-gray-500">{user.email || ""}</div>
                        </div>
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <Link href="/post/new">
                    <DropdownMenuItem className="cursor-pointer">新規投稿</DropdownMenuItem>
                </Link>

                <DropdownMenuItem
                onSelect={async () => {
                    await signOut({ callbackUrl: "/" }) //onSelectでログアウト処理を実行
                }}>
                    ログアウト
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNavigation