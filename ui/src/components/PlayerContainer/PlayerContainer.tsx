import React, { FC, useEffect, useState } from 'react';
import { Player } from './Player/Player';
import { SyncActions } from './SyncActions';
import { handleUserInput, isPhone, tuneTo } from '../../util';
import { radio } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsPublic, selectSpinTime, selectSpinUrl, selectTunePatP } from '../../features/station/stationSlice';
import { selectIsDarkMode } from '../../features/ui/uiSlice';
import { Link, Megaphone, PlayCircle, XCircle } from 'phosphor-react';
import { SettingsMenu } from './SettingsMenu/SettingsMenu/SettingsMenu';

const PlayButton = () => {

  const isDarkMode = useAppSelector(selectIsDarkMode);
  const spinUrl = useAppSelector(selectSpinUrl);
  const spinTime = useAppSelector(selectSpinTime)

  const [showPlayModal, setShowPlayModal] = useState(false);
  const [urlToPlay, setUrlToPlay] = useState('');

  const dispatch = useAppDispatch();

  const playModalId = 'play-modal';
  const urlInputId = 'url-input'

  useEffect(() => {
    document.addEventListener(
      "click",
      handleOutsidePlayModalClick
    )

    return () => document.removeEventListener('click', handleOutsidePlayModalClick)
  }, []);

  const handleOutsidePlayModalClick = (event: any) => {
    var clicked = event.target as Element;
    var playModal = document.getElementById(playModalId);

    if (
      playModal && clicked != playModal && !playModal.contains(clicked)
    ) {
      setShowPlayModal(false);
    }
  }

  function processPlay() {
    radio.spin(urlToPlay);
    radio.chat('!play ' + urlToPlay);
    setUrlToPlay('');
    setShowPlayModal(false);
  }

  return (
    <div
      className=''
      style={{ width: '104px' }}
      id={playModalId}
    >
      <button
        className={`  outline-none 
    font-bold   rounded-md  justify-center
    flex text-center items-center  
        gap-1 shadow 
        ${isDarkMode ? ' bg-black-90  hover:bg-black-70 ' : ' bg-white hover:bg-black-5 border-black-10'}
        ${showPlayModal && (isDarkMode ? 'bg-black-70' : 'bg-black-5')}
  `}
        style={{ height: '40px', width: '104px' }}
        onClick={() => setShowPlayModal(prev => !prev)}
      >
        <PlayCircle size={22} weight="bold" />
        Play
      </button>
      {showPlayModal &&
        <div
          className={`fixed flex flex-col  gap-3 
              bg-white py-10 px-8 rounded-md shadow-md
              ${isDarkMode ? ' bg-black-90 ' : ' bg-white border-black-10'}
`}
          style={{
            left: '37.5%',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            fontSize: '16px',
            width: '27em',
          }}
        >
          <div className='font-bold'
            style={{ fontSize: '18px' }}
          >
            Change the current player content
          </div>
          <div
            className={`
                flex flex-col
              ${isDarkMode ? 'text-black-20' : ' text-black-70'}

              `}
          >
            <span
              className='font-bold'
            >Accepts a variety of URLs </span>
            <span
              className='font-medium'
              style={{ fontSize: '14px' }}
            >e.g., Youtube, SoundCloud, Twitch, file paths, etc.</span>
          </div>
          <div className='flex relative items-center'
          >
            <input
              id={urlInputId}
              autoComplete="off"
              className={`border 
            flex items-center justify-center pl-7 font-bold 
            rounded-md w-full  outline-none focus:shadow  '

            ${isDarkMode ? 'bg-black-70 focus:bg-black-80 border-black-70  text-black-1 placeholder-white' : ' text-black-80  bg-black-10 border-black-10 placeholder-black-80 focus:bg-black-1'}
            `}
              placeholder='Insert URL'
              value={urlToPlay}
              onChange={e => setUrlToPlay(e.target.value)}
              style={{
                height: '40px',
                paddingRight: '6.3em',
              }}
            />
            <Link className='absolute left-2' size={22} weight="bold" />
            {/* {urlToPlay.trim().length != 0 &&
              <XCircle className="absolute cursor-pointer" style={{ right: '6.2em' }} size={22} weight="bold"
                onClick={() => setUrlToPlay('')}
              />
            } */}
            <button
              className={`flex items-center justify-center 
              gap-0.5 font-bold  rounded-md 
              
              ${isDarkMode ? 'text-black-90' : '  text-white '}
              ${urlToPlay.trim().length > 0 ? 'hover:shadow bg-blue-90   ' : 'cursor-not-allowed	bg-blue-50 text-opacity-50 '} 
              `}
              style={{
                width: '6em',
                height: '40px',
                marginLeft: '-6em',
              }}
              onClick={processPlay}
            >
              <PlayCircle size={22} weight="bold" />
              Play
            </button>
          </div>

        </div>}
    </div>

  )
}

