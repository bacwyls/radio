/-  store=greg
/+  greg
/+  default-agent, dbug, agentio
=,  format
:: ::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  $:
  %0
  minitowers=(map ship minitower:store)
  banned=(set ship)
  ==
+$  card     card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
    hc    ~(. +> bowl)
    io    ~(. agentio bowl)
::
++  on-fail   on-fail:def
++  on-peek   on-peek:def
++  on-load   on-load:def
++  on-leave  on-leave:def
++  on-watch  on-watch:def
++  on-agent   on-agent:def
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  `this
++  on-save
  ^-  vase
  !>(state)
++  on-init
  ^-  (quip card _this)
  `this
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
    ::
    :: :: radio
      %greg-event
    =/  ent  !<(event:store vase)
    :: ~&  >  [%greg %poke ent]
    ?-  -.ent
      :: ::
          %response  `this
      :: ::
          %put
      =/  tow=minitower:store  +.ent
      ?:  =(0 viewers.tow)  `this
      ::
      =.  description.tow
        ::  truncate description
        %-  crip
        %+  scag
          max-description
          (trip description.tow)
      ::
      :: set true time and location
      =.  location.tow  src.bowl
      =.  time.tow  now.bowl
      ::
      :: truncate viewers
      ::   no silly numbers.
      :: if you have more than 256 viewers im gonna find you and
      =.  viewers.tow
        ?:  (gth viewers.tow max-viewers)
          max-viewers
        viewers.tow
      =.  minitowers
        (~(put by minitowers) src.bowl tow)
      `this
      :: ::
          %request
      :: filter out crud
      =/  stale=(list ship)
        (get-stale minitowers now.bowl)
      =.  minitowers
        (remove minitowers stale)
      ::
      :: form the output
      =/  vini
        ~(val by minitowers)
      =|  mini=(set minitower:store)
      =.  mini  (~(gas by mini) vini)
      :_  this
      (poke src.bowl [%response mini])
    ==
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  max-description    64
++  max-viewers       256
++  timeout           ~6m  :: TODO pick a thoughtful time depending on how frequent data is put 
++  poke
  |=  [src=ship ent=event:store]
  :~
    %+  poke:pass:agentio
      [src %tower]
      :-  %greg-event
      !>  ent
  ==
++  get-stale
  |=  [tows=(map ship minitower:store) now=time]
  ^-  (list ship)
  =/  til
    ~(tap by tows)
  |-
  ?~  til  ~
  ?:  (lth time.q.i.til `@da`(sub now timeout))
    :-  p.i.til
    $(til t.til)
  $(til t.til)
++  remove
  |=  [tows=(map ship minitower:store) stale=(list ship)]
  ^-  (map ship minitower:store)
  =.  tows
  |-
  ?~  stale  tows
    =.  tows
    (~(del by tows) i.stale)
    $(stale t.stale)
  tows
-- 

