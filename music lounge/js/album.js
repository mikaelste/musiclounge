const secAlbum = document.querySelector("#secAlbum");
const addCart = document.querySelector("#addCart");
const input = document.querySelector("#input");
const price = document.querySelector("#price");

const db = firebase.firestore();
const album = db.collection("album");
const cart = db.collection("cart");

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

const displayAlbum = async (id) => {

    const Album = await album.doc(id).get();
    createHTML(id, Album.data());

    const albumPrice = await album.doc(id).get();
    createPriceHTML(id, albumPrice.data());

}

displayAlbum(id);


const createHTML = (id, album) => {
    secAlbum.innerHTML += `
              <h2> ${album.name} </h2>
              <img src=../bilder/${album.image} alt="Bilde av ${album.name}">
              `;
}

const createPriceHTML = (id, album) => {
    price.innerHTML += `
              <h1> $${album.price} </h1>
              `;
}

addCart.onclick = async () => {
    try {
        await cart.doc(input.value).set({
            productId: id,
            tid: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("Bestilling lagt til i din handlekurv!")
    }
    catch (err) {
        alert(err)
    }
}

