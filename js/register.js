// Thư viện hàm
// Kiểm tra định dạng email
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// Hàm Tạo id cho user
function createIdUser() {
    return Math.floor(Math.random() * 9999999999999 + new Date().getMilliseconds())
}

/* ----------------------------------------------------------------------------------------------------- */



let listUsers = JSON.parse(localStorage.getItem("listUsers"))||[];

// function add user
function register(e) {
    // lấy giá trị người dùng nhập vào.
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if(!isEmail(email)){
        confirm("Email không đúng định dạng");
        return;
    }

    if(password.length < 6){
        confirm("Mật khẩu phải dài hơn 6 ký tự");
        return;
    }
    if(password!=confirmPassword){
        confirm("Nhập lại mật khẩu không khớp");
        return;
    }

    let userInfor={
        email:email,
        password:password,
        cart:[],
        idUser: createIdUser(),
        totalQuantityProduct: 0,
    }

    let checkRegister = listUsers.find((item)=>{
        return item.email == email;
    })
    
    if(checkRegister){
        confirm("Không thể tạo tài khoản, email đã được đăng ký!");
        return;
    }
    confirm("Chúc mừng bạn đăng ký tài khoản thành công!");

    listUsers.push(userInfor);
    localStorage.setItem("listUsers",JSON.stringify(listUsers));
    
    // chuyển sang trang đăng nhậP
    window.location.href="../html/login.html";
}
