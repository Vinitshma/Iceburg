import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  mediaRecorder:any; 
  chunks:any[] = []; 
  audioURL = '';
  recording_working:boolean = false;
  urlSafe:any;
  
  constructor(private sanitizer:DomSanitizer) { }

  AudioSpeetch(txt:string){
    const sp = new SpeechSynthesisUtterance(txt);
    sp.voice = speechSynthesis.getVoices()[1];
    speechSynthesis.speak(sp);
  }
  
  startMusic(name:string, srcFile:string){
    let audio = new Audio();
    if(name == "play"){
      audio.src = srcFile;
      audio.load();
      audio.play();
    }else if(name == "stop"){
      audio.currentTime = 0;
      audio.pause();
    }
  }

  startRecording() {
    this.urlSafe ='';
    this.chunks = [];
    
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({audio: true}).then((stream)=> {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.recording_working = true;
        
        this.mediaRecorder.ondataavailable = (e:any)=> {
          this.chunks.push(e.data);
        };
        
        this.mediaRecorder.onClick = () =>{
          console.log(this.mediaRecorder.state);
          if(this.mediaRecorder.state == "paused"){
            this.mediaRecorder.start();
            console.log("recorder started again!");
          }
        }

        this.mediaRecorder.onstop = ()=> {
          const blob = new Blob(this.chunks, { type: "audio/wav" });
          this.chunks = [];
          this.audioURL = "";
          this.audioURL = URL.createObjectURL(blob);
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.audioURL);
          
          // a => anchor tag
          // const file = document.createElement('a');
          // document.body.appendChild(file);
          // file.href = this.audioURL;
          // file.download = 'test.wav';
          // file.click();
          // window.URL.revokeObjectURL(this.audioURL);

          const audioContext = new AudioContext();
          audioContext.close;
          const microphone = audioContext.createMediaStreamSource(stream);
          microphone.disconnect;

          stream.getTracks().forEach(el=>{
            el.stop();
          })
          
        };

      }).catch(error => {
        console.log('Error capturing audio : ',error)
      })
    }else{
      alert("Your browser does not support mediaDevices!");
    }
  }

  stopRecording() {
    if(this.recording_working === true){
      this.recording_working = false;
      this.mediaRecorder.stop();
      setTimeout(() => {
        this.mediaRecorder.stop();
      }, 10);
    }
  };
}
