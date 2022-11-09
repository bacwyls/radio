import React, { FC, } from 'react';
import { MdOutlineHome, MdOutlineSettings } from 'react-icons/md';
import { useAppSelector } from '../../../app/hooks';
import { selectIsLandscape } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { Navigate } from '../../Navigation/NavigateMenu';
import { HomeButton } from '../HomeButton';
import { PublishStationButton } from '../SettingsMenu/PublishStationButton';
import { StationTitle } from '../StationTitle';
import './UpperRowContainer.css';

interface IUpperRowContainer {
}

export const UpperRowContainer: FC<IUpperRowContainer> = (props: IUpperRowContainer) => {

  const isLandscape = useAppSelector(selectIsLandscape);

  const height = '11vh';

  return (
    <div
      className={`py-1 flex
                   ${isPhone() && isLandscape && 'upper-row-phone-landscape'}
                `}
      style={{
        height: height,
        maxHeight: height,
        minHeight: height,
        padding: '0 3vw 0 3vw',
      }}>
      <div className="flex items-center m-w-2/3 mr-2 w-2/3">
        <StationTitle />
        {/* <PublishStationButton /> */}
      </div>
      <div className="flex flex-row m-w-1/3 w-1/3 justify-end items-center">
        <Navigate />
        {!isPhone() && <HomeButton />}
      </div>
    </div >
  )
}