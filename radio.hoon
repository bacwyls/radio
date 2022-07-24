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
  status=tape
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
++  on-poke   on-poke:def
++  on-watch  on-watch:def
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  test  0
-- 

