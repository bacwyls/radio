/-  store=radio
/+  radio
/+  default-agent, dbug, agentio
=,  format
::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  $:
  %0
  talk=_'welcome to urbit radio'
  spin=_'https://youtu.be/ubFq-wV3Eic'
  spin-time=@da
  test=@
  view=_'' :: https://0x0.st/oS_V.png
  ison=_&
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
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  :: ~&  >  [%on-arvo %tower wire]
  `this
++  on-save
  ^-  vase
  !>(state)
++  on-init
  ^-  (quip card _this)
  =.  spin  'https://youtu.be/ubFq-wV3Eic'
  =.  spin-time  now.bowl
  `this
++  on-load  on-load:def
  :: |=  old-state=vase
  :: ^-  (quip card _this)
  :: =/  old  !<(versioned-state old-state)
  :: ?-  -.old
  ::   %0  `this(state old)
  :: ==
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
    ::
    :: :: radio
      %radio-action
    =/  act  !<(action:store vase)
    :: ~&  >>  [%on-poke-tower -.act]
    ?-  -.act
      :: ::
          %tune  `this
      :: ::
          %power
      ?.  =(src.bowl our.bowl)
        !!
      =.  ison.state
          ison.act
      `this
      :: ::
          %talk
      ?.  ison  !!
      ?.  =(src.bowl our.bowl)
        !!
      =.  talk.state
          talk.act
      :_  this
      (transmit act)
      :: ::
          %spin
      ?.  ison  !!
      ?.  =(src.bowl our.bowl)
        !!
      =.  spin.state
          url.act
      ::
      =.  time.act
          now.bowl
      =.  spin-time.state
          time.act
      :_  this
      (transmit act)
      :: ::
      %view
      ?.  ison  !!
      ?.  =(src.bowl our.bowl)
        !!
      =.  view.state
          view.act
      :_  this
      (transmit act)
      :: ::
          %chat
      ?.  ison  !!
      ?.  =(from.act src.bowl)
        !!
      :_  this
      (transmit act)
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  :: ~&  >  [%on-watch %tower path]
  ?+    path
    (on-watch:def path)
      [%radio-listen ~]
    =/  sac=action:store  [%spin spin.state spin-time.state]
    =/  tac=action:store  [%talk talk.state]
    =/  vac=action:store  [%view view.state]
    =/  tuc=action:store  [%tune our.bowl]
    :_  this
      :~
        (fact:io radio-action+!>(tac) ~[/radio-listen])
        (fact:io radio-action+!>(sac) ~[/radio-listen])
        (fact:io radio-action+!>(tuc) ~[/radio-listen])
        (fact:io radio-action+!>(vac) ~[/radio-listen])
      ==
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  nil  0
++  transmit
  |=  act=action:store
  :: ~&  >>>  [%tower-transmitting act]
  :~
    (fact:agentio radio-action+!>(act) ~[/radio-listen])
  ==
-- 

