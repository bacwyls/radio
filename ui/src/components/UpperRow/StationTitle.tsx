import { reactRenderer, sigil } from '@tlon/sigil-js';
import React from 'react';
import { FC } from 'react';
import { isValidPatp } from 'urbit-ob'
import { useAppSelector } from '../../app/hooks';
import { selectIsPublic, selectTunePatP } from '../../features/station/stationSlice';

interface IStationTitle {
    our: string;
}

export const StationTitle: FC<IStationTitle> = (props: IStationTitle) => {

    const { our } = props;
    const tunePatP = useAppSelector(selectTunePatP);
    const isPublic = useAppSelector(selectIsPublic);

    return (
        isValidPatp(tunePatP) ?
            <div className='flex item-center'>
                <span className='bg-black p-0.5 mr-2 rounded flex justify-center items-center'>
                    {tunePatP.length <= 14 && sigil({
                        patp: '~fidwed-sipwyn',
                        renderer: reactRenderer,
                        size: 18,
                        colors: ['black', 'white'],
                    })}
                </span>
                <span >
                    {tunePatP == our ? 'My station' :
                        `~fidwed-sipwyn's station`}
                    {' '}{isPublic ? '(public)' : '(private)'}
                </span>
            </div>
            :
            <></>
    )
}