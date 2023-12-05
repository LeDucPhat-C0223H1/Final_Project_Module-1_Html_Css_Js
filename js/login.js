// Xử lý đăng nhập 
function login(e) {
    e.preventDefault();
    let listUsers = JSON.parse(localStorage.getItem("listUsers"))||[];
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let flag = false;

    if(email == "admin" && password == "admin"){
        window.location.href="../html/manage-products.html";
        return;
    }
 
    for (let i = 0; i < listUsers.length; i++) {

        if(listUsers[i].email == email && listUsers[i].password == password){
            localStorage.setItem("checkLogin",listUsers[i].idUser);
            window.location.href="../index.html";
            return;
        }
        if(listUsers[i].email == email && listUsers[i].password !== password){
            flag = true
        }
    }
    if(flag){
        confirm("Mật khẩu không khớp");
    }else{
        confirm("Tài khoản không tồn tại");
    }
}

