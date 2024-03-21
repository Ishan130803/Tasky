"use client"
import { SessionProvider } from "next-auth/react"

import React, { FC } from "react";
interface INextAutheProviderProps {
    children : React.ReactNode
};

export const NextAuthProvider: FC<INextAutheProviderProps> = (props) => {
    return (
        <SessionProvider>{props.children}</SessionProvider>
    );
}
