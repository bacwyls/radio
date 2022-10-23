import React, { FC, } from 'react';
import { PublishStationButton } from './PublishStationButton';
import { Navigation } from './Navigation';
import { StationTitle } from './StationTitle';

interface IUpperRow {
}

export const UpperRow: FC<IUpperRow> = (props: IUpperRow) => {

  const height = '10vh';
  return (
    <div className="py-1 flex" style={{ height: height, maxHeight: height }}>
      <div className="flex align-middle items-center justify-between m-w-2/3 mr-2 w-2/3">
        <StationTitle />
        <PublishStationButton />
      </div>
      <div className="flex flex-row m-w-1/3 w-1/3 justify-end items-center">
        <Navigation />
      </div>
    </div >
  )
}