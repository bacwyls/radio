|%
::
:: ::
+$  minitower
  $:
  description=cord
  location=ship
  time=@da
  viewers=@ud
  public=?
  ==
::
+$  event
  $%
    [%put =minitower]
    [%request ~]
    [%response minitowers=(map ship minitower)]
  ==
--
