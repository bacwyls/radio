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
  talk=tape
  spin=tape
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
++  on-agent  on-agent:def
++  on-init   on-init:def
++  on-load   on-load:def
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
    ::
    :: :: radio
      %radio-update
    ?.  =(src.bowl our.bowl)
      `this
    =/  upd  !<(update vase)
    ?-  -.upd
      :: ::
          %talk
      =.  talk.state
          talk.upd
      =/  tup=update  [%talk talk.state]
      :_  this
      :~
        (fact:io radio-update+!>(tup) ~[/radio-listen])
      ==
      :: ::
          %spin
      =.  spin.state
          spin.upd
      =/  sup=update  [%spin spin.state]
      :_  this
      :~
        (fact:io radio-update+!>(sup) ~[/radio-listen])
      ==
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path
    (on-watch:def path)
      [%radio-listen ~]
    =/  sup=update  [%spin spin.state]
    =/  tup=update  [%talk talk.state]
    :_  this
      :~
        :: hmm this doesnt seem to reach the client? TODO
        (fact:io radio-update+!>(tup) ~[/radio-listen])
        (fact:io radio-update+!>(sup) ~[/radio-listen])
      ==
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  test  0
-- 

