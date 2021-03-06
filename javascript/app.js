function focusedText() {
    $("#teste, #ic_error_outline").slideUp(500);
}
function snackbarShow(message, actionText) {
    var notification = document.querySelector('.mdl-js-snackbar');
    var data = {
        message: message,
        actionHandler: function (event) { },
        actionText: actionText,
        timeout: 5000
    };
    notification.MaterialSnackbar.showSnackbar(data);
}

function snackbarShowVerification(message, actionText) {
    var notification = document.querySelector('.mdl-js-snackbar');
    var data = {
        message: message,
        actionHandler: function (event) {
            firebase.auth().currentUser.sendEmailVerification()
                .catch(function (error) {
                    console.log(error);
                });
        },
        actionText: actionText,
        timeout: 5000
    };
    notification.MaterialSnackbar.showSnackbar(data);
}

function showAlert(element, message) {
    $("#teste, ic_error_outline").hide();
    var position = document.getElementById(element).getBoundingClientRect();
    $("#teste").css("top", position.top + 6);
    $("#ic_error_outline").css("top", position.top - 12);
    $("#teste_p").text(message);
    $("#teste").slideDown(500);
    $("#ic_error_outline").show();
}

function writeUserData(userId, name, email, photoURL) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: photoURL
    });
}

function toggleLogout() {
    firebase.auth().signOut();
}

function handleSignUp() {
    $("#label_signin").text("Sign Up");

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (name.length < 4) {
        var message = 'Por favor insira um nome com no mínimo 4 caracteres.';
        var actionText = 'OK';
        showAlert('name', message);
        return;
    }
    else if (email.length < 4) {
        var message = 'Por favor insira um endereço de email.';
        var actionText = 'OK';
        showAlert('email', message);
        return;
    }
    else if (password.length < 6) {
        var message = 'A senha deve ter no mínimo 6 caracteres.';
        var actionText = 'OK';
        showAlert('password', message);
        return;
    }
    $(".mdl-spinner").show();
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        firebase.auth().currentUser.sendEmailVerification().then(function () {
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: name,
            }).then(function () {
                $(".mdl-spinner").hide();
                var uid = user.uid;
                var email = user.email;
                var displayName = user.displayName;
                var photoURL = user.photoURL === null ? 'imagens/image_profile.png' : user.photoURL;

                writeUserData(uid, displayName, email, photoURL);

            }, function (error) {
                $(".mdl-spinner").hide();
            });
        });
    }).catch(function (error) {
        $(".mdl-spinner").hide();
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/email-already-in-use') {
            var message = 'O endereço de email já¡ foi usado em outra conta.';
            var actionText = 'OK';
            showAlert('email', message);
        }
        else if (errorCode === 'auth/weak-password') {
            var message = 'A senha deve ter no mínimo 6 caracteres.';
            var actionText = 'OK';
            showAlert('password', message);
        }
        else {
            console.log(error);
        }

    });
}

function sendPasswordReset() {
    var email = document.getElementById('email').value;
    if (email.length < 4) {
        var message = 'Por favor insira um endereço de email.';
        var actionText = 'OK';
        showAlert('email', message);
        return;
    }
    $(".mdl-spinner").show();
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        $(".mdl-spinner").hide();
        var message = 'Email de redefinição de senha enviado para ' + email;
        var actionText = 'OK';
    }).catch(function (error) {
        $(".mdl-spinner").hide();
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
            var message = 'Digite um email válido.';
            var actionText = 'OK';
            showAlert('email', message);
        } else if (errorCode == 'auth/user-not-found') {
            var message = 'Não há¡ registro de usuário correspondente a esse email.';
            var actionText = 'OK';
            showAlert('email', message);
        } else {
            console.log(errorMessage);
        }
    });
}

function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            mainPageOpen();
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            var photoURL = user.photoURL == null ? 'imagens/image_profile.png' : user.photoURL;
            $(".image_profile").attr("src", photoURL);
            $("#user_name").text(displayName);
            $("#login").hide(500);
            $("header").css("visibility", "visible");
            var message = 'Bem vindo ' + displayName + '!';
            var actionText = ':)';
            snackbarShow(message, actionText);
        }
        else {
            $("#login").show(500);
            $("header").css("visibility", "hidden");
        }
    });
    document.getElementById('name').addEventListener('focus', focusedText, false);
    document.getElementById('email').addEventListener('focus', focusedText, false);
    document.getElementById('password').addEventListener('focus', focusedText, false);
    document.getElementById('quickstart-logout').addEventListener('click', toggleLogout, false);
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('quickstart-sign-in-google').addEventListener('click', toggleSignInGoogle, false);
    document.getElementById('quickstart-sign-in-facebook').addEventListener('click', toggleSignInFacebook, false);
    document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}
function toggleSignIn() {
    $("#label_signin").text("Sign In");

    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            var message = 'Por favor insira um endereço de email.';
            var actionText = 'OK';
            showAlert('email', message);
            return;

        }
        else if (password.length < 4) {
            var message = 'Por favor insira uma senha.';
            var actionText = 'OK';
            showAlert('password', message);
            return;
        }
        $(".mdl-spinner").show();
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            $(".mdl-spinner").hide();
        }).catch(function (error) {
            $(".mdl-spinner").hide();
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                var message = 'Senha incorreta.';
                var actionText = 'OK';
                showAlert('password', message);
            }
            else if (errorCode === 'auth/user-not-found') {
                var message = 'Não há registro de usuário correspondente a esse email.';
                var actionText = 'OK';
                showAlert('email', message);
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    }
}

function toggleSignInGoogle() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then(function (event) {
            $(".mdl-spinner").hide();
            var user = firebase.auth().currentUser;
            var uid = user.uid;
            var email = user.email;
            var displayName = user.displayName;
            var photoURL = user.photoURL == null ? 'imagens/image_profile.png' : user.photoURL;

            writeUserData(uid, displayName, email, photoURL);

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
            } else {
                console.log(errorMessage);
            }
        });
    } else {
        firebase.auth().signOut();
    }
}

function toggleSignInFacebook() {
    $(".mdl-spinner").show();
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            $(".mdl-spinner").hide();
            var token = result.credential.accessToken;
            var user = result.user;
            var uid = user.uid;
            var email = user.email;
            var displayName = user.displayName;
            var photoURL = user.photoURL === null ? 'imagens/image_profile.png' : user.photoURL;

            writeUserData(uid, displayName, email, photoURL);

            }, function (error) {
                $(".mdl-spinner").hide();
        }).catch(function (error) {
            $(".mdl-spinner").hide();
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.error(error);
        });
    } else {
        $(".mdl-spinner").hide();
        firebase.auth().signOut();
    }
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '1838666846419399',
        xfbml: true,
        version: 'v2.8'
    });
};

function mainPageOpen() {
    FB.AppEvents.logEvent("mainPageOpen");
}

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.onload = function () {
    $("#teste, #ic_error_outline, .mdl-spinner").hide();
    initApp();
};