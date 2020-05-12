var socket = io.connect("/");
var note;

const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();
    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();

          resolve({ audioBlob, audioUrl, play, note });
        });

        mediaRecorder.stop();
      });

    resolve({ start, stop });
  });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const handleAction = async () => {
  const recognizer = await createModel();
  const classLabels = recognizer.wordLabels(); // get class labels
  const labelContainer = document.getElementById("label-container");
  for (let i = 0; i < classLabels.length; i++) {
    labelContainer.appendChild(document.createElement("div"));
  }
  
  recognizer.listen(
    result => {
      const scores = result.scores; // probability of prediction for each class
      // render the probability scores per class
      for (let i = 0; i < classLabels.length; i++) {
        const classPrediction =
          classLabels[i] + ": " + result.scores[i].toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
      }
      let i = scores.indexOf(Math.max(...scores));
      note = classLabels[i];
      console.log("Note");
      console.log(note);
      
    },
    {
      includeSpectrogram: true, // in case listen should return result.spectrogram
      probabilityThreshold: 0.75,
      invokeCallbackOnNoiseAndUnknown: true,
      overlapFactor: 0.5 // probably want between 0.5 and 0.75. More info in README
    }
  );

  const recorder = await recordAudio();
  const actionButton = document.getElementById("action");
  actionButton.disabled = true;
  recorder.start();


  await sleep(3000);
  const audio = await recorder.stop();
  recognizer.stopListening();
  audio.play();
  await sleep(3000);

  actionButton.disabled = false;

  var reader = new FileReader();
  reader.readAsDataURL(audio.audioBlob);
  reader.onloadend = function() {
    var base64data = reader.result;
    socket.emit("time", {
      note: note,
      audio: base64data,
      duration: 3
    });
  };
};

async function createModel() {
  let URL = "https://teachablemachine.withgoogle.com/models/TAksF3RT4/";
  const checkpointURL = URL + "model.json"; // model topology
  const metadataURL = URL + "metadata.json"; // model metadata
  
  console.log("here");

  const recognizer = speechCommands.create(
    "BROWSER_FFT", // fourier transform type, not useful to change
    undefined, // speech commands vocabulary feature, not useful for your models
    checkpointURL,
    metadataURL
  );

  // check that model and metadata are loaded via HTTPS requests.
  await recognizer.ensureModelLoaded();
  
  console.log("Model is Ready");

  return recognizer;
}

// audio and timestamp send
