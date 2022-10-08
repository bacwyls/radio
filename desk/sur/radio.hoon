|%
::
:: ::
+$  chat
  $:
  message=cord
  from=ship
  ==
::
+$  action
  $%
    [%tune tune=(unit @p)]
    [%talk talk=cord]
    :: [%view view=cord]
    [%spin url=cord time=@da]
    [%chat message=cord from=ship]
    [%online online=?]
    [%public public=?]
    [%viewers viewers=(set ship)]
    [%chatlog chatlog=(list chat)]
  ==
--
