import { Chat } from "phosphor-react";
import React, { FC } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsChatFullScreen, setIsChatFullScreen, setIsViewersMenuOpen } from "../../features/ui/uiSlice";

interface IChatButton {
}

export const ChatButton: FC<IChatButton> = (props: IChatButton) => {

    const isChatFullScreen = useAppSelector(selectIsChatFullScreen);
    const dispatch = useAppDispatch();

    return (
        <Chat
            size={24}
            weight="bold"
            onClick={() => {
                dispatch(setIsChatFullScreen(!isChatFullScreen))
                dispatch(setIsViewersMenuOpen(false))
            }}
        />
    )
}