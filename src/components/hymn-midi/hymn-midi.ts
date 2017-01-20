import MIDIFile from "midifile/src/MIDIFile";
import MIDIPlayer from "midiplayer/src/MIDIPlayer";
declare var navigator;

export class HymnMidi {
  root: string = "assets/media/midi/";
  title: string;
  exists: boolean = false;
  path: string;
  player: any;
  playing: boolean = false;


  constructor(hymn){
    this.title = hymn.title.toLowerCase().replace(/[,!\?]/g, "").replace(/[,-\s]/g,"_");
    this.path = this.root+this.title+".mid";
    this.loadMidiFile(this.path);
  }

  //Load the midi file from the path
  loadMidiFile(path) {
    // Create XHR, Blob and FileReader objects
    let xhr = new XMLHttpRequest(),
        reader = new FileReader();

    xhr.open("GET", path, true);
    // Set the responseType to blob
    xhr.responseType = "blob";

    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
            reader.onload = event => {
                let buffer = reader.result;
                let midiFile = new MIDIFile(buffer);
                console.log("MIDI File:", midiFile);
                this.setupMidiPlayer(midiFile);
                this.exists = true;
            };

            reader.onerror = event => {
                this.exists = false;
                console.error("File could not be read! Code: ", event.error.code);
            };

            reader.readAsArrayBuffer(xhr.response);
          }
    }, false);
    // Send XHR
    xhr.send();
  }

  //setup the midi player to play file
  setupMidiPlayer(midiFile) {
    navigator.requestMIDIAccess().then(midiAccess => {
      let outputInterface;
      midiAccess.outputs.forEach(output => outputInterface = output);
      // Creating player
      this.player = new MIDIPlayer({
        'output': outputInterface
      });
      // Load the midiFile instance in the player
      this.player.load(midiFile);
    });
  }

}
