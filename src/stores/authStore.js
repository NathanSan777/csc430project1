import { defineStore } from "pinia";
import { auth } from "../Firebase/init.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { query, where, doc, addDoc, collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import db from '../Firebase/init.js'

export const useAuthStore = defineStore("authStore", {
    id: 'auth',
    state: () => ({
       isLoggedIn: false,
       user: null,
       userData: null,
       phoneNumber: ""
    }),

actions: {
    async register(email, password){
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            await addDoc(collection(db, 'users'), {
                email: email,
                password: password,
                uid: user.uid
            })
            const userData = await this.fetchUserData(user.uid)
            if (userData) {
                // Update the userData state with the retrieved user data
                this.userData = userData;
                console.log("User data fetched:", userData);
              } else {
                console.error("User data not found for user ID:", user.uid);
            }
            this.isLoggedIn = true
            this.user = user
            console.log("User registered: ", user)
        }
        catch(error){
            console.error("Error registering user:  ", error)
            throw error
        } 
    },
    async fetchUserData(userId){
        try{
            const q = query(collection(db, "users"), where("uid", "==", userId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty){
                const userDocSnapshot = querySnapshot.docs[0];
                return userDocSnapshot.data();
            } else {
                console.error("User data not found for user ID: ", userId);
                return null;
            }
            
        } catch(error) {
            console.error("Error fetching user data: ", error);
            throw error;
        }
    },
    async fetchUserDocRef(userId){
        try {
            const q = query(collection(db, "users"), where("uid", "==", userId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDocSnapshot = querySnapshot.docs[0];
                return userDocSnapshot.ref; // Return the document reference instead of the data
            } else {
                console.error("User data not found for user ID: ", userId);
                return null;
            }
        } catch (error) {
            console.error("Error fetching user data: ", error);
            throw error;
        }

    },
    async addPhoneNumberToFirestore(phoneNumberData){
        try {
            const user = auth.currentUser;
            console.log("User obtained");
            if (user){
                const userDocRef = await this.fetchUserDocRef(user.uid);
                if (userDocRef){
                    const phoneNumberCollectionRef = collection(userDocRef, 'phoneNumber');
                    const phoneNumberObject = {
                        phoneNumber: phoneNumberData
                    };
                    await addDoc(phoneNumberCollectionRef, phoneNumberObject);
                    console.log("Check-in data added to Firestore: ", phoneNumberObject);
                }
                else{
                    console.error("User document not found for user ID: " + user.uid);
                }
            } else {
                console.error("No user is currently logged in.");
            }
        } catch(error) {
            console.error("Error adding check-in data: ", error);
            throw error;
    }
  },



}, 
    
})

