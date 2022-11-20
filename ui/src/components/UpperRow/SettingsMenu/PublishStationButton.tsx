import React from "react";
import { FC, useEffect } from "react";
import { radio } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { selectHasPublishedStation, setHasPublishedStation } from "../../../features/station/stationSlice";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";
import { ToggleSwitch } from "./ToggleSwitch/ToggleSwitch";

interface IPublishStationButton {
}

export const PublishStationButton: FC<IPublishStationButton> = (props: IPublishStationButton) => {

  const hasPublishedStation = useAppSelector(selectHasPublishedStation);
  const isDarkMode = useAppSelector(selectIsDarkMode);

  useEffect(() => {
    if (!hasPublishedStation) return;

    setInterval(() => {
      // heartbeat to detect presence
      radio.gregPut('');
    }, 1000 * 60 * 3)

  }, [hasPublishedStation]);

  return (
    (radio.tunedTo === radio.our) ?
      <button
        className={`flex items-center   border 
        rounded px-2 h-6  font-semibold border-gray-400 
          ${isDarkMode ? 'bg-lighter-black text-white-dark hover:border-white-dark' : 'bg-white text-black hover:border-black'}
        `}
        style={{
          whiteSpace: 'nowrap',
          width: '8em',
          fontSize: '.65rem'
        }}
      >
        <span className="mr-1" >publish</span>
        <ToggleSwitch />
      </button>
      :
      <></>
  )
}