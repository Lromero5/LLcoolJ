$(document).ready(function() {
  let signUpForm = $("form.signup");
  let emailInput = $("input#email-input");
  let usernameInput = $("input#username-input");
  let passwordInput = $("input#password-input");

  signUpForm.on("submit", function(event) {
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()

    };

    if (!userData.email || !userData.username || !userData.password ) {
      return;
    };
    signUpUser(userData.email, userData.username, userData.password);
    emailInput.val("");
    usernameInput.val("");
    passwordInput.val("");

  });

  function signUpUser(email, username, password) {
    $.post("/api/signup", {
      email: email,
      username: username,
      password: password

    })
      .then(function(data) {
        window.location.replace("/members");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(err.responseJSON)
    $("#alert .msg").text("Information entered in invalid format.");
    $("#alert").fadeIn(500);
  };
});
