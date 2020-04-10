$(document).ready(function() {
  // Getting references to our form and input
  let signUpForm = $("form.signup");
  let emailInput = $("input#email-input");
  let usernameInput = $("input#username-input");
  let passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()

    };

    if (!userData.email || !userData.username || !userData.password ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.username, userData.password);
    emailInput.val("");
    usernameInput.val("");
    passwordInput.val("");

  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, username, password) {
    $.post("/api/signup", {
      email: email,
      username: username,
      password: password

    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(err.responseJSON)
    $("#alert .msg").text("Information entered in invalid format.");
    $("#alert").fadeIn(500);
  };
});
