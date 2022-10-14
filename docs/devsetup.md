create two fake ships

```
./urbit -F hec
```

```
./urbit -F duc
```

in hec do the following in dojo

```
|merge %radio our %base
|mount %radio
```

in unix, under the hec pier

```
cd radio/
rm -r ./*
cp -rL ~/repos/urbit/pkg/base-dev/* .
cp -rL ~/repos/urbit/pkg/garden-dev/* .
```

then set up rsync for the hoon

```
cd ~/repos/radio/
cd desk
./install -w ~/urbit/fakes/hec/radio
```

now back in the hec dojo

```
|commit %radio
|install our %radio
:treaty|publish %radio
```

now in the duc dojo

```
|install ~hec %radio
```

-

then the frontend stuff

```
cd ~/repos/radio/ui
npm i
npm run dev
```

and go to localhost:3000/apps/radio

-

build with

```
npm run build
```

upload to http://localhost/docket/upload
or put on s3 and change desk.docket-0

to update hoon, run

```
|commit %radio
```

in hec dojo
