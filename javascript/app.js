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
    var position = $("#" + element + "").offset();
    $("#teste").css({ "right": position.left, "top": position.top + 16});
    $("#ic_error_outline").css({ "right": position.left, "top": position.top - 12 });
    $("#teste_p").text(message);
    $("#ic_error_outline").show();
    $("#teste").slideDown(500).delay(1500).slideUp(500, function (event) {
        $("#ic_error_outline").hide();
    });

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
    $("#form_name").show(500);

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (name.length < 4) {
<<<<<<< HEAD
        var message = 'Por favor insira um nome com no mínimo 4 caracteres.';
=======
        var message = 'Por favor insira um nome com no m�nimo 4 caracteres.';
>>>>>>> origin/master
        var actionText = 'OK';
        showAlert('name', message);
        return;
    }
    else if (email.length < 4) {
<<<<<<< HEAD
        var message = 'Por favor insira um endereço de email.';
=======
        var message = 'Por favor insira um endere�o de email.';
>>>>>>> origin/master
        var actionText = 'OK';
        showAlert('email', message);
        return;
    }
    else if (password.length < 6) {
<<<<<<< HEAD
        var message = 'A senha deve ter no mínimo 6 caracteres.';
=======
        var message = 'A senha deve ter no m�nimo 6 caracteres.';
>>>>>>> origin/master
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

<<<<<<< HEAD
=======
                email = document.getElementById('email').value;
                var message = 'Conta criada. Email de verica��o enviado para ' + email;
                var actionText = 'OK';
                snackbarShowVerification(message, actionText);
>>>>>>> origin/master
            }, function (error) {
                $(".mdl-spinner").hide();
            });
        });
    }).catch(function (error) {
        $(".mdl-spinner").hide();
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/email-already-in-use') {
<<<<<<< HEAD
            var message = 'O endereço de email já¡ foi usado em outra conta.';
=======
            var message = 'O endere�o de email j� foi usado em outra conta.';
>>>>>>> origin/master
            var actionText = 'OK';
            showAlert('email', message);
        }
        else if (errorCode === 'auth/weak-password') {
<<<<<<< HEAD
            var message = 'A senha deve ter no mínimo 6 caracteres.';
=======
            var message = 'A senha deve ter no m�nimo 6 caracteres.';
>>>>>>> origin/master
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
<<<<<<< HEAD
        var message = 'Por favor insira um endereço de email.';
=======
        var message = 'Por favor insira um endere�o de email.';
>>>>>>> origin/master
        var actionText = 'OK';
        showAlert('email', message);
        return;
    }
    $(".mdl-spinner").show();
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        $(".mdl-spinner").hide();
<<<<<<< HEAD
        var message = 'Email de redefinição de senha enviado para ' + email;
=======
        var message = 'Email de redefini��o de senha enviado para ' + email;
>>>>>>> origin/master
        var actionText = 'OK';
    }).catch(function (error) {
        $(".mdl-spinner").hide();
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
<<<<<<< HEAD
            var message = 'Digite um email válido.';
            var actionText = 'OK';
            showAlert('email', message);
        } else if (errorCode == 'auth/user-not-found') {
            var message = 'Não há¡ registro de usuário correspondente a esse email.';
=======
            var message = 'Digite um email v�lido.';
            var actionText = 'OK';
            showAlert('email', message);
        } else if (errorCode == 'auth/user-not-found') {
            var message = 'N�o h� registro de usu�rio correspondente a esse email.';
>>>>>>> origin/master
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
<<<<<<< HEAD
            $(".image_profile").attr("src", photoURL);
            $("#user_name").text(displayName);
            $("#login").hide(500);
            $("header").css("visibility", "visible");
            var message = 'Bem vindo ' + displayName + '!';
            var actionText = ':)';
            snackbarShow(message, actionText);
=======

            if (emailVerified) {
                $(".image_profile").attr("src", photoURL);
                $("#user_name").text(displayName);
                $("#login").hide(500);
                $("header").css("visibility", "visible");
                var message = 'Bem vindo ' + displayName + '!';
                var actionText = ':)';
                snackbarShow(message, actionText);
            }
            else {
                var message = 'Conta n�o verificada. Reenviar verifica��o para ' + email + '?';
                var actionText = 'enviar';
                snackbarShowVerification(message, actionText);
            }
>>>>>>> origin/master
        }
        else {
            $("#login").show(500);
            $("header").css("visibility", "hidden");
        }
    });
    document.getElementById('quickstart-logout').addEventListener('click', toggleLogout, false);
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('quickstart-sign-in-google').addEventListener('click', toggleSignInGoogle, false);
    document.getElementById('quickstart-sign-in-facebook').addEventListener('click', toggleSignInFacebook, false);
    document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}
function toggleSignIn() {
    $("#label_signin").text("Sign In");
    $("#form_name").hide(500);


    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
<<<<<<< HEAD
            var message = 'Por favor insira um endereço de email.';
=======
            var message = 'Por favor insira um endere�o de email.';
>>>>>>> origin/master
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
<<<<<<< HEAD
                var message = 'Não há registro de usuário correspondente a esse email.';
=======
                var message = 'N�o h� registro de usu�rio correspondente a esse email.';
>>>>>>> origin/master
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
<<<<<<< HEAD
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
=======
            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                user.updateProfile({
                    emailVerified: true
                }).then(function () {
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
                console.log(errorMessage);
                }
            });
>>>>>>> origin/master
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
  // Adicionar isto ao gerenciador de onclick do botão
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
    $("#teste, #form_name, #ic_error_outline, .mdl-spinner").hide();
    initApp();
};