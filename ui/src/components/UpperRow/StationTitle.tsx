import { reactRenderer, sigil } from '@tlon/sigil-js';
import React from 'react';
import { FC } from 'react';
import { GoRadioTower } from 'react-icons/go';
import { MdOutlineSettings } from 'react-icons/md';
import { isValidPatp } from 'urbit-ob'
import { radio } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { selectTunePatP } from '../../features/station/stationSlice';
import { IsPublicDropdown } from './IsPublicDropdown';
import { PublishStationButton } from './PublishStationButton';
import { SettingsMenu } from './SettingsMenu';

interface IStationTitle {
}

export const StationTitle: FC<IStationTitle> = (props: IStationTitle) => {

    const tunePatP = useAppSelector(selectTunePatP);

    return (
        tunePatP && isValidPatp(tunePatP) ?
            <>
                {tunePatP == '~nodmyn-dosrux' ?
                    <div className='flex items-center'><GoRadioTower className='mr-2 text-lg' />Hub (~nodmyn-dosrux)</div>
                    :
                    <div className='flex items-center'>
                        <div className='flex  '>
                            <span className='bg-black p-0.5 mr-2 w-5 h-5 rounded flex justify-center items-center'>
                                {tunePatP.length <= 14 && sigil({
                                    patp: tunePatP,
                                    renderer: reactRenderer,
                                    size: 20,
                                    colors: ['black', 'white'],
                                })}
                            </span>
                            <span className='flex items-center mr-1'>
                                {tunePatP == radio.our ?
                                    <> My station <SettingsMenu />
                                    </> :
                                    `${tunePatP}'s station`}
                            </span>
                        </div>
                    </div>
                }
            </ >
            :
            <>{tunePatP}</>
    )
}