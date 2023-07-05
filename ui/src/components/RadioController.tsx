import React, { FC, useEffect, useRef, useState } from "react";

import { isMobile } from "react-device-detect";
import { useAppSelector, useAppDispatch } from "../app/hooks";

import { Radio } from "../lib";
import { InitialSplash } from "./InitialSplash";
import { PlayerColumn } from "./PlayerColumn";
import { ChatColumn } from "./ChatColumn";
import { selectUserInteracted } from "../features/ui/uiSlice";

export const RadioController: FC = () => {
  const userInteracted = useAppSelector(selectUserInteracted);

  const wrapperClassShared =
    "p-[1vw] lg:p-[10vh] pt-0 lg:pt-0 h-screen text-xs font-mono flex overflow-hidden"
  const wrapperClass =
    wrapperClassShared + " " + (isMobile ? "flex-col" : "flex-row");

  if (!userInteracted) {
    return (
      <InitialSplash />
    )
  }
  return (
    <div className={wrapperClass}>
      <PlayerColumn />
      <ChatColumn />
    </div>
  );
};
