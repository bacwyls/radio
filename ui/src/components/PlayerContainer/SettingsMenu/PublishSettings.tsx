import { Question } from "phosphor-react";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectDescription, selectHasPublishedStation, setDescription, setHasPublishedStation } from "../../../features/station/stationSlice";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";

export const PublishSettings = () => {

    const isDarkMode = useAppSelector(selectIsDarkMode);
    const [showInfo, setShowInfo] = useState(false);
    const [newDescription, setNewDescription] = useState('');
    const description = useAppSelector(selectDescription);
    const newDescriptionRef = React.useRef(newDescription);

    const hasPublishedStation = useAppSelector(selectHasPublishedStation);
    const dispatch = useAppDispatch();

    const publishInfoId = 'publish-id';

    useEffect(() => {
        setNewDescription(description);
        newDescriptionRef.current = description;

        return () => {
            dispatch(setDescription(newDescriptionRef.current))
        }
    }, [description]);


    useEffect(() => {

        document.addEventListener(
            "click",
            handleOutsidePublishInfoMenuClick
        )

        return () => {
            document.removeEventListener('click', handleOutsidePublishInfoMenuClick)
        }
    }, []);

    const handleOutsidePublishInfoMenuClick = (event: any) => {
        var clicked = event.target as Element;
        var publishInfo = document.getElementById(publishInfoId);

        if (
            clicked != publishInfo && !publishInfo?.contains(clicked)
        ) {
            setShowInfo(false);
        }
    }

    const handleNewDescriptionChange = (e) => {
        let text = e.target.value;
        setNewDescription(text)
        newDescriptionRef.current = text;
    }

    return (
        <div className=" flex flex-col  left-0">
            <div className="font-bold flex items-center relative gap-0.5"
            >
                Publish Station
                <button
                    id={publishInfoId}
                    className={`cursor-pointer rounded p-0.5 flex items-center justify-center
                ${showInfo ? (isDarkMode ? 'bg-black-80' : '  bg-black-10') : ''}
                ${isDarkMode ? ' hover:bg-black-80' : '  hover:bg-black-10'}
                `}
                    onClick={() => setShowInfo(prev => !prev)}

                >
                    <Question
                        size={22}
                        weight="bold"
                    />
                    <div
                        className={`absolute  top-6 z-10 
                         px-2 py-4 rounded-md flex  font-bold border cursor-text    
                         
                        ${isDarkMode ? 'bg-black-95 border-black-85 filter	 drop-shadow-default-dark ' : 'border-black-10 bg-white shadow'}
                         `}
                        style={{ fontSize: '16px', visibility: showInfo ? 'visible' : 'hidden' }}
                    >
                        Publishing the station adds it to the discovery pool.
                    </div>
                </button>
            </div>
            <div className="flex font-bold"
            >
                <div className={`flex items-center mr-2 px-2 py-1   rounded-md 
                ${hasPublishedStation ? (isDarkMode ? 'cursor-pointer hover:bg-black-80' : 'cursor-pointer hover:bg-black-10') : ''}

                `}
                    onClick={() => dispatch(setHasPublishedStation(false))}
                    style={{ marginLeft: '-.5rem' }}
                >
                    <input className={`mr-1 ${hasPublishedStation && 'cursor-pointer'}`}
                        style={{ top: '13.5px', height: '.85em', width: '.85em' }}
                        type={'radio'}
                        checked={!hasPublishedStation}
                        onChange={() => null}
                    />
                    No
                </div>
                <div className={`flex items-center px-2 py-1 rounded-md 
                ${!hasPublishedStation ? (isDarkMode ? 'cursor-pointer hover:bg-black-80' : 'cursor-pointer hover:bg-black-10') : ''}
                `}
                    onClick={() => dispatch(setHasPublishedStation(true))}
                >
                    <input className={`mr-1 
                    ${!hasPublishedStation && 'cursor-pointer'}`

                    }
                        style={{ top: '13.5px', height: '.85em', width: '.85em' }}
                        type={'radio'}
                        checked={hasPublishedStation}
                        onChange={() => null}
                    />
                    Yes
                </div>
            </div>
            {
                hasPublishedStation &&
                <div className="flex flex-col">
                    <span className="font-semibold mb-1">Description</span>
                    <div className="relative">
                        <textarea
                            className={` rounded-md border w-full 
                             px-2 py-1 outline-none focus:shadow	resize-none
                             ${isDarkMode ? 'bg-black-80 focus:bg-black-85 border-black-80  placeholder-black-10 text-black-10  '
                                    : 'bg-black-10 placeholder-black-80  text-black-80 border-black-10 focus:bg-black-1'}
                                    `}
                            placeholder="Write a description..."
                            maxLength={64}
                            rows={4}
                            value={newDescription}
                            onChange={handleNewDescriptionChange}
                        />
                        <>
                            <span className={`absolute bottom-2.5 left-2 font-semibold 
                              ${isDarkMode ? 'text-black-10  '
                                    : 'text-black-60'}
                            `}

                            >{newDescription.length + '/64'}</span>
                            {/* <div
                                className="absolute bottom-2.5 right-14 font-bold px-2 rounded-md bg-gray-300 "
                            >Cancel</div>
                            <div className="absolute bottom-2.5 right-2 font-bold px-2 rounded-md "
                                style={{ backgroundColor: '#B8E4FA' }}
                            >Save</div> */}
                        </>
                    </div>
                </div>
            }
        </div >
    )
}
