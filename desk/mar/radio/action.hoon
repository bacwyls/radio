/-  radio
=,  format
|_  act=action:radio
++  grab
  |%  
  ++  noun  action:radio
  ++  json
    |=  jon=^json
    %-  action:radio
    =<  (action-noun jon)
    |%
    ++  action-noun
      %-  of:dejs
      :~
        [%tune (se:dejs %p)]
      ==
    --
  --  
++  grow
  |%  
  ++  noun  act 
::  ++  json
::    ?-  -.act
::    %tune
::      %+  frond:enjs
::      %tune
::      :-  %s
::      (scow %p who.act)
::    ==
  --  
++  grad  %noun
--


