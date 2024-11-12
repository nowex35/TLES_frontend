"use client"

import { UserType } from "@/components/lib/nextauth"
import { Skeleton } from "@/components/ui/skeleton"

interface HomeProps {
    user: UserType | null
}

const Home: React.FC<HomeProps> = ({ user }) => {
    return (
        <>
            {user ? (
            <div>ログイン後</div>
            ) : (
                <>
                    <div>ログインしてください</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {/* 長方形のスケルトン */}
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                        {/* 小さな長方形のスケルトン */}
                        <div>
                            <Skeleton className="h-28 w-full py-1" />
                            <div className="h-8 w-full"></div>
                            <Skeleton className="h-28 w-full py-1" />
                        </div>
                        {/* 円形のスケルトン */}
                        <div className="flex justify-center items-center h-64 w-full">
                            <Skeleton className="h-60 w-60 rounded-full" />
                        </div>
                        <Skeleton className="h-64 w-full" />
                        <div className="flex justify-center items-center h-64 w-full">
                            <Skeleton className="h-28 w-28 rounded-full py-1" />
                            <div className="h-28 w-8"></div>
                            <Skeleton className="h-28 w-28 rounded-full py-1" />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Home