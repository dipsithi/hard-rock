

const searchBtn = document.getElementById ("searchBtn");
searchBtn.addEventListener ('click', function(){
    getResult (searchArea.value);
})

function getResult (value) {
    fetch (`https://api.lyrics.ovh/suggest/${value}`)
    .then (response => response.json())
    .then (songs => displayResult (songs))
}


function displayResult (songs) {
    const allSongs = songs.data;
    const searchResult = document.getElementById ("searchResult");
    let htmlTemplate = '';
    for ( let i = 0; i<10; i++){
        const title = allSongs[i].title;
        const artist = allSongs [i].artist.name;
        const album = allSongs[i].album.title;
        const albumCover = allSongs[i].album.cover;
        htmlTemplate += `<div class = "single-result row my-3 p-3 d-flex justify-content-between align-item-centre">
                                
                                <div class ="col-md-6">
                                <h3 id ="title">${title}</h3>
                                <p class = "author lead">Album by: <span>${album}</span></p>
                                
                                </div>
                                
                                <div class = "col-md-3 text-md-right text-center">
                                <button onclick = "getLyrics ('${artist}', '${title}')" class ="btn btn-success"> Get Lyrics
                                </button>
                                </div>
                        </div>`
    }

    searchResult.innerHTML = htmlTemplate;
}

function getLyrics (artist, title){
    // console.log (artist, title);
    fetch (`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then (response => response.json())
    .then (function displayLyrics(data){
        var currentLyrics = data.lyrics;
        let lyric = '';
        const displayArea = document.getElementById ("lyricsArea");
        lyric = `<button class = "btn go-back btn-success" onclick = "hide()">Go-Back</button>
        <h2 class ="text-success mb-4">${title}</h2>
        <h4 class = "text-success mb-4">${artist}</h4>
        <pre class ="lyric text-white">${currentLyrics}</pre>`

        // currentLyrics.innerHTML = lyrics;
    })
    console.log (artist, title);
}

function hide(){
    const displayArea = document.getElementById("lyricsArea");
    displayArea.remove();
}
