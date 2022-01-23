import { auth, userref } from '/js/config.js'
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import {
  onSnapshot,
  where,
  query
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js'

var islogin = false
var username, userid, useremail, userpassword
var users = []
var index, data

onSnapshot(userref, snapshot => {
  snapshot.docs.forEach(doc => {
    users.push({ ...doc.data() })
  })
  function myFunction () {
    document.getElementById('myDropdown').classList.toggle('show')
  }
  var table = $('#users').DataTable({
    data: users,
    columns: [
      { data: 'fname' },
      { data: 'lname' },
      { data: 'email' },
      { data: 'password' },
      { data: 'age' },
      { data: 'gender' },
      { data: 'address' },
      { data: 'phone' },
      { data: 'certificate' },
      { data: 'occupation' },
      { data: 'occupation' }
    ]
  })

  $('#users tbody').on('click', 'tr', function () {
    index = table.row(this).index()
    data = table.data()
  })
})

// Close the dropdown menu if the user clicks outside of it
