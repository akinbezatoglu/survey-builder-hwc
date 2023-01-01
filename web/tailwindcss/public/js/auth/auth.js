function Registration() {
    var name = document.getElementById("name").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmpassword").value;
    var err = document.getElementById("serverMessageBox")
    if (name == "" || lastname == "" || email == "" || password == "" || confirmPassword == "") {
        alert("Tüm bilgileri eksiksiz doldurunuz.")
        return false;
    } 
    if (password != confirmPassword) {
        alert("Parola onaylanmadı.")
        return false;
    }
    if (!ValidateEmail(email)) {
        alert("Girmiş olduğunuz email doğru formatta değil.")
        return false;
    }
    if (!ValidatePassword(password)) {
        alert("Girmiş olduğunuz parola doğru formatta değil.")
        return false;
    }
    data = {
        "name": name,
        "lastname": lastname,
        "email": email,
        "password": password
    }
    console.log(data);
    const response = fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/auth/signup?data='+Buffer.from(JSON.stringify(data)).toString("base64"), {
        method: 'POST'
        //body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data["_id"] != "") {
            localStorage.setItem('token', data["token"]);
            window.location.replace("http://surveybuilder.cloud");
        } else {
            alert("Bu emaile ait kullanıcı bulunmaktadır.")
            return false;
        }
    })
    .catch(error => {
        alert("Beklenmedik bir hata oluştu.")
        return false;
    });
    return false;
}

function Login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var err = document.getElementById("serverMessageBox")
    if (email == "" || password == "") {
        alert("Tüm bilgileri eksiksiz doldurunuz.")
        return false;
    } 
    if (!ValidateEmail(email)) {
        alert("Girmiş olduğunuz email doğru formatta değil.")
        return false;
    }
    if (!ValidatePassword(password)) {
        alert("Girmiş olduğunuz parola doğru formatta değil.")
        return false;
    }
    data = {
        "email": email,
        "password": password
    }
    const response = fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/auth/login?data='+Buffer.from(JSON.stringify(data)).toString("base64"), {
        method: 'POST'
        //body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data != null) {
            localStorage.setItem('token', data["token"]);
            window.location.replace("http://surveybuilder.cloud");
        } else {
            alert("Kullanıcı bilgilerinizi hatalı girdiniz.")
            return false;
        }
    })
    .catch(error => {
        alert("Beklenmedik bir hata oluştu.")
        return false;
    });
    return false;
}

function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

function ValidatePassword(input) {
    var passRegex = new RegExp ("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if (input.match(passRegex)) {
        return true;
    } else {
        return false;
    }
}

//  window.onload = async function() {
//      const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/auth', {
//          method: 'GET',
//          headers: {
//              'Authorization': 'Bearer ' + token//localStorage.getItem('token')
//          }
//      })
//      .then(response => response.json())
//      .then(data => {
//          if (data["_id"] != "") {
//              window.location.replace("http://surveybuilder.cloud");
//          }
//      })
//      .catch(error => {
//          console.log(error);
//      });
//}