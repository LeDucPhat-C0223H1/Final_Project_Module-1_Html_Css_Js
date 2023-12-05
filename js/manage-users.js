let listUsers = JSON.parse(localStorage.getItem("listUsers"))||[];

/* ----------------------------------------------------------------------------------------------------- */

/* Login Logout */

// function logout
function logOut(){
    let confirmLogOut = confirm("Bạn có muốn thoát hay không?");
    if (confirmLogOut){
        localStorage.removeItem("checkLogin");
        window.location.href="../index.html";
    }
}

/* ------------------------------------------------------------------------------------------------ */

// Render tất cả sản phẩm
function renderListUsers() {    
    let element="";
        for (let i = 0; i < listUsers.length; i++) {
            element+=
            `
                <tr>
                    <td>${i+1}</td>
                    <td>${listUsers[i].idUser}</td>
                    <td><img src="../assets/images/header__user.png" style="width:30px; height:30px;"></td>

                    <td style="text-align: start;">${listUsers[i].email}</td>
                    <td>
                        <button onclick="deleteProduct(${i+1},${listUsers[i].idUser})">Xóa</button>
                    </td>
                </tr>
            `
        }
            document.getElementById("tbody").innerHTML = element;
}
renderListUsers();


           
/* ---------------------------------------------------------------------------------------- */



// function delete product
function deleteProduct(stt,idUser) {
    let checkDelete = confirm("Nhấn Ok để xóa người dùng có STT: " + stt)
    if(checkDelete){
        for (let i = 0; i < listUsers.length; i++) {
            if (listUsers[i].idUser == idUser) {
                listUsers.splice(i, 1);
                localStorage.setItem("listUsers",JSON.stringify(listUsers));
                renderListUsers();
            }
        }
    }
}