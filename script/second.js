import { favorite, removefavoriteid, reloadquantity } from './favorite.js';
function buathtmlfavortie() {
  console.log('Function buathtmlfavortie is running.');
  let htmlfavorite = '';
  favorite.forEach((favorite) => {
    let htmlfavorite1 = `
      <div class="kotakkecil">
              <img class="kotakgambar" src="${favorite.image}" alt="" />
              <p class="tulisankotak">${favorite.judullagu}</p>
              <p class="tulisankotak1">${favorite.Nama}</p>
              <audio class="audio" data-button-audio="${favorite.judullagu} by ${favorite.Nama}"  src="${favorite.song}" controls></audio>
              <div class="addtofav">
                <button class="buttondel" data-button-del="${favorite.id}">
                  Delate From Favorite
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-x-fill" viewBox="0 0 16 16">
                    <path
                      fill-rule="evenodd"
                      d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M6.854 5.146a.5.5 0 1 0-.708.708L7.293 7 6.146 8.146a.5.5 0 1 0 .708.708L8 7.707l1.146 1.147a.5.5 0 1 0 .708-.708L8.707 7l1.147-1.146a.5.5 0 0 0-.708-.708L8 6.293z"
                    />
                  </svg>
                </button>
              </div>
            </div>
    `;
    htmlfavorite += htmlfavorite1;
  });
  document.querySelector('.inihasil').innerHTML = htmlfavorite;

  //   Remove yaa

  document.querySelectorAll('.buttondel').forEach((button) => {
    button.addEventListener('click', () => {
      const iddel = button.dataset.buttonDel;
      removefavoriteid(iddel);
      buathtmlfavortie();
    });
  });
  jalanlagunya();
}

buathtmlfavortie();
reloadquantity();

function jalanlagunya() {
  const audioElements = document.querySelectorAll('.audio');

  audioElements.forEach((audio, index) => {
    audio.addEventListener('ended', () => {
      playNextAudio(index);
    });

    audio.addEventListener('play', () => {
      pauseOtherAudios(index);
      updateDisplayedText(audio);
    });
  });

  function playNextAudio(currentIndex) {
    const nextIndex = (currentIndex + 1) % audioElements.length;
    const nextAudio = audioElements[nextIndex];
    console.log(nextAudio);
    audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    nextAudio.play();
    updateDisplayedText(nextAudio);
  }

  function pauseOtherAudios(currentIndex) {
    audioElements.forEach((audio, index) => {
      if (index !== currentIndex) {
        audio.pause();
      }
    });
  }

  function updateDisplayedText(audioElement) {
    const idaudioandname = audioElement.dataset.buttonAudio;
    document.title = `Now Playing ${idaudioandname}`;
    document.querySelector('.namaartis').innerHTML = idaudioandname;
  }
}
