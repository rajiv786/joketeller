const button = document.getElementById('button');
const audioElement=document.getElementById('audio');

function toggleButton(){
button.disabled = !button.disabled;
}

//passing joke to voicerss api
function tellme(joke){
   const jokeString = joke.trim().replace(/ /g, '%20');
   console.log('tell me',joke);
   VoiceRSS.speech({
    key: '5620e45474d14e1e858d2903fcc1cb70',
    src:jokeString,
    hl:'en-us',
    r:0,
    c:'mp3',
    f:'44khz_16bit_stereo',
    ssml:false,
});
}
async function getJokes(){
    let joke = '';
    const apiurl='https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single'
    
    try{
        const response = await fetch(apiurl);
        const data = await response.json();
    if(data.setup){
        joke =`${data.setup} ...${data.delivery}`;
    }
    else{
        joke =data.joke;
    }
    tellme(joke);
    toggleButton();
    }
    catch(error){
        //catch Errors Here
    }
};
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended', toggleButton);
