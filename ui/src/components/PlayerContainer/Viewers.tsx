import { reactRenderer, sigil } from '@tlon/sigil-js';
import React, { useState } from 'react';
import { GrFormView } from 'react-icons/gr';
import { isValidPatp } from 'urbit-ob'

export const Viewers = () => {
    // const viewers = useAppSelector(selectViewers);
    const viewers = ['~harlys-forbec', '~fidwed-sipwyn', '~tasrym-sorrup-fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec',]
    const [viewersMenuOpen, setViewersMenuOpen] = useState(false);

    return (
        <div>
            <div
                className='flex items-center text-center mt-1 cursor-pointer'
                style={{ fontSize: '0.7rem' }}
                onClick={() => setViewersMenuOpen((previous) => !previous)}
            >
                <GrFormView className='mr-1 text-lg ' />
                <span className='text-bold' >{viewers.length}</span>
                <span className={'ml-1 text-bold '}>viewer(s)</span>
            </div>
            {
                viewersMenuOpen && viewers.length > 0 &&
                <div
                    className='absolute flex border flex-wrap flex-col 
                               rounded p-1 justify-between overflow-y-hidden 
                               overflow-x-auto w-4/5'
                    style={{ maxHeight: '4.8em', height: '4.8em' }}
                >
                    {viewers.map((x, i) =>
                        <div className='flex items-center mr-2' >
                            {
                                isValidPatp(x) && x.length <= 14 &&
                                <span className='bg-black p-0.5 mr-1 
                                                 rounded flex justify-center 
                                                 items-center'
                                >
                                    {sigil({
                                        patp: x,
                                        renderer: reactRenderer,
                                        size: 18,
                                        colors: ['black', 'white'],
                                    })
                                    }
                                </span>
                            }
                            <span
                                className={' whitespace-nowrap'}
                                style={{ fontSize: '0.7rem' }}
                                key={i}
                            >
                                <a
                                    className={''}
                                    href={'/apps/landscape/~profile/' + x}
                                    target="_blank"
                                >
                                    {x == '~' + window.ship ? 'You' : x}
                                </a>
                                {/* {', '} */}
                            </span>
                        </div>
                    )}
                </div>
            }
        </div >
    )
}