const TalkButton = () => {

  const isDarkMode = useAppSelector(selectIsDarkMode);

  const talkModalId = 'talk-modal';
  const urlInputId = 'url-input';

  const [showTalkModal, setShowTalkModal] = useState(false);

  const [textToSpeech, setTextToSpeech] = useState('');

  useEffect(() => {
    document.addEventListener(
      "click",
      handleOutsideTalkModalClick
    )

    return () => document.removeEventListener('click', handleOutsideTalkModalClick)
  }, []);

  const handleOutsideTalkModalClick = (event: any) => {
    var clicked = event.target as Element;
    var talkModal = document.getElementById(talkModalId);

    if (
      talkModal && clicked != talkModal && !talkModal.contains(clicked)
    ) {
      setShowTalkModal(false);
    }
  }

  const processTalk = () => {
    radio.chat('!talk ' + textToSpeech);
    radio.talk(textToSpeech);
    setTextToSpeech('');
    setShowTalkModal(false);
  }


  return (
    <div
      id={talkModalId}
      style={{ width: '104px' }}
    >
      <button
        className={` outline-none
              font-bold rounded-md justify-center
              flex text-center items-center
              gap-1 shadow       
              ${isDarkMode ? ' bg-black-90  hover:bg-black-70 ' : ' bg-white hover:bg-black-5 border-black-10'}
              ${showTalkModal && (isDarkMode ? 'bg-black-70' : 'bg-black-5')}
  `}
        style={{ height: '40px', width: '104px' }}
        onClick={() => setShowTalkModal(prev => !prev)}
      >
        <Megaphone size={22} weight="bold" />
        Talk
      </button >
      {showTalkModal &&
        <div
          className={`fixed flex flex-col  gap-3 
              py-7 px-8 rounded-md shadow-md
              ${isDarkMode ? ' bg-black-90 ' : ' bg-white border-black-10'}

              `}

          style={{
            left: '37.5%',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            fontSize: '16px',
            width: '27em',
          }}
        >
          <div
            className='font-bold'
            style={{ fontSize: '18px' }}
          >
            The text will be converted to speech and broadcasted
            to everybody.
          </div>
          <div className='relative'>
            <textarea
              id={urlInputId}
              autoComplete="off"
              className={`  rounded-md border w-full font-semibold
              px-2 py-1 outline-none focus:shadow	resize-none	
              ${isDarkMode ? 'bg-black-80 border-black-85 placeholder-black-10 ' : 'bg-black-5 placeholder-black-80 border-black-10'}

              `}
              placeholder='Text to Speech'
              value={textToSpeech}
              onChange={e => setTextToSpeech(e.target.value)}
              maxLength={64}
              rows={4}
            />
            <span className="absolute bottom-2.5 left-2 font-bold">{textToSpeech.length + '/64'}</span>
            <button
              className={`flex items-center justify-center 
              gap-0.5 font-bold  rounded-md absolute bottom-2.5 right-2

              ${isDarkMode ? 'text-black-90' : '  text-white '}
              ${textToSpeech.trim().length > 0 ? 'hover:shadow bg-blue-90   ' : 'cursor-not-allowed	bg-blue-50 text-opacity-50 '} 
              `}
              style={{
                width: '6em',
                height: '40px',
                marginLeft: '-6em',
                backgroundColor: textToSpeech.trim().length > 0 ? 'rgb(184,228,250)' : '#E7F2F7',
              }}
              onClick={processTalk}
            >
              <Megaphone size={22} weight="bold" />
              Talk
            </button>
          </div>
          {/* {urlToPlay.trim().length != 0 &&
              <XCircle className="absolute cursor-pointer" style={{ right: '6.2em' }} size={22} weight="bold"
                onClick={() => setUrlToPlay('')}
              />
            } */}

        </div>}
    </div >
  )
}


const DisabledPlayButton = () => {

  const isDarkMode = useAppSelector(selectIsDarkMode);

  return (
    <button
      className={`  outline-none  shadow 
    font-bold   rounded-md  justify-center opacity-40
    flex text-center items-center  cursor-not-allowed	
    gap-1
    ${isDarkMode ? ' bg-black-90  hover:bg-black-70 ' : ' bg-white hover:bg-black-5 border-black-10'}
     `}
      style={{ height: '40px', width: '104px' }}
    >
      <PlayCircle size={22} weight="bold" />
      Play
    </button>
  )
}

const DisabledTalkButton = () => {

  const isDarkMode = useAppSelector(selectIsDarkMode);

  return (
    <button
      className={`  outline-none 
    font-bold   rounded-md  justify-center
    flex text-center items-center   cursor-not-allowed	opacity-40
      gap-1 shadow 
      ${isDarkMode ? ' bg-black-90  hover:bg-black-70 ' : ' bg-white hover:bg-black-5 border-black-10'}
      `}
      style={{ height: '40px', width: '104px' }}
    >
      <Megaphone size={22} weight="bold" />
      Talk
    </button >
  )
}

interface IPlayerContainer {

}

export const PlayerContainer: FC<IPlayerContainer> = (props: IPlayerContainer) => {

  const tunePatP = useAppSelector(selectTunePatP);
  const isPublic = useAppSelector(selectIsPublic);

  return (
    <div className={` relative flex flex-col align-center  pt-2
                     ${isPhone() ? '' : ''}
  `}
      style={{
        width: '100%',
        height: '100%',
        paddingRight: '1rem',
        paddingLeft: '1rem',
        fontSize: '16px',
      }}
    >
      <Player />
      <div className='w-full relative mt-2 flex justify-center gap-2'>
        {(radio.our != tunePatP && !isPublic) ? <>
          <DisabledPlayButton />
          <DisabledTalkButton />
        </>
          :
          <>
            <PlayButton />
            <TalkButton />
          </>
        }
        {tunePatP == radio.our && <SettingsMenu />}
        <SyncActions />
      </div>
    </div >
  );

}