# radio

watch videos and listen to music with your friends on urbit.

viewing parties, audio/video curation, scheduled broadcasting, or just hanging out.

## Desk

there are two agents: tower and tenna.

tenna manages a single subscription to a remote tower configurable from the UI.

tower stores a configurable url+timestamp for media and relays chat messages to all subscribers.

## UI

the radio frontend uses the react-player npm library to play media based on a url+timestamp.

every radio station has its own chatroom. to interact with radio, users type commands into chat.
