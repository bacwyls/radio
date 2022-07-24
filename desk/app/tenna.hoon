/-  *radio
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
  tune=@p
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
++  on-save   on-save:def
++  on-arvo   on-arvo:def
++  on-init   on-init:def
++  on-load   on-load:def
++  on-agent
  |=  [=wire =sign:agent:gall]
  ~&  >  ["tenna on-agent:" [wire sign]]
  ^-  (quip card _this)
  ?.  ?&  =(/radio-listen wire)
          ?=(%fact -.sign)
          =(%radio-update p.cage.sign)
          =(src.bowl tune.state)
      ==
    (on-agent:def wire sign)
  :_  this
  :~
    (fact:io cage.sign ~[/radio-listen/client])
  ==
++  on-poke
  |=  [=mark =vase]
  ~&  >>  ["tenna on-poke" mark vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
    ::
    :: :: radio
      %radio-action
    ?.  =(src.bowl our.bowl)
      `this
    =/  act  !<(action vase)
    ?-  -.act
      :: ::
      :: ::
      :: ::
          %tune
      =/  out=@p  tune.state
      =.  tune.state
          tune.act
      :_  this
      =/  wire  /radio-listen
      :~
        [%pass wire %agent [out %tower] %leave ~]
        [%pass wire %agent [tune.state %tower] %watch wire]
      ==
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path
    (on-watch:def path)
      [%radio-listen %client ~]
    `this
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  test  0
-- 

