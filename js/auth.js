import { auth, userref } from '/js/config.js'

import {
  onSnapshot,
  getDoc,
  addDoc,
  where,
  orderBy,
  limit,
  collection
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js'

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'

import { Countrylist } from '/js/consts.js'

/* const useremail = 'otengs16@gmail.com'
const password = 'test123456'
const occupation = 'Sotware Engineer'
const gender = 'Male'
const nationality = 'Ghanaian'
let uid = ''
let vercode = ''*/
let certificate = false 

$(document).ready(() => {
  document.getElementById('count').innerHTML = Countrylist()
  const info = document.querySelector('.form-info')

  $('.home').click((e)=>{
    e.preventDefault()
    location.replace('/summary.html')
  })

  $('#submitbtn').click(e => {
    e.preventDefault()
    if (document.getElementById('check').checked) {
      certificate = true
    }
    var olddate = parseInt(info.dob.value.toString().split('-')[0])
    var newdate = parseInt(new Date().getFullYear())
    let q = {
      fname: info.fname.value,
      lname: info.lname.value,
      email: info.email.value,//TODO change this line of code
      address: info.address.value,
      phone: info.phone.value,
      contry: info.country.value,
      dob: info.dob.value,
      age: newdate - olddate,
      gender: info.gen.value,
      occupation: info.occupation.value,
      certificate: certificate,
      password: 'GFCD-' + GeneratePasswrd(7),
      datetime: Date.parse(Date()).toString(),
      uid: "",
      admin: false     
    }
    console.log(q)
    if (info.fname.value === '') {
      $('.err-report').text('All form fields are required.')
      ErrorCheck('body > section.main > div > form > div.name-container > input[type=text]:nth-child(1)')

      return
    }
    if (info.lname.value === '') {
      $('.err-report').text('All form fields are required.')
      ErrorCheck('body > section.main > div > form > div.name-container > input[type=text]:nth-child(3)')
      return
    }
    if (info.email.value === '') {
      $('.err-report').text('All form fields are required.')
      ErrorCheck('body > section.main > div > form > div.email-container > input[type=email]:nth-child(1)')
      return
    }
    if (info.address.value === '') {
      $('.err-report').text('All form fields are required.')
       ErrorCheck('body > section.main > div > form > div.email-container > input[type=text]:nth-child(2)')
      return
    }
    if (info.phone.value === '') {
      $('.err-report').text('All form fields are required.')
      ErrorCheck('body > section.main > div > form > div.contact-container > input[type=tel]')
      return
    }
    if (info.country.value === '') {
      $('.err-report').text('All form fields are required.')
      ErrorCheck('#count')
      return
    }
    if (info.dob.value === '') {
      $('.err-report').text('All form fields are required.')
      ErrorCheck('#date')
      return
    }
    if (info.gen.value === '') {
      $('.err-report').text('All form fields are required.')
      ErrorCheck('#gen')
      return
    }
    if (info.occupation.value === '') {
      $('.err-report').text('All form fields are required.')
      ErrorCheck('body > section.main > div > form > div.occupation-container > input[type=text]')
      return
    }
    $('.err-report').text('')
    SignupUser (q)
    
  })

  /* document.querySelector('.login').addEventListener('click', e => {
  e.preventDefault()
  LoginUser()
})
document.querySelector('.logout').addEventListener('click', e => {
  e.preventDefault()
  Logout()
})
document.querySelector('.signup').addEventListener('click', e => {
  e.preventDefault()
  SignupUser()
}) */

function CreateUser (credentials) {
  addDoc(userref, credentials)
    .then(res => {
      console.log('Done signing up')
    })
    .catch(err => {
      console.log('Error:', err.message)
    })
}

function SignupUser (q) {
  createUserWithEmailAndPassword(auth, q.email, q.password)
    .then(response => {
      const s = { uid: response.user.uid }
      const f = Object.assign(q, s)
      console.log(f)
      CreateUser(f)
      info.reset()
      location.replace('/summary.html')
    })
    .catch(err => {
      console.log(err.message.replace('Firebase:',''))
      $('.err-report').text(err.message.replace('Firebase:',''))
    })
}

function LoginUser () {
  signInWithEmailAndPassword(auth, q.email)
    .then(response => {
      console.log('Signed you in successfully')
      location.replace('/summary.html')
    })
    .catch(err => {
      console.log('Error:', err.message)
      $('.err-report').text(err.message)
    })
}
Logout()

function Logout () {
  signOut(auth)
    .then(val => {
      console.log('You are logged out from this account')
    })
    .catch(err => {
      console.log('Error:', err.message)
    })
}
function GeneratePasswrd (len) {
  var p = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return [...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], '')
}


function  ErrorCheck(dom){
  $(dom).css('border', '.1em solid #fe1313')
  setTimeout(()=>{
    if($(dom).focus()){
      $(dom).css('border', '.1em solid #06060c')
      $('.err-report').text('')
    }
  },3000)
}
})