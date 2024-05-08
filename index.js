let getSelectedValue;
document.querySelectorAll('input[name="gender"]').forEach((ele) => {
  ele.addEventListener('click', () => {
    getSelectedValue = ele.value;
  });
});
let signup = document.getElementById('signupbtn');
signup.addEventListener('click', (e) => {
  e.preventDefault();
  let pass1 = document.getElementById('signuppassword1').value;
  let cpass = document.getElementById('signuppassword2').value;
  if (pass1 === cpass) {
    let user = {
      usermail: document.getElementById('signupemail').value,
      password: cpass,
      gender: getSelectedValue,
    };
    let userarr = JSON.parse(localStorage.getItem('users')) || [];
    userarr.push(user);
    localStorage.setItem('users', JSON.stringify(userarr));
    alert('Sign Up Sucessfull... Please Login!');
  } else {
    alert('create password and confirm password is not matching');
  }
});

let signin = document.getElementById('signin');

signin.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('clicked');
  let signinmail = document.getElementById('signinmail').value;
  let password = document.getElementById('signinpass').value;
  let userdata = JSON.parse(localStorage.getItem('users'));
  let found = false;
  userdata.forEach((item) => {
    if (signinmail == item.usermail) {
      if (password === item.password) {
        found = true;
        alert('Login Sucessful...');
      } else {
        alert('Enter the correct Id Password!!!');
      }
    }
  });
  if (!found) {
    alert('user not found please create new account!');
  }
});
