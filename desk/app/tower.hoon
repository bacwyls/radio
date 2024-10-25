/-  store=radio, gore=greg
/+  rib=radio
/+  default-agent, verb, dbug, agentio
=,  format
::
|%
+$  versioned-state
  $%  state-0
      state-1
      state-2
      state-3
  ==
+$  state-0  $:
  %0
  talk=_'welcome to urbit radio'
  spin=_'https://youtu.be/XGC80iRS7tw'
  spin-time=_~2022.10.3..20.40.15..7021
  online=_&
  public=_|
  viewers=(map ship time)
  chatlog=(list chat:store)
  banned=(set ship)
  ==
+$  state-1  $:
  %1 :: nothing changed from 0, just mishandled 0 so needed a nuke. see onload
  talk=_'welcome to urbit radio'
  spin=_'https://youtu.be/XGC80iRS7tw'
  spin-time=_~2022.10.3..20.40.15..7021
  online=_&
  public=_|
  viewers=(map ship time)
  chatlog=(list chat:store)
  banned=(set ship)
  ==
+$  state-2  $:
  %2
  tower-2:store
  ==
+$  state-3  $:
  %3
  tower-3:store
  ==
+$  card     card:agent:gall
--
%+  verb  |
%-  agent:dbug
=|  state-3
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
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-save
  ^-  vase
  !>(state)
++  on-init
  ^-  (quip card _this)
  `this
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  :: special case for state-0 because
  :: I changed the state without
  :: writing a proper on-load
  ?.  ?=(^ +.old-state)  !!
  ?:  =(%0 +<.old-state)
    :: one last hard nuke for state-0
    `this
  ::
  :: regular support for further upgrades
  =/  old  !<(versioned-state old-state)
  ?-  -.old
      %0
    `this
      %1
    =.  talk  talk.old
    =.  url.spin  spin.old
    =.  start-time.spin  spin-time.old
    =.  viewers   viewers.old
    =.  banned    banned.old
    =.  chatlog   chatlog.old
    `this
      %2
    =.  talk  talk.old
    =.  spin  spin.old
    =.  viewers   viewers.old
    =.  banned    banned.old
    =.  chatlog   chatlog.old
    `this
      %3  `this(state old)
  ==
