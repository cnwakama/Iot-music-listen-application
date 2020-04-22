# Client - Record Audio

This is a simple audio recording function.

### How to use

The following code will record audio for 3 seconds, then play back the audio that it recorded.

```javascript
(async () => {
  const recorder = await recordAudio();
  recorder.start();
  await sleep(3000);
  const audio = await recorder.stop();
  audio.play();
})();
```

### Instructions for running the recording button

Press action button and start talking. You will be recorded for 3 seconds, then your recording will be played back.

