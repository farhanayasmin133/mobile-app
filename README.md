# Online PPE store

## Project Description testing

Currently a coronavirus has been identified in China (Wuhan City), and was initially known as 2019 Novel Coronavirus (2019-nCoV). The case was reported on December 31st, 2019, and confirmation of the coronavirus identification occurred on January 7th, 2020. Formally, the disease is now known as coronavirus disease or COVID-19. The virus causing the disease is known as "severe acute respiratory syndrome coronavirus 2" (SARS-CoV-2).

Personal protective equipment(PPE) consists of gowns, gloves, masks, facial protection (i.e., masks and eye protection, face shields or masks with visor attachment) or respirators that can be used to provide a barrier to help prevent potential exposure to this infectious disease. This project aims to develop a online store that supplies Personal protective equipment(PPE). In order to purchase from this store user needs to have an account

The index.html contains 2 login-screen classes to match the 2 buttons.

```

<div class="login-screen signupYes">
    <div class="view">
        <div class="page">
            <div class="page-content login-screen-content">


```

button:

```

<a href="#" class="button login-screen-open" data-login-screen=".signupYes">Sign Up</a>

```

and

```

<div class="login-screen loginYes">
    <div class="view">
        <div class="page">
            <div class="page-content login-screen-content">


```

to go with the button:

```

<a href="#" class="button button-active login-screen-open" data-login-screen=".loginYes">Sign In</a>


```

Using Dom7 we capture the click event on the sign in button:

```

$$("#signUpButton").on("click", () => {
    var formData = app.form.convertToData('#signUpForm');
    //alert("clicked Sign Up: " + JSON.stringify(formData));
    firebase.auth().createUserWithEmailAndPassword(formData.username, formData.password).then(
        () => {
            // could save extra info in a profile here I think.
            app.loginScreen.close(".signupYes", true);
        }
    ).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $$("#signUpError").html(errorCode + " error " + errorMessage)
        console.log(errorCode + " error " + errorMessage);
        // ...
    });

});


```
