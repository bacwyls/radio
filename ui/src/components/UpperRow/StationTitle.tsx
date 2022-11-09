import { reactRenderer, sigil } from '@tlon/sigil-js';
import React from 'react';
import { FC } from 'react';
import { GoRadioTower } from 'react-icons/go';
import { isValidPatp } from 'urbit-ob'
import { radio } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { selectTunePatP } from '../../features/station/stationSlice';
import { SettingsMenu } from './SettingsMenu/SettingsMenu';

interface IStationTitle {
}

export const StationTitle: FC<IStationTitle> = (props: IStationTitle) => {

    const tunePatP = useAppSelector(selectTunePatP);

    return (
        tunePatP && isValidPatp(tunePatP) ?
            <>
                {tunePatP == '~nodmyn-dosrux' ?
                    <div className='flex items-center'>
                        <GoRadioTower className='mr-1 text-base' />Hub (~nodmyn-dosrux)
                    </div>
                    :
                    <div className='flex items-center'>
                        <div className='flex  '>
                            <span className='bg-black p-0.5 mr-1  rounded flex justify-center items-center'>
                                {tunePatP.length <= 14 && sigil({
                                    patp: tunePatP,
                                    renderer: reactRenderer,
                                    size: 20,
                                    colors: ['black', 'white'],
                                })}
                            </span>
                            <span className='flex items-center'>
                                {tunePatP == radio.our ?
                                    <>
                                        <span className='flex items'>My Station</span>
                                        <span className=''><SettingsMenu /></span>
                                    </> :
                                    `${tunePatP}'s station`}
                            </span>
                        </div>
                    </div>
                }
            </ >
            :
            <span className='flex whitespace-nowrap'>{tunePatP}</span>
    )
}