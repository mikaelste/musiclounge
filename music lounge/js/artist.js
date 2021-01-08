const secArtist = document.querySelector("#secArtist");
const secAlbum = document.querySelector("#secAlbum");

const previousArtist =document.querySelector("#prevoiusArtist")
const nextArtist =document.querySelector("#nextArtist")


const db = firebase.firestore();
const artist = db.collection("artist");
const album = db.collection("album");


const url = new URL(window.location.href);
const id = url.searchParams.get("id");

const displayArtist = async (id) => {

    const answerArtist = await artist.doc(id).get();
    createHTML(answerArtist.data());

    const answerAlbum = await album.where("artist", "==", id).get();
    for (const ettAlbum of answerAlbum.docs) {
        createAlbumHTML(ettAlbum.data(), ettAlbum.id, answerArtist.data().name);
    }
}

displayArtist(id);

const getArtist = async (id) => {
  const answer = await artist.doc(id).get();
  return answer.data().name;
}
console.log(id.slice(6))
let previousID = ("artist00" + (String(Number(id.slice(6)) - 1)).slice(-3));
if (previousID === "artist000") {
  previousID = "artist012";
}
if (previousID === "artist0010") {
  previousID = "artist010";
}
if (previousID === "artist0011") {
  previousID = "artist011";
}
if (previousID === "artist0012") {
  previousID = "artist012";
}
if (previousID === "artist000") {
  previousID = "artist012";
}
console.log(previousID)
let nextID = ("artist00" + (String(Number(id.slice(6)) + 1)).slice(-3));
if (nextID === "artist0011"){
  nextID = "artist011"
}
if (nextID === "artist0012"){
  nextID = "artist012"
}
if (nextID === "artist0013") {
  nextID = "artist001";
}




const createHTML = async (artist) => {
  secArtist.innerHTML += `   
              <section id="navigationAnchor">
                <a id="previousArtist" href="../html/artist.html?id=${previousID}">
                  <h4> <i class="arrow left"></i> Previous Artist </h4>
                </a>
                <a id="nextArtist" href="../html/artist.html?id=${nextID}">
                  <h4>Next Artist <i class="arrow right"></i></h4>
                </a>
              </section>

              <section id="artistGrid">
                <section>
                  <h1>${artist.name}</h1>
                  <img src=../bilder/${artist.image} alt="Bilde av ${artist.name}">
                </section>
                <article id="artistDescription">
                  <p>${artist.description}</p>
                </article>
              </section>
          `;
}

const createAlbumHTML = (album, albumId, name) => {
    secAlbum.innerHTML += `
            <section id="secBuyAlbum">
                <div>
                  <a href="../html/album.html?id=${albumId}"> 
                    <img src=../bilder/${album.image} alt="Bilde av ${album.name}"> 
                    <p> Price: $${album.price} </p>
                  </a>                  
                </div>
              </section>
  
      `;

}
