"use client";

import type { ReactNode } from "react";
import { useApply, type ApplyOptions } from "./ApplyProvider";

type ApplyButtonProps = ApplyOptions & {
  children: ReactNode;
  className?: string;
};

export default function ApplyButton({ children, className, plan, billing, program }: ApplyButtonProps) {
  const { openApply } = useApply();

  return (
    <button type="button" className={className} onClick={() => openApply({ plan, billing, program })}>
      {children}
    </button>
  );
}
