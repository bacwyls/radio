import React, { FC, useState } from 'react';
interface IHelpMenu {
  top: number;
  left:number;
}

export const HelpMenu: FC<IHelpMenu> = (props: IHelpMenu) => {

  const {top, left} = props;


  return (
<div
className="p-4 bg-white"
style={{
  position:'absolute',
  top:top - 30,
  left:left,
  transform: 'translate(-100%, -100%)'
}}
>
<p className="mb-4">to interact with radio, enter commands in the bottom right</p>
<p className='italic mb-2'>
NAVIGATION:
</p>

<p className="font-bold">

!tune ~sampel-palnet
</p>
<div className="ml-4 mb-4">

<p> change radio stations. try ~nodmyn-dosrux </p>
</div>

<p className="font-bold">

!tune
</p>
<div className="ml-4 mb-4">

<p> (no argument) brings you to your home station </p>
</div>
<p>
-----------
</p>

<p className='italic mb-2'>

DJ COMMANDS:
</p>
<p className="font-bold">
!play https://www.youtube.com/watch?v=3vLHelBuTRM

</p>

<div className="ml-4 mb-4">
<p>change the current song / video / livestream</p>
<p>
(youtube, soundcloud, twitch, vimeo, audio/video URLs)
</p>
</div>


<p className="font-bold">
!talk hello world
</p>
<div className="ml-4 mb-4">

<p>broadcast text-to-speech</p>
{/* <p>everyone in the audience will hear this text spoken from their device</p> */}
</div>

{/* <p className="font-bold">
!background https://wallpapercave.com/wp/5w05B2R.jpg
</p>
<div className="ml-4 mb-4">

<p>change the background image</p>
</div> */}


<p>
-----------
</p>

<p className='italic mb-2'>

ADMIN COMMANDS:
</p>
{/* <p className="mb-4">only the radio station host can use these commands</p> */}

<p className="font-bold">
  !public
</p>
<div className="ml-4 mb-4">

<p>anyone can use DJ commands</p>
</div>
<p className="font-bold">
  !private
</p>
<div className="ml-4 mb-4">

<p>only the host can use DJ commands</p>
</div>

{/* <p className="font-bold">
!set-time
</p>
<div className="ml-4 mb-4">

<p>set the shared timestamp to your current timestamp</p>
</div> */}

{/* <p>
-----------
</p>
<p className='italic mb-2'>
OTHER COMMANDS:
</p>

<p className="font-bold">
!time

</p>
<div className="ml-4 mb-4">

<p>auto scrub to the shared timestamp</p>
</div> */}

      </div>
  );
};
