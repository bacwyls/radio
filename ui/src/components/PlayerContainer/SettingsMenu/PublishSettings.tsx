import { Question } from "phosphor-react";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectDescription, selectHasPublishedStation, setDescription, setHasPublishedStation } from "../../../features/station/stationSlice";

export const PublishSettings = () => {

    const [showInfo, setShowInfo] = useState(false);
    const [newDescription, setNewDescription] = useState('');
    const description = useAppSelector(selectDescription);
    const newDescriptionRef = React.useRef(newDescription);

    const hasPublishedStation = useAppSelector(selectHasPublishedStation);
    const dispatch = useAppDispatch();

    const publishInfoId = 'publish-info-id';

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
            <div className="font-bold flex items-center relative gap-0.5 "
            >
                Publish Station
                <button
                    id={publishInfoId}
                    className={` cursor-pointer  rounded p-0.5 flex items-center justify-center
                ${showInfo ? 'bg-hover-default' : 'hover:bg-hover-default'}
                `}
                    onClick={(e) => {
                        setShowInfo(prev => !prev)
                        e.stopPropagation()
                    }
                    }
                >
                    <Question
                        weight="bold"
                        className="text-lg"
                    />
                </button>
                {showInfo &&
                    <div
                        className={`absolute  top-6 z-10 w-4/5 text-base border-border-default shadow bg-background-default
                         px-2 py-4 rounded-md   font-bold border cursor-text    
                         `}
                    >
                        Publishing the station adds it to the discovery pool.
                    </div>
                }
            </div>
            <div className="flex font-bold"
            >
                <div className={`flex items-center mr-2 px-2 py-1   rounded-md
                ${hasPublishedStation ? 'cursor-pointer' : ' hover:bg-hover-default'}

                `}
                    onClick={() => dispatch(setHasPublishedStation(false))}
                    style={{ marginLeft: '-.5rem' }}
                >
                    <input className={`mr-1 ${hasPublishedStation && 'cursor-pointer'}`}
                        style={{ top: '0.5325rem', height: '.566rem', width: '.566rem' }}
                        type={'radio'}
                        checked={!hasPublishedStation}
                        onChange={() => null}
                    />
                    No
                </div>
                <div className={`flex items-center px-2 py-1 rounded-md 
                ${hasPublishedStation ? 'cursor-pointer' : ' hover:bg-hover-default'}
                `}
                    onClick={() => dispatch(setHasPublishedStation(true))}
                >
                    <input className={`mr-1 
                    ${!hasPublishedStation && 'cursor-pointer'}`

                    }
                        style={{ top: '0.5625rem', height: '.566rem', width: '.566rem' }}
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
                            className={`bold-placeholder placeholder-text-secondary text-text-primary rounded-md border w-full 
                             px-2 py-1 outline-none focus:shadow	resize-none  border-background-textarea bg-background-textarea focus:bg-background-textarea-focused
                                    `}
                            placeholder="Write a description..."
                            maxLength={64}
                            rows={4}
                            value={newDescription}
                            onChange={handleNewDescriptionChange}
                        />
                        <span className={`absolute bottom-2.5 left-2 font-semibold text-text-secondary 
                            `}
                        >{newDescription.length + '/64'}</span>
                    </div>
                </div>
            }
        </div >
    )
}
