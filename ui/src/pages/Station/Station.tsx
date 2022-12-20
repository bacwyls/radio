import React, { useEffect } from "react";
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
import { isMobile, isTablet } from "react-device-detect";
import { UpperRowContainer } from "../../components/UpperRow/UpperRowContainer/UpperRowContainer";
import { selectIsChatFullScreen, selectIsDarkMode } from "../../features/ui/uiSlice";
import './style.css';
import { Connecting } from "../../components/Connecting/Connecting";

const PlayerContainerMemo = React.memo(PlayerContainer);
const ChatContainerMemo = React.memo(ChatContainer);

export const Station: FC = () => {
    let { patp } = useParams();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const radioSub = useAppSelector(selectRadioSub);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const tunePatP = useAppSelector(selectTunePatP);
    const viewers = useAppSelector(selectViewers);
    const isChatFullScreen = useAppSelector(selectIsChatFullScreen);
    const hasPublishedStation = useAppSelector(selectHasPublishedStation);
    const isPublic = useAppSelector(selectIsPublic);
    const description = useAppSelector(selectDescription);

    useEffect(() => {
        setInterval(() => {
            // heartbeat to detect presence
            radio.ping();

            hasPublishedStation &&
                radio.gregPut(description, isPublic);

        }, 1000 * 60 * 2)

    }, []);

    useEffect(() => {
        hasPublishedStation &&
            radio.gregPut(description, isPublic);
    }, [hasPublishedStation]);

    useEffect(() => {
        if (!radioSub) return;

        if (patp && isValidPatp(patp)) {
            tuneTo(patp, radio, dispatch);
        }

        else {
            navigate('/');
            tuneTo(null, radio, dispatch);
        }

    }, [patp, radioSub]);

    return (
        <div className={`text-xs fixed station-container 
                        flex              
                        ${isDarkMode ? 'bg-black-100 text-black-5' : 'bg-black-2 text-black-80'}
                        `}
            style={{
                height: '100vh',
                width: '100%',
            }}
        >
            <div className="upperow-player
            flex flex-col h-full "
            >
                <UpperRowContainer />
                <PlayerContainerMemo />
            </div>
            <ChatContainerMemo />
            {/* {patp && viewers.filter(viewer => viewer == tunePatP).length == 0 && <Connecting patp={patp} />} */}
            {patp && patp != tunePatP && (patp != radio.our) && < Connecting patp={patp} />}
        </div >
    )

}