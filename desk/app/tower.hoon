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
  spin=_'https://youtu.be/XGC80iRS7tw' :: classical music
  :: spin=_'https://youtu.be/ubFq-wV3Eic' :: tv static
  spin-time=_~2022.10.3..20.40.15..7021
  view=_'' :: https://0x0.st/oS_V.png
  online=_&
  public=_&
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
  ::
  :: annoyance: now.bowl here is wrong!
  :: =.  spin-time  now.bowl
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
    :: ~&  >>  [%on-poke-tower act]
    ?-  -.act
      :: ::
          %tune  `this
      :: ::
          %public
      ?.  =(src.bowl our.bowl)
        !!
      =.  public.state
          public.act
      `this
      :: ::
          %online
      ?.  =(src.bowl our.bowl)
        !!
      =.  online.state
          online.act
      ?.  online
        :_  this
        :~
          (kick:io ~[/global /personal])
        ==
      `this
      :: ::
          %talk
      ?.  permitted:hc  !!
      =.  talk.state
          talk.act
      :_  this
      (transmit act)
      :: ::
          %spin
      ?.  permitted:hc  !!
      =.  spin.state
          url.act
      ::
      =.  spin-time.state
          time.act
      :_  this
      (transmit act)
      :: ::
      %view
      ?.  permitted:hc  !!
      =.  view.state
          view.act
      :_  this
      (transmit act)
      :: ::
          %chat
      :: ?.  permitted:hc  !!
      ?.  online  !!
      =.  from.act  src.bowl
      :_  this
      (transmit act)
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  :: ~&  >  [%on-watch %tower path]
  ?.  online
    :_  this
    :~  (kick:io ~[/global /personal])
    ==
  ?+    path
    (on-watch:def path)
      [%global ~]
    :: no initial updates on the group path
    `this
      [%personal ~]
    :_  this
      :~
        (init-fact [%spin spin spin-time])
        (init-fact [%talk talk])
        (init-fact [%view view])
        (init-fact [%tune `our.bowl])
        (kick:io ~[/personal])
      ==
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  nil  0
++  permitted
  ^-  ?
  ?:  =(src.bowl our.bowl)
    &
  ?&(online public)
++  init-fact
  |=  act=action:store
  (fact:agentio radio-action+!>(act) ~[/personal])
++  transmit
  |=  act=action:store
  :: ~&  >>>  [%tower-transmitting act]
  :~
    (fact:agentio radio-action+!>(act) ~[/global])
  ==
-- 
