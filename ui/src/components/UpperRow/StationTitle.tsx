import { Radio, Television } from 'phosphor-react';
import React from 'react';
import { isValidPatp } from 'urbit-ob'
import { radio } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { selectTunePatP } from '../../features/station/stationSlice';
import { Sigil } from '../Sigil';
import { StationIsPublicInfo } from './StationIsPublicInfo/StationIsPublicInfo';

export const StationTitle = () => {

    const tunePatP = useAppSelector(selectTunePatP);

    return (
        !(tunePatP && isValidPatp(tunePatP)) ?
            <div
                className={`flex items-center font-bold  whitespace-nowrap text-text-default text-bigger
            `}
            >
                (Loading...)
            </div>
            :
            <div
                className={`flex items-center  w-full text-bigger text-text-default
            `}
            >
                {tunePatP == radio.hub &&
                    <>
                        <span
                            className={`rounded flex items-center justify-center bg-background-icon text-text-icon`}
                            style={{ maxHeight: '1.7rem', maxWidth: '1.7rem', minHeight: '1.7rem', minWidth: '1.7rem' }}
                        >
                            <Television
                                weight="bold"
                                className='text-xl'
                            />
                        </span>
                        <span className='ml-2 font-bold'>Hub</span>
                    </>
                }
                {
                    tunePatP == radio.our && tunePatP != radio.hub &&
                    <>
                        < span
                            className={`rounded flex items-center justify-center bg-background-icon text-text-icon
                         `}
                            style={{ maxHeight: '1.7rem', maxWidth: '1.7rem', minHeight: '1.7rem', minWidth: '1.7rem' }}
                        >
                            <Radio
                                weight="bold"
                                className='text-xl'
                            />
                        </span >
                        <div
                            className={`flex items-center font-bold  ml-2  whitespace-nowrap`}
                        >
                            My Station
                        </div>
                    </>
                }
                {
                    tunePatP &&
                    tunePatP != radio.hub
                    && tunePatP != radio.our &&
                    <>
                        <span
                            className={`  overflow-hidden  
                           rounded flex justify-center items-center bg-background-icon
                           `}
                            style={{ maxHeight: '1.7rem', maxWidth: '1.7rem', minHeight: '1.7rem', minWidth: '1.7rem' }}
                        >
                            <Sigil patp={tunePatP} size={1} />
                        </span>
                        <span
                            className={`ml-2 font-bold 
                                                        `}
                            style={{
                                maxWidth: '6.5rem',
                                lineHeight: '0.7rem',
                            }}
                        >
                            {tunePatP}
                        </span>
                    </>
                }
                <StationIsPublicInfo />
            </div >
    )
}