++  on-leave
  |=  [=path]
  ?:  =(path /greg/local)
    `this
  =.  viewers
    (~(del by viewers) src.bowl)
  =/  ships=(set ship)
    ~(key by viewers)
  :_  this
  (transmit [%viewers ships])
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?:  (is-banned:rib bowl banned)
    `this
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
      %radio-action
    =/  act  !<(action:store vase)
    ?-  -.act
      :: ::
          %tune          `this
          %viewers       `this
          %chatlog       `this
          %tower-update  `this
      :: ::
          %permissions
      ::
      ?.  =(src.bowl our.bowl)
        !!
      =.  permissions
          p.act
      :_  this
      (transmit act)
      :: ::
          %online
      ?.  =(src.bowl our.bowl)
        !!
      =/  kik=(list card)
        :: going online or going offline
        :: kick everyone
        ?.  =(is-online.state online.act)
          :~
            (kick:io ~[/global /personal])
          ==
        ~
      =.  viewers
        ?.  =(is-online.state online.act)
          *(map ship time)
        viewers
      =.  chatlog
        *(list chat:store)
      =.  is-online.state
          is-online
      :_  this
        kik
      :: ::
          %talk
      ?.  permitted:hc
        :: permission denied
        `this
      =.  talk.act
          :: enfore maximum talk
          (crip (scag 64 (trip talk.act)))
      =.  talk.state
          talk.act
      :_  this
      (transmit act)
      :: ::
        %description
      ?.  permitted:hc
        :: permission denied
        `this
      =.  description.act
          :: enfore maximum description
          (crip (scag 64 (trip description.act)))
      =.  description.state
          description.act
      :_  this
      (transmit act)
      :: ::
          %spin
      ?.  permitted:hc
        :: permission denied
        `this
      ?:  (gth (lent (trip url.act)) 999)
        :: no stupidly long urls
        `this
      :: accept and process
      ::
      =.  spin-history
        (~(put in spin-history) url.act)
      ::
      =.  url.spin.state
          url.act
      ::
      =.  start-time.spin.state
          time.act
      :_  this
      (transmit act)
      :: ::
          %chat
      ?:  (is-banned:rib bowl banned)
        `this
      ?.  is-online  !!
      :: no spoofing
      ::
      =.  from.act  src.bowl
      =.  time.act  now.bowl
      :: enforce max length
      ::
      =.  message.act
          %-  crip
          (scag 2.000 (trip message.act))
      ::
      =/  =chat:store  +.act
      =.  chatlog  [chat chatlog]
      =.  chatlog
        ?:  (gth (lent chatlog) 90)
          (scag 90 chatlog)
        chatlog
      :_  this
      (transmit act)
      :: ::
          %presence
      =.  viewers
        (~(put by viewers) src.bowl now.bowl)
      =/  stale=(list ship)
        (get-stale viewers now.bowl)
      ?~  stale  `this
      =.  viewers
        (remove-viw viewers stale)
      ::
      :_  this
      :-  (transmit-card [%viewers ~(key by viewers)])
      %+  turn  stale
      |=  =ship
      (kick-only:io ship ~[/global /personal])
      :: ::
          %delete-chat
      =/  target-yore  (yore time.act)
      =/  target-ship=@p  from.act
      =.  chatlog
        %+  skip  chatlog
        |=  =chat:store
        =/  chat-yore  (yore time.chat)
        ?&  =(from.chat target-ship)
            =(a.target-yore a.chat-yore)
            =(y.target-yore y.chat-yore)
            =(m.target-yore m.chat-yore)
            =(d.t.target-yore d.t.chat-yore)
            =(h.t.target-yore h.t.chat-yore)
            =(m.t.target-yore m.t.chat-yore)
            =(s.t.target-yore s.t.chat-yore)
        ==
      :_  this
      (transmit act)
    ==
    :: :: greg
    :: in retrospect, an unfortunate name.
    :: greg is the central agent for the discovery index
    :: here we handle comms with the greg agent
    ::
      %greg-event
    =/  ent  !<(event:gore vase)
    ?-  -.ent
        %put
      ?.  =(src.bowl our.bowl)
        `this
      =/  tow=minitower:gore  +.ent
      :: set to latest viewer count
      ::
      :: if you want to spoof your viewer count,
      :: you can take this =. out
      ::  but you will be banned from the discovery pool :)
      ::
      =.  viewers.tow
        ~(wyt by viewers)
      ::
      =/  maybe-transmit-description=(list card)
        ?:  =(description description.tow)
          ~
        (transmit [%description description.tow])
      =.  description
        description.tow
      :_  this
      %+  weld
        (poke-greg:hc [%put tow])
        maybe-transmit-description
      :: ::
        %remove
      :_  this
      (poke-greg:hc ent)
        %request
      :: more than two minutes have passed since our last response
      ::
      ?.  (gth (sub now.bowl age.greg-cache) ~m2)
        `this
      :_  this
      (poke-greg:hc ent)
      :: ::
        %response
      :: assert that its from greg
      ?.  =(src.bowl greg-ship:hc)
        `this
      =.  greg-cache  [now.bowl +.ent]
      :_  this
      :~
        (fact:io greg-event+!>(ent) ~[/greg/local])
      ==
    ==
    :: :: radio admin
    :: ban handling
    ::
      %radio-admin
    ::
    =/  adi  !<(admin:rib vase)
    ?-  -.adi
        %unban
      ?.  ?|  =(src.bowl our.bowl)
              (~(has in promoted) src.bowl)
          ==
        :: only admin
        ::
        `this
      :: update banned list
      ::
      =.  banned
        (set-banned:rib adi banned)
      `this
      ::
        %ban
      ?.  ?|  =(src.bowl our.bowl)
              (~(has in promoted) src.bowl)
          ==
        ~&  ['failed to ban!']
        `this
      ?:  =(src.bowl ship.adi)
        :: dont ban yourself lol
        ::
        `this
      ?:  (~(has in promoted) ship.adi)
        :: dont ban a mod
        ::
        `this
      :: update banned list
      ::
      =.  banned
        (set-banned:rib adi banned)
      ?:  =(%unban -.adi)
        :: unban already processed, no further action
        ::
        `this
      :: create kick effect for a ban
      ::
      =.  viewers
          (~(del by viewers) ship.adi)
      :_  this
      :~
        (kick-only:io ship.adi ~[/personal /global])
        (transmit-card [%viewers ~(key by viewers)])
      ==
      ::
        %mod
      ?.  =(src.bowl our.bowl)
        :: only admin
        ::
        `this
      =.  promoted
        (~(put in promoted) ship.adi)
      =/  tower-update
        :*
          is-online
          permissions
          talk
          spin
          description
          viewers
          banned
          promoted
          chatlog
        ==
      :_  this
      :~
        (transmit-card [%tower-update tower-update])
      ==
      ::
        %unmod
      ?.  =(src.bowl our.bowl)
        :: only admin
        ::
        `this
      =.  promoted
        (~(del in promoted) ship.adi)
      =/  tower-update
        :*
          is-online
          permissions
          talk
          spin
          description
          viewers
          banned
          promoted
          chatlog
        ==
      :_  this
      :~
        (transmit-card [%tower-update tower-update])
      ==
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?:  (is-banned:rib bowl banned)
    :_  this
    :~  (kick-only:io src.bowl ~[/personal /global])
    ==
  ?.  is-online
    :_  this
    :: kick everyone
    ::
    :~  (kick:io ~[/global /personal])
    ==
  ?+    path
    (on-watch:def path)
      [%greg %local ~]
    ?>  =(src.bowl our.bowl)
    :_  this
    :~
      (fact:io greg-event+!>([%response tows.greg-cache]) ~[/greg/local])
    ==
      [%global ~]  :: waves
    :: no initial updates on the group path
    ::
    `this
      [%personal ~] :: rock
    =.  viewers
      (~(put by viewers) src.bowl now.bowl)
    =/  ships
      ~(key by viewers)
    =/  tower-update
      :*
        is-online
        permissions
        talk
        spin
        description
        viewers
        banned
        promoted
        chatlog
      ==
      
    :_  this
      :~
        (transmit-card [%viewers ships])
        ::
        :: TODO
        ::  during active use, its nice to send this data one bit at a time
        ::  but for the initial state load, it would be better to send
        ::  everything in a single fact
        ::   ::
        ::  unfortunately, this would require a refactor
        ::  or at least junk up the code in some way
        ::  i think there is much room for improvement, and a refactor for this purpose
        ::  will be in order soon
        ::   ::
        ::   :: (later)
        ::   hmmm, I tried adding an %initialize radio-action, with the full tower state inside.
        ::   I got some very buggy behavior that I was totally unable to track down for 8 hours.
        ::      I verified that I was sending out a fact %initialize with all of the correct data,
        ::      but somehow, on the other end, some fields were bunted.
        ::      I dug a few layers deep into gall to try to find the issue, but no dice.
        ::   giving up, returning to tradition. just sending a flurry of initial facts instead of one chunk of state.
        ::   still want to fix this eventually but it will probably have to come with a near full rewrite of radio.
        ::   ::
        ::   :: (later again)
        ::   lol the above issue was using e.g. face=_'special bunt' instead of face=cord for the mold of the update type.
        ::   just breaks something somewhere in the gall/clay/ames pipeline on the way to the subscriber
        ::
        (init-fact [%tower-update tower-update])
        ::
        (kick-only:io src.bowl ~[/personal])
      ==
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  permitted
  :: dj permissions
  ^-  ?
  ?:  =(src.bowl our.bowl)
    & :: admin
  ?:  (~(has in promoted) src.bowl)
    & :: moderator
  ::
  ?.  is-online
    | :: tower must be online
  ::
  ?.  (~(has by viewers) src.bowl)
    | :: src must be in viewers
  ::
  =(permissions %open)
::
++  init-fact
  |=  act=action:store
  (fact:agentio radio-action+!>(act) ~[/personal])
++  transmit-card
  |=  act=action:store
  (fact:agentio radio-action+!>(act) ~[/global])
++  transmit
  |=  act=action:store
  :~
    (fact:agentio radio-action+!>(act) ~[/global])
  ==
:: presence heartbeat
::
++  stale-timeout  ~m6
++  get-stale
  |=  [viw=(map ship time) now=time]
  ^-  (list ship)
  =/  vil
    ~(tap by viw)
  |-
  ?~  vil  ~
  ?:  (lth q.i.vil `@da`(sub now stale-timeout))
    :-  p.i.vil
    $(vil t.vil)
  $(vil t.vil)
++  remove-viw
  |=  [viw=(map ship time) stale=(list ship)]
  ^-  (map ship time)
  =.  viw
  |-
  ?~  stale  viw
    =.  viw
    (~(del by viw) i.stale)
    $(stale t.stale)
  viw
:: greg
::
++  greg-ship  ~nodmyn-dosrux
++  poke-greg
  |=  [ent=event:gore]
  :~
    %+  poke:pass:agentio
      [greg-ship %greg]
      :-  %greg-event
      !>  ent
  ==
-- 

