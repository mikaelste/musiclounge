const accountDetails = document.querySelector('.account-details')

auth.onAuthStateChanged(user => {
    if (user) {

        const createAccountDetailsHTML = async () => {
            accountDetails.innerHTML = `
                <h6>user logged in as:</h6>
                <h5>${user.email}</h5>

            `;
        }

                createAccountDetailsHTML(user);
        
        const getCart = async () => {
            const answer = await cart.get();
            const cartId = answer.id;

            for await (item of answer.docs) {
                const productId = item.data().productId;
                const albumAnswer = await album.doc(productId).get();

                createHTML(productId, item.id, albumAnswer.data());
            }
        }

        getCart();
        
        secCart.innerHTML = "";
    } else {
        console.log('user signed out; log in to see orders');
        secCart.innerHTML += `
            <h3 id="loggedOutAlert"> Sir, please log in to find your order </h3>
        `;
        accountDetails.innerHTML = 'user signed out'
    }
});


const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);

        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
});
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;

        auth.signInWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user);

            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        })
    });
    

    const logout = document.querySelector('#logout');
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            alert('user logged out')
        });
    }); 

    
    document.addEventListener('DOMContentLoaded', function() {

        var modals = document.querySelectorAll('.modal')
        M.Modal.init(modals);
    });
    
    const secCart = document.querySelector("#secCart");
    
    
    const createHTML = (id, cart, album) => {
        secCart.innerHTML += `
        <section class="orders">
        <div>
        <img src=../bilder/${album.image} alt="Bilde av ${album.name}">
        </div>
        <div>
        <h4>name: ${cart}<h4/>
        <h4>Price: ${album.price}$<h4/>
        </div>
        </section>
        `;
    };
    
    const searchName = document.querySelector("#nameBtn")
    
    searchName.onclick = async () => {
        
        const answer = await cart.doc(nameInp.value).get();
        const cartId = answer.id;
        
        secCart.innerHTML = ``;       
        const productId = answer.data().productId;
        const albumAnswer = await album.doc(productId).get();
        
        createHTML(productId, answer.id, albumAnswer.data());
    }



