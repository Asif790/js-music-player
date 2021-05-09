const musicContainer=document.getElementById('music-container');
const cover=document.getElementById('music-cover')
const title= document.getElementById('cover-name')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const audio = document.getElementById('audio')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

const songs = [
    'Attack on Titan- Opening 1',
    'Fairy Tail- Violin Cover',
    'Shinzou Sasageyo- Attack on Titan',
    'Unravel-Tokyo Ghoul',
    ];

var songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song){
    cover.src = `asset/cover/${song}.jpg`
    title.innerText = song;
    audio.src = `asset/music/${song}.mp3`
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause();
}

function prevSong(){
    songIndex--;
    
    if(songIndex<0){
        songIndex=songs.length-1
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(){
    const {duration, currentTime} = audio;
    const progressPercentage = (currentTime/duration )*100;
    progress.style.width=`${progressPercentage}%`;
    
}

function setProgress(event){
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX/width) * duration
}

playBtn.addEventListener('click' , () =>{
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
})

prevBtn.addEventListener('click' , prevSong)

nextBtn.addEventListener('click' , nextSong)
audio.addEventListener('timeupdate' , updateProgress)
progressContainer.addEventListener('click' , setProgress)
audio.addEventListener('ended', nextSong)