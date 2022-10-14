/-  sur=greg
=<  [sur .]
=,  sur
|%
::
::
++  enjs
  =,  enjs:format
  |%
  ++  event
    |=  ent=^event
    ^-  json
    %-  pairs
    :_  ~
    ^-  [cord json]
    :-  -.ent
    ?-  -.ent
    %put       (en-minitower +.ent)
    %request   ~
    %response  (set-minitower +.ent)
    ==
  --
++  set-minitower
  |=  [tows=(set minitower)]
  ^-  json
  :-  %a
  %+  turn
    ~(tap in tows)
    |=  =minitower
    (en-minitower minitower)
++  en-minitower
  |=  [tow=minitower]
  ^-  json
  %-  pairs:enjs
  :~
  ['description' %s description.tow]
  ['location' %s (scot %p location.tow)]
  ['time' (sect:enjs time.tow)]
  ['viewers' (numb:enjs viewers.tow)]
  ==
++  dejs
  =,  dejs:format
  |%
  ++  event
    |=  jon=json
    ^-  ^event
    :: *^event
    =<  (decode jon)
    |%
    ++  decode
      %-  of
      :~
        :: [%put *minitower]
        [%request ul]
        :: [%response *(set minitower)]
      ==
    ++  patp
      (su ;~(pfix sig fed:ag))
    ::
    --
  --
--