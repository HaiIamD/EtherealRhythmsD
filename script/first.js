import { taylorcart } from './artislog/taylor.js';
import { bandinginid } from './favorite.js';

let simpansecondhtml = '';
taylorcart.forEach((taylor) => {
  let secondhtml = `
    <div class="kotakkecil">
    <img class="kotakgambar" src="${taylor.image}" alt="" />
    <p class="tulisankotak">${taylor.judullagu}</p>
    <p class="tulisankotak1">${taylor.Nama}</p>
    <audio class="audio" data-button-audio=" ${taylor.judullagu} by ${taylor.Nama}" src="${taylor.song}" controls></audio>
    <div class="addtofav">
      <button class="buttonfav gantinama" data-button-taylor="${taylor.id}">
        Add To Your Favorite
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
        </svg>
      </button>
    </div>
  </div>`;
  simpansecondhtml += secondhtml;
});
console.log(document.querySelector('.kotakgambarbanyak'));
document.querySelector('.kotakgambarbanyak').innerHTML = simpansecondhtml;

document.querySelectorAll('.buttonfav').forEach((button) => {
  button.addEventListener('click', () => {
    const idtaylor = button.dataset.buttonTaylor;
    bandinginid(idtaylor);

    // Mengupdate tampilan dari button fav
    // Ngambil id yang sesuai dengan button yang di klik
    const gantiNamaElement = document.querySelector(`.gantinama[data-button-taylor="${idtaylor}"]`);
    console.log(gantiNamaElement);

    taylorcart.forEach((taylorcart) => {
      if (idtaylor === taylorcart.id) {
        gantiNamaElement.innerHTML = 'Already Added To Favorite';
      }
    });
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

// Mmebuat menjalankan seeked dan renadom play
// function jalanlagunya() {
//   const audioElements = document.querySelectorAll('.audio');

//   audioElements.forEach((audio, index) => {
//     audio.addEventListener('ended', () => {
//       playNextAudio(index);
//     });

//     audio.addEventListener('play', () => {
//       pauseOtherAudios(index);
//       updateDisplayedText(audio);
//     });

//     audio.addEventListener('seeked', () => {
//       seekePlay(audio);
//     });
//   });

//   function playNextAudio(currentIndex) {
//     const randomIndex = generateRandomIndex(currentIndex, audioElements.length);
//     const nextAudio = audioElements[randomIndex];

//     audioElements.forEach((audio) => {
//       audio.pause();
//       audio.currentTime = 0;
//     });

//     updateDisplayedText(nextAudio);
//   }

//   function seekePlay(audio) {
//     if (audio.paused) {
//       // Memulai audio secara manual setelah seeked
//       audio.play();
//     } else {
//       audio.pause();
//       // Memulai audio secara manual setelah seeked
//       audio.play();
//     }
//   }

//   function pauseOtherAudios(currentIndex) {
//     audioElements.forEach((audio, index) => {
//       if (index !== currentIndex) {
//         audio.pause();
//       }
//     });
//   }

//   function updateDisplayedText(audioElement) {
//     const idaudioandname = audioElement.dataset.buttonAudio;
//     document.querySelector('.listplay').innerHTML = idaudioandname;
//   }

//   function generateRandomIndex(currentIndex, arrayLength) {
//     let randomIndex;
//     do {
//       randomIndex = Math.floor(Math.random() * arrayLength);
//     } while (randomIndex === currentIndex);
//     return randomIndex;
//   }
// }
