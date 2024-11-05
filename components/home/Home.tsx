"use client"

import { UserType } from "@/components/lib/nextauth"

interface HomeProps {
    user: UserType | null
}

const Home = ({ user }: HomeProps) => {
    return (
        <>
            {user ? (
                <div>ログイン後</div>
            ) : (
                <div>ログインしてください</div>
            )}
        </>
    )
}

export default Home