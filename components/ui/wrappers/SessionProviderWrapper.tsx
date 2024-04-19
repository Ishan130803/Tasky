"use client"
import { SessionProvider } from 'next-auth/react';
import * as React from 'react';


interface ISessionProviderWrapperProps {
  children:React.ReactNode
}

const SessionProviderWrapper: React.FunctionComponent<ISessionProviderWrapperProps> = (props) => {
  return <SessionProvider>{props.children}</SessionProvider>
};

export default SessionProviderWrapper;
