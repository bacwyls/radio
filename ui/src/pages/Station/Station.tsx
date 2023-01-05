import React, { useEffect, useRef } from "react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { radio } from "../../api";
import { ChatContainer } from "../../components/ChatContainer/ChatContainer/ChatContainer";
import { PlayerContainer } from "../../components/PlayerContainer/PlayerContainer";
import { isPhone, tuneTo } from "../../util";
import { isValidPatp } from 'urbit-ob'
import { selectDescription, selectHasPublishedStation, selectIsPublic, selectRadioSub, selectTunePatP, selectViewers, setHasPublishedStation } from "../../features/station/stationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PhoneFooter } from "../../components/Mobile/PhoneFooter/PhoneFooter";
import { UpperRowContainer } from "../../components/UpperRow/UpperRowContainer/UpperRowContainer";
import { selectIsChatFullScreen, selectIsDarkMode, selectIsViewersMenuOpen } from "../../features/ui/uiSlice";
import './style.css';
import { Connecting } from "../../components/Connecting/Connecting";

const PlayerContainerMemo = React.memo(PlayerContainer);
const ChatContainerMemo = React.memo(ChatContainer);

export const Station: FC = () => {
    let { patp } = useParams();

    const isDarkMode = useAppSelector(selectIsDarkMode);
    const tunePatP = useAppSelector(selectTunePatP);
    const isChatFullScreen = useAppSelector(selectIsChatFullScreen);
    const isViewersMenuOpen = useAppSelector(selectIsViewersMenuOpen);
    const hasPublishedStation = useAppSelector(selectHasPublishedStation);
    const isPublic = useAppSelector(selectIsPublic);
    const description = useAppSelector(selectDescription);

    const gregInterval = useRef<NodeJS.Timer>();

    useEffect(() => {

        const pingInterval = setInterval(() => {
            // heartbeat to detect presence
            radio.ping();

        }, 1000 * 60 * 2)

        return () => {
            clearInterval(pingInterval)
            if (gregInterval.current)
                clearInterval(gregInterval.current)
        }

    }, []);


    useEffect(() => {
        if (gregInterval.current) {
            clearInterval(gregInterval.current);
            gregInterval.current = undefined;
        }

        if (hasPublishedStation) {
            radio.gregPut(description, isPublic);

            gregInterval.current =
                setInterval(() => {
                    radio.gregPut(description, isPublic);
                }, 1000 * 60 * 2)
        }

    }, [hasPublishedStation, description]);

    return (
        <div className={`  station-container
                        ${isDarkMode ? 'bg-black-100 text-black-5' : 'bg-black-2 text-black-70'}
                        `}
            style={{
                fontSize: '16px',
            }}
        >
            <div className={`
           ${isPhone() ? 'upperow-player-phone' : 'upperow-player'}
            `}
            >
                <UpperRowContainer />
                <PlayerContainerMemo />
            </div>
            <ChatContainerMemo />
            {patp && patp != tunePatP ? < Connecting /> :
                (isPhone() && (!isChatFullScreen || isViewersMenuOpen) && <PhoneFooter />)
            }
        </div >
    )

}