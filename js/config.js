// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  onAuthStateChanged

} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import {
  getFirestore,
 
  collection
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyDWl2iTuOxUnXZp4dvzJibqTNVFLnpRC5o',
  authDomain: 'lemas-notifier.firebaseapp.com',
  projectId: 'lemas-notifier',
  storageBucket: 'lemas-notifier.appspot.com',
  messagingSenderId: '1047395791507',
  appId: '1:1047395791507:web:988ee8fc4fa9a5b75e5366'
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()

export const userref = collection(db, 'users')