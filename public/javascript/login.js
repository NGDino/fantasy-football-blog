async function signupFormHandler(event) {
  event.preventDefault();
  //grab from form
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // check the response status
    if (response.ok) {
      console.log('success');
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}
  
async function loginFormHandler(event) {
  console.log('buttonworks')
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}
  
  var loginform = document.querySelector('.login-form')
  if (loginform) loginform.addEventListener('submit', loginFormHandler);
  
  var signupform = document.querySelector('.signup-form')
  if (signupform) signupform.addEventListener('submit', signupFormHandler);