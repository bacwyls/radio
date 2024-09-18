/-  greg
|%
::
:: ::
:: +$  playlist
::   :: if the host is present, could sync up this way by setting new starttime and changing index
::   :: the problem is, this only syncs if the host is watching from radio frontend
::   :: we dont know how long each url is, not even in reactplayer, would need a special api.
::   :: youtube obfuscates, mp3/mp4 you have to actually download to find out (loom+downspeed from iris makes this impossibru)
::   $:
::   urls=(list cord)
::   current=@ud
::   start-time=_~2022.10.3..20.40.15..7021
::   ==
::
+$  chat
  $:
    message=cord
    from=ship
    time=@da
  ==
::
+$  admin
  $%
    [%ban =ship]
    [%unban =ship]
  ==
+$  permissions
  ?(%open %closed)
+$  spin
  $:
    url=_'https://youtu.be/XGC80iRS7tw'    :: classical music
    start-time=_~2022.10.3..20.40.15..7021 :: just *time makes ReactPlayer confused, too old
  ==
+$  tower-2
  $:
    is-online=_&
    =permissions
    talk=_'welcome to urbit radio'
    =spin
    description=_''
    viewers=(map ship time)
    banned=(set ship)   
    promoted=(set ship)
    chatlog=(list chat)
  ==
+$  tower-3
  $:
    is-online=_&
    =permissions
    talk=_'welcome to urbit radio'
    =spin
    description=_''
    viewers=(map ship time)
    banned=(set ship)   
    promoted=(set ship)
    chatlog=(list chat)
    greg-cache=[age=@da tows=(map ship minitower:greg)]
    spin-history=(set cord)
  ==
+$  tower-3-update
  $:
    is-online=_&
    =permissions
    talk=_'welcome to urbit radio'
    =spin
    description=_''
    viewers=(map ship time)
    banned=(set ship)   
    promoted=(set ship)
    chatlog=(list chat)
  ==
::
:: action or event?
:: not going to rename right now,
::  but i think event makes more sense since
::  these are all used as both 'actions' and 'updates'
::
::  actions: alter agent state
::  updates: receive agent state change
::
::  events: both.
::   perhaps doing both with one mark is not explicit enough?
::   but i think it does a lot to keep complexity down
::
+$  action
  $%
    [%tune tune=(unit @p)]
    [%talk talk=cord]
    [%spin url=cord time=@da]
    [%chat message=cord from=ship time=@da]
    [%online online=?]
    [%permissions p=permissions]
    [%viewers viewers=(set ship)]
    [%chatlog chatlog=(list chat)]
    [%presence ~]
    [%description description=cord]
    [%tower-update tow=tower-3-update]
    [%delete-chat from=ship time=@da]
  ==
--
