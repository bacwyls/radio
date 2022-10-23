import React from "react";
import { FC, useEffect, useState } from "react";
import { radio } from "../../api";

interface IPublishStationButton {
}

export const PublishStationButton: FC<IPublishStationButton> = (props: IPublishStationButton) => {


  const [hasPublishedStation, setHasPublishedStation] = useState(false);

  useEffect(() => {
    if (!hasPublishedStation) return;
    setInterval(() => {
      // heartbeat to detect presence
      radio.gregPut('');
    }, 1000 * 60 * 3)

  }, [hasPublishedStation]);

  return (
    (radio.tunedTo === radio.our && !hasPublishedStation) ?
      <button
        className="border border-solid border-gray-400  \
                       rounded px-2 py-1 text-center inline-block \
                      flex-initial my-1 bg-white bg-green-50 h-7 "
        style={{ whiteSpace: 'nowrap' }}
        onClick={() => {
          radio.gregPut('')
          setHasPublishedStation(true);
          radio.gregRequest();
        }}
      >
        <span >publish my station</span>
      </button>
      :
      <></>
  )
}