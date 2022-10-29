import React, { FC, } from 'react';
import { MdOutlineSettings } from 'react-icons/md';
import { NavigateButton } from '../Navigation/NavigateButton';
import { PublishStationButton } from './PublishStationButton';
import { StationTitle } from './StationTitle';

interface IUpperRow {
}

export const UpperRow: FC<IUpperRow> = (props: IUpperRow) => {

  const height = '11vh';

  return (
    <div className="py-1 flex" style={{ height: height, maxHeight: height }}>
      <div className="flex items-center m-w-2/3 mr-2 w-2/3">
        <StationTitle />
        {/* <PublishStationButton /> */}
      </div>
      <div className="flex flex-row m-w-1/3 w-1/3 justify-end items-center">
        <NavigateButton />
      </div>
    </div >
  )
}