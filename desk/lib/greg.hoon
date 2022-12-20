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
    %response  (map-minitower +.ent)
    ==
  --
++  map-minitower
  |=  [tows=(map ship minitower)]
  ^-  json
  :-  %a
  %+  turn
    ~(val by tows)
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
  ['public' %b public.tow]
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
        [%put de-minitower]
        [%request ul]
        :: [%response *(set minitower)]
      ==
    ++  de-minitower
      %-  ot
      :~
        [%description so]
        [%location patp]
        [%time di]
        [%viewers ni]
        [%public bo]
      ==
    ++  patp
      (su ;~(pfix sig fed:ag))
    ::
    --
  --
--