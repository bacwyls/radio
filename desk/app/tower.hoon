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
  talk=cord
  spin=cord
  ison=?
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
  `this
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  `this(state old)
  ==  
::  TODO something like this.
::  ^-  (quip card _this)
::  =/  tup=update  [%talk "welcome to your bit radio"]
::  =/  sup=update  [%spin "https://youtu.be/G68Q4lCM5pQ"]
::  :_  this
::  :~
::    (poke-self:io radio-update+!>(tup))
::    (poke-self:io radio-update+!>(sup))
::  ==
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
      =.  talk.state
          talk.act
      :_  this
      (transmit act)
      :: :: ::
          %spin
      ?.  ison  !!
      =.  spin.state
          spin.act
      :_  this
      (transmit act)
      :: ::
          %chat
      ?.  ison  !!
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
    =/  sac=action:store  [%spin spin.state]
    =/  tac=action:store  [%talk talk.state]
    :_  this
      :~
        (fact:io radio-action+!>(tac) ~[/radio-listen])
        (fact:io radio-action+!>(sac) ~[/radio-listen])
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

