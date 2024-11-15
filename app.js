const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAHqrbHzl9QlyR_oaDJ2t80gdPEJ-uD4bY",
    authDomain: "lexxhome-cb3b8.firebaseapp.com",
    databaseURL: "https://lexxhome-cb3b8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lexxhome-cb3b8",
    storageBucket: "lexxhome-cb3b8.firebasestorage.app",
    messagingSenderId: "221283046838",
    appId: "1:221283046838:web:61155916f351cc29631d17"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        const docRef = doc(db, "user", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;
            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log('Error getting document');
        })
    }
    else{
        console.log("User Id not Found in Local Storage");
    }
  })

  const menuLinks=document.querySelector('.navbar__btn');

  logoutButton.addEventListener('click',()=>{
      localStorage.removeItem('loggedInUserId');
      signOut(auth)
      .then(()=>{
          window.location.href='index.html';
      })
      .catch((error)=>{
          console.error('Error Signing Out:', error)
      })
  })  

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
})

