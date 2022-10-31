import React from "react";
import { FC, useEffect } from "react";
import { radio } from "../../api";
import { useAppSelector } from "../../app/hooks";
import { selectHasPublishedStation, setHasPublishedStation } from "../../features/station/stationSlice";
import { ToggleSwitch } from "./ToggleSwitch/ToggleSwitch";

interface IPublishStationButton {
}

export const PublishStationButton: FC<IPublishStationButton> = (props: IPublishStationButton) => {

  const hasPublishedStation = useAppSelector(selectHasPublishedStation);

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
        className="flex items-center hover:border-black  border justify-between
        border-gray-400 rounded px-1 h-6 bg-white
        "
        style={{ whiteSpace: 'nowrap', width: '8em', fontSize: '.65rem' }}
      >
        <span className="mr-1" >publish</span>
        <ToggleSwitch />
      </button>
      :
      <></>
  )
}