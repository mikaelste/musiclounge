
const secArtist = document.querySelector("#secArtist");

const db = firebase.firestore();
const artist = db.collection("artist");

const allArtist = async () => {
    const answer = await artist.get();
    for (const artist of answer.docs) {
        createHTML(artist.id, artist.data());
    }
}

allArtist();

const createHTML = (id, artist) => {
    let sjanger = "";
    for (const genre of artist.genre) {
        sjanger += `<span class="${genre}"> ${genre} </span>`
    }
    secArtist.innerHTML += `
                  <section class="flip-card">
                    <div class="flip-card-inner">
                      <div class="artist-front">
                        <img src=../bilder/${artist.image} alt="Bilde av ${artist.name}">
                        <h3>${artist.name}</h3>
                      </div>
                      <div class="artist-back">
                        <hr>
                        <h3 id="bold">${artist.name}</h3>
                        <hr>
                            <p>Born: ${artist.born}</p>
                            <p>Nationality: ${artist.nationality}</p>
                            <p>Genre: ${sjanger}</p>
                        <hr>
                            <a href="artist.html?id=${id}">Les mer her om ${artist.name}</a>
                        <hr>
                      </div>
                    </div>
                  </section>
              `;
}

//BUTTONS BABY!
const selAlfa = document.querySelector("#selAlfa")

selAlfa.onclick = async () => {
    let answer;

    if (selAlfa.value == "alfabetisk") {
        answer = await artist.orderBy("name").get();
    }
    else {
        answer = await artist.get();
    }
    secArtist.innerHTML = ``;
    for (const artist of answer.docs) {
        createHTML(artist.id, artist.data());
    }
}

const selUSA = document.querySelector("#selUSA")

selUSA.onclick = async () => {
    let answer;

    if (selUSA.value == "USA") {
        answer = await artist.where("nationality", "==", "USA").get();
    }
    else {
        answer = await artist.get();
    }
    secArtist.innerHTML = ``;
    for (const artist of answer.docs) {
        createHTML(artist.id, artist.data());
    }
}
const selRap = document.querySelector("#selRap")

selRap.onclick = async () => {
    let answer;

    if (selRap.value == "Rap") {
        answer = await artist.where("genre", "array-contains", "Rap").get();
    }
    else {
        answer = await artist.get();
    }
    secArtist.innerHTML = ``;
    for (const artist of answer.docs) {
        createHTML(artist.id, artist.data());
    }
}
const selReggae = document.querySelector("#selReggae")

selReggae.onclick = async () => {
    let answer;

    if (selReggae.value == "Reggae") {
        answer = await artist.where("genre", "array-contains", "Reggae").get();
    }
    else {
        answer = await artist.get();
    }
    secArtist.innerHTML = ``;
    for (const artist of answer.docs) {
        createHTML(artist.id, artist.data());
    }
}

const selOGs = document.querySelector("#selOGs")

selOGs.onclick = async () => {
    let answer;

    if (selOGs.value == "OGs") {
        answer = await artist.orderBy("born", "asc").get();
    }
    else {
        answer = await artist.get();
    }
    secArtist.innerHTML = ``;
    for (const artist of answer.docs) {
        createHTML(artist.id, artist.data());
    }
}
const selYG = document.querySelector("#selYG")

selYG.onclick = async () => {
    let answer;

    if (selYG.value == "YG") {
        answer = await artist.orderBy("born", "desc").get();
    }
    else {
        answer = await artist.get();
    }
    secArtist.innerHTML = ``;
    for (const artist of answer.docs) {
        createHTML(artist.id, artist.data());
    }
}
const selReset = document.querySelector("#selReset")

selReset.onclick = async () => {
    let answer;

    if (selReset.value === "reset") {
        answer = await artist.get();
    }
    else {
        answer = await artist.where("type", "==", selReset.value).get();

    }
    secArtist.innerHTML = ``;
    for (const artist of answer.docs) {
        createHTML(artist.id, artist.data());
    }
}


