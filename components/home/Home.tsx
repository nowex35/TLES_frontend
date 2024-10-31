"use client"

import { UserType } from "@/lib/nextauth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface HomeProps {
    user: UserType | null
}

const Home = ({ user }: HomeProps) => {
    const router = useRouter()

    useEffect(() => {
        if ( !user ) {
            router.push("/login");
        }
    }, [user, router]);
    return (
        <>
            {user ? (
                <div>ログイン後</div>
            ) : (
                <div>ログイン</div>
            )}
        </>
    )
}

export default Home