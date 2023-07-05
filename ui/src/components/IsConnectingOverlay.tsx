import React, { useRef, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';
import { useAppSelector } from '../app/hooks';
import { selectTunePatP } from '../features/ui/uiSlice';

const initialStatus = 'connecting to remote server'

export const IsConnectingOverlay: React.FC = () => {
    const [dots, setDots] = useState<string>('.');
    const [status, setStatus] = useState<string>(initialStatus);
    const [isIncreasing, setIsIncreasing] = useState<boolean>(true);
    const tunePatP = useAppSelector(selectTunePatP);

    const [startTime, setStartTime] = useState<number>(Date.now());

    useEffect(() => {
        setStartTime(Date.now());
    }, [tunePatP])


    useEffect(() => {
        const statusInterval = setInterval(() => {
            const elapsedTime = Math.round((Date.now() - startTime) / 1000);


            if (elapsedTime < 10) {
                setStatus(initialStatus);
            } else if (elapsedTime < 20) {
                setStatus(`slow connection to ${tunePatP}, still trying`)
            } else {
                setStatus(`bad connection to ${tunePatP}`)
            }

        }, 1000);

        const dotsInterval = setInterval(() => {
            setDots((prevDots) => {
                if (isIncreasing) {
                    if (prevDots === '...') {
                        setIsIncreasing(false);
                    }
                    return prevDots + '.';
                } else {
                    if (prevDots === '.') {
                        setIsIncreasing(true);
                    }
                    return prevDots.slice(0, -1);
                }
            });
        }, 500);

        return () => {
            clearInterval(dotsInterval);
            clearInterval(statusInterval);
        };
    }, [isIncreasing, tunePatP]);

    return createPortal(
        <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white px-4 py-2"
        >
            <p>
                {status}
                <span className="animate-ellipsis">{dots}</span>
            </p>
        </div>,
        document.body
    );
};

