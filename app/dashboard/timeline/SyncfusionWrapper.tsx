"use client"
import { registerLicense } from "@syncfusion/ej2-base";

import { FC } from "react";
interface ISyncfusionWrapperProps {children:React.ReactNode};

export const SyncfusionWrapper: FC<ISyncfusionWrapperProps> = (props) => {
  registerLicense(
    "ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5QdEdiWH5XcHZQRmBf"
  );
    return (
        <>{props.children}</>
    );
}
