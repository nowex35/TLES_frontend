"use client"; // クライアントコンポーネントとして宣言

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <DropdownMenuItem
      onSelect={async () => {
        await signOut({ callbackUrl: "/" }); // ログアウト処理
      }}
    >
      <span>Sign out</span>
    </DropdownMenuItem>
  );
};

export default SignOutButton;
