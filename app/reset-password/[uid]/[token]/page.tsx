import { redirect } from "next/navigation"
import { getAuthSession } from "@/components/lib/nextauth"
import ResetPassword from "@/components/auth/ResetPassword"

interface ResetPasswordProps {
    params: {
        uid: string
        token: string
    }
}

//パスワード再設定ページ
const ResetPasswordPage = async ({ params}: ResetPasswordProps) => {
    const {uid,token} =params

    //認証情報取得
    const user = await getAuthSession()

    if (user) {
        redirect("/")
    }

    return <ResetPassword uid={uid} token={token} />
}

export default ResetPasswordPage