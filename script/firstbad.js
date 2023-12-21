import { badcart } from './artislog/bad.js';
import { bandinginidbad } from './favorite.js';

// DRAKE
let simpansecondhtmlbad = '';
badcart.forEach((bad) => {
  let secondhtmlbad = `
    <div class="kotakkecil">
    <img class="kotakgambar" src="${bad.image}" alt="" />
    <p class="tulisankotak">${bad.judullagu}</p>
    <p class="tulisankotak1">${bad.Nama}</p>
    <audio class="audio" data-button-audio="${bad.judullagu} by${bad.Nama}" src="${bad.song}" controls></audio>
    <div class="addtofav">
      <button class="buttonfav" data-button-bad="${bad.id}">
        Add To Your Favorite
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
        </svg>
      </button>
    </div>
  </div>`;
  simpansecondhtmlbad += secondhtmlbad;
});
document.querySelector('.bad').innerHTML = simpansecondhtmlbad;

document.querySelectorAll('.buttonfav').forEach((button) => {
  button.addEventListener('click', () => {
    const idbad = button.dataset.buttonBad;
    bandinginidbad(idbad);

    // Mengupdate tampilan dari button fav
    // Ngambil id yang sesuai dengan button yang di klik
    const gantiNamaElement = document.querySelector(`.buttonfav[data-button-bad="${idbad}"]`);
    console.log(gantiNamaElement);

    badcart.forEach((badcart) => {
      if (idbad === badcart.id) {
        gantiNamaElement.innerHTML = 'Already Added To Favorite';
      }
    });
  });
});
document.querySelectorAll('.audio').forEach((button) => {
  button.addEventListener('play', () => {
    document.querySelectorAll('.audio').forEach((otheraudio) => {
      if (button !== otheraudio) {
        otheraudio.pause();
      }
    });
    const idaudioandname = button.dataset.buttonAudio;
    document.querySelector('.listplay').innerHTML = idaudioandname;
  });
});

jalanlagunya();

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
    document.querySelector('.listplay').innerHTML = idaudioandname;
  }
}
