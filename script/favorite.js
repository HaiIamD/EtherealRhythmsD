import { taylorcart } from './artislog/taylor.js';
import { drakecart } from './artislog/drake.js';
import { badcart } from './artislog/bad.js';

export let favorite = JSON.parse(localStorage.getItem('cartlocal'));
if (!favorite) {
  favorite = [
    {
      id: '1=43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      Nama: 'Taylor Swift',
      song: 'song/taylor-alltowell.mp3',
      image: 'Images/taylor-alltowell.jpg',
      judullagu: 'All to well',
      quantity: '1',
    },
  ];
}

export function reloadquantity() {
  let simpanfav = 0;

  favorite.forEach((fav) => {
    const angka = parseInt(fav.quantity);
    simpanfav += angka;
  });
  if (simpanfav === 0) {
    document.querySelector('.namaartis').innerHTML = `No Favorite Song :( `;
  } else {
    document.querySelector('.namaartis').innerHTML = `Here Your ${simpanfav} Favorite Song`;
  }
}
let simpanidsama;
export function bandinginid(idtaylor) {
  taylorcart.forEach((taylorcartid) => {
    if (taylorcartid.id === idtaylor) {
      simpanidsama = taylorcartid;
    }
  });
  simpankefavorite(idtaylor);
}

export function bandinginiddrake(iddrake) {
  drakecart.forEach((drakecartid) => {
    if (drakecartid.id === iddrake) {
      simpanidsama = drakecartid;
    }
  });
  simpankefavorite(iddrake);
}

export function bandinginidbad(idbad) {
  badcart.forEach((badcartid) => {
    if (badcartid.id === idbad) {
      simpanidsama = badcartid;
    }
  });
  simpankefavorite(idbad);
}

function simpankefavorite(itemID) {
  if (simpanidsama) {
    // Check if the item already exists in favorite
    let isAlreadyAdded;
    favorite.forEach((checkid) => {
      if (checkid.id === itemID) {
        isAlreadyAdded = true;
      }
    });

    if (isAlreadyAdded) {
      alert(`${simpanidsama.judullagu} Already Added`);
    } else {
      // If not already added, add it to favorite
      favorite.push({
        id: simpanidsama.id,
        Nama: simpanidsama.Nama,
        song: simpanidsama.song,
        image: simpanidsama.image,
        judullagu: simpanidsama.judullagu,
        quantity: '1',
      });

      // Update local storage
      localStorage.setItem('cartlocal', JSON.stringify(favorite));
    }
  } else {
    // Handle the case where simpanidsama is not defined
    console.error(`Item with id ${idtaylor} not found in taylorcart.`);
  }
}

export function removefavoriteid(iddel) {
  const newfav = [];
  favorite.forEach((fav) => {
    if (fav.id !== iddel) {
      newfav.push(fav);
    }
  });
  favorite = newfav;
  localStorage.setItem('cartlocal', JSON.stringify(favorite));
  reloadquantity();
}
