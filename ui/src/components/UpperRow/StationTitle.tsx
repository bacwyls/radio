import { reactRenderer, sigil } from '@tlon/sigil-js';
import { Users } from 'phosphor-react';
import React from 'react';
import { FC } from 'react';
import { GoRadioTower } from 'react-icons/go';
import { isValidPatp } from 'urbit-ob'
import { radio } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { selectTunePatP } from '../../features/station/stationSlice';
import { ViewersButton } from '../PlayerContainer/Viewers/ViewersButton';
import { SettingsMenu } from './SettingsMenu/SettingsMenu';

interface IStationTitle {
}

export const StationTitle: FC<IStationTitle> = (props: IStationTitle) => {

    const tunePatP = useAppSelector(selectTunePatP);
    // const viewers = useAppSelector(selectViewers);
    const viewers = ['~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~zod']
    return (
        tunePatP && isValidPatp(tunePatP) ?
            <>
                {tunePatP == '~nodmyn-dosrux' ?
                    <div className='flex items-center'>
                        <GoRadioTower className='mr-1 text-base' />Hub (~nodmyn-dosrux)
                    </div>
                    :
                    <div className='flex items-center'>
                        <span className='bg-black px-0.5 mr-1 h-7 m-w-7  rounded flex justify-center items-center'>
                            {tunePatP.length <= 14 &&

                                <span className='bg-black py-0.5 px-1  rounded '>
                                    {sigil({
                                        patp: '~harlys-forbec',
                                        renderer: reactRenderer,
                                        size: 30,
                                        colors: ['black', 'white'],
                                    })}
                                </span>
                            }
                        </span>
                        <div
                            className='flex flex-col pt-0.5 '
                            style={{
                                lineHeight: '.6rem',
                            }}
                        >
                            <span className='flex items-center font-bold z-10'>
                                {tunePatP == radio.our ?
                                    <>
                                        <span className='flex items'>My Station</span>
                                    </> :
                                    `${tunePatP}'s station`}
                            </span>
                            <ViewersButton />
                        </div>
                    </div>
                }
            </ >
            :
            <span className='flex whitespace-nowrap'>{tunePatP}</span>
    )
}