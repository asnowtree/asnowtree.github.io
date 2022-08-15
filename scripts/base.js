/*(function () {

})();*/

var userLogin = 0;

function register() {
    var username = document.getElementById("username").value;
    var passoword = document.getElementById("password").value;
    $.ajax(
        {
            type: "POST",
            url: "http://localhost/user/register",
            dataType: "json",
            data: JSON.stringify({ "username": username, "password": passoword, "registerType": "0" }),
            contentType: "application/json",
            success: function (result) {
                if (result && result.success) {
                    getUserInfo();
                }else{
                    window.alert(result.msg);
                }


            }
        });
}
function siginTop() {
    if (userLogin == 0) {
        var loginTable = document.getElementById("loginTable")
        var disinfo = loginTable.style.display;
        if (disinfo == "inherit") {
            loginTable.style.display = "none";
        } else {
            loginTable.style.zIndex = 10000001;
            loginTable.style.display = "inherit";
        }
        // login();
    } else {

        logout();
    }
};

function logout() {
    $.ajax(
        {
            type: "POST",
            url: "http://localhost/user/logout",
            success: function (result) {
                userLogin = 0;
                document.getElementById("siginButton").innerHTML = "登录";
                document.getElementById("loginUserInfo").innerHTML = "";
                var avatarImage = document.getElementById("avatarImage");
                avatarImage.style.display = "none";
            }
        });
}


function login() {
    var username = document.getElementById("username").value;
    var passoword = document.getElementById("password").value;
    $.ajax(
        {
            type: "POST",
            url: "http://localhost/user/login",
            // dataType: "json",
            data: { "username": username, "password": passoword },
            success: function (result) {
                var loginTable = document.getElementById("loginTable")
                loginTable.style.zIndex = -1;
                loginTable.style.display = 'none';
                if (result && result.success) {
                    getUserInfo();
                }else{
                    window.alert(result.msg);
                }
            }
        });
};



function getUserInfo() {
    $.ajax(
        {
            type: "GET",
            url: "http://localhost/user/user/userinfo",
            success: function (result) {
                if (result && result.status == 200) {
                    userLogin = 1;
                    if (result.data.avatar) {
                        var avatarImage = document.getElementById("avatarImage");
                        avatarImage.src = result.data.avatar;
                        avatarImage.style.display = "inline";
                    }
                    document.getElementById("loginUserInfo").innerHTML = result.data.username || result.data.name;
                    document.getElementById("loginTable").style.display = "none";
                    var asiginButton = document.getElementById("siginButton");
                    asiginButton.innerHTML = "登出";
                } else {
                    userLogin = 0;
                }
                console.log(result);

            }
        });
}

getUserInfo();