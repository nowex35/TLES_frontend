"use server"

import { error } from "console"

interface TemporarrySignUpProps {
    name: string
    email: string
    password: string
    rePassword: string
}

//アカウントの仮登録
export const temporarrySignup = async ({
    name,
    email,
    password,
    rePassword,
}: TemporarrySignUpProps) => {
    try {
        const body = JSON.stringify({
            name,
            email,
            password,
            re_password: rePassword,
        })

        //アカウントの仮登録を送信
        const apiRes = await fetch(`${process.env.API_URL}/api/auth/users/`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body,
        })

        //APIレスポンスが正常でない場合、エラーを返す
        if (!apiRes.ok) {
            const errorData = await apiRes.json();  // エラーメッセージを取得
            console.error("Error:", errorData);     // エラーログを出力
            return { success: false, error: errorData };
        }

        //成功を返す
        return { success: true }
    } catch (error) {
        console.error(error)
        //エラー発生時にエラーを返す
        return { success: false }
    }
}

interface CompleteSignupProps {
    uid: string
    token: string
}

//アカウント本登録
export const completeSignup = async ({ uid, token }: CompleteSignupProps) => {
    try {
        const body = JSON.stringify({
            uid,
            token,
        })

        //アカウント本登録を送信
        const apiRes = await fetch(
            `${process.env.API_URL}/api/auth/users/activation/`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body,
            }
        )

        //APIレスポンスが正常でない場合、エラーを返す
        if (!apiRes.ok){
            return{
                success: false,
            }
        }

        //成功を返す
        return {
            success: true,
        }
    } catch (error) {
        console.error(error)
        //エラー発生時にエラーを返す
        return {
            success: false,
        }
    }
}