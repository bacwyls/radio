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
  ^-  (quip card _this)
  ?.  ?&  =(/~/gossip/gossip wire)
          ?=(%fact -.sign)
          =(%radio-update p.cage.sign)
          =(src.bowl tune.state)
      ==
    ~&  [dap.bowl %strange-sign wire sign]
    (on-agent:def wire sign)
  :_  this
  :~
    (fact:io radio-update+!>(cage.sign) ~[/radio-listen])
  ==
++  on-poke
  |=  [=mark =vase]
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
      =.  tune.state
          tune.act
      :: sub to wire radio-listen on %tenna of tune
      `this
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path
    (on-watch:def path)
      [%radio-listen ~]
    `this
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  test  0
-- 

