import { MoonStars } from 'phosphor-react';
import React, { FC, } from 'react';
import { MdOutlineHome, MdOutlineSettings } from 'react-icons/md';
import { useAppSelector } from '../../../app/hooks';
import { selectIsLandscape } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { Navigate } from '../../Navigation/NavigateMenu';
import { HomeButton } from '../HomeButton';
import { PublishStationButton } from '../SettingsMenu/PublishStationButton';
import { SettingsMenu } from '../SettingsMenu/SettingsMenu';
import { StationTitle } from '../StationTitle';
import { ThemeButton } from '../ThemeButton';
import './style.css';

interface IUpperRowContainer {
}

export const UpperRowContainer: FC<IUpperRowContainer> = (props: IUpperRowContainer) => {

  const isLandscape = useAppSelector(selectIsLandscape);

  return (
    <div
      className={` flex justify-between w-full
                   ${isPhone() && isLandscape && 'upper-row-phone-landscape'}
                `}
      style={{ height: '3em' }}
    >
      <div className="flex ">
        <StationTitle />
      </div>
      <div className="flex  items-center ">
        {/* <Navigate /> */}
        <SettingsMenu />
        <ThemeButton />
        {!isPhone() && <HomeButton />}
      </div>
    </div >
  )
}