/* Dữ liệu ban đầu */
// Lấy dữ liệu đã lưu trên localStorage.
let listAll = JSON.parse(localStorage.getItem("listAll")) || [];
let listUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
let checkLogin = localStorage.getItem("checkLogin") || null;


// xáo trộn listAll
let mixRandomListAll = [];
for(let i=0; i<listAll.length; i++){
    let mixRandom = Math.floor(Math.random() * (listAll.length - 0));

    let flag = true;
    for(let j=0; j<mixRandomListAll.length; j++){
        if(listAll[mixRandom].id == mixRandomListAll[j].id)
        flag = false;
    }
    if(flag){
        mixRandomListAll.push(listAll[mixRandom]);
    }else{
        i--;
    }
}


// Hiển thị kiểu tiền VNĐ.
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

/* ------------------------------------------------------------------------------------------------ */



/* Login Logout */
if (checkLogin != null) {
    document.getElementsByClassName("header-top__login")[0].style.display = "none";
    document.getElementsByClassName("header-top__register")[0].style.display = "none";
    document.getElementsByClassName("header-top__user")[0].style.display = "block";
    document.getElementsByClassName("header-top__cart")[0].style.display = "block";
    document.getElementsByClassName("header-top__quantity-cart")[0].style.removeProperty("display");
    document.getElementsByClassName("main__box-left__cart")[0].style.display = "block";
}

function displayUserInfor(){
    document.getElementsByClassName("header-top__userInfor")[0].style.display = "block";
    for( let i=0; i<listUsers.length ;i++)
        if(checkLogin == listUsers[i].idUser){
            document.getElementById("header-top__userInfor__email").innerHTML = listUsers[i].email;
            break;
    }
}

function noneDisplayUserInfor(){
    document.getElementsByClassName("header-top__userInfor")[0].style.display = "none";
}

// function logout
function logOut(){
    let confirmLogOut = confirm("Bạn có muốn thoát hay không?");
    if (confirmLogOut){
        localStorage.removeItem("checkLogin");
        window.location.reload();
    }
}

/* ------------------------------------------------------------------------------------------------ */



/* In danh sách sản phẩm và phân trang ra màn hình */
// 1. Renader list sản phẩm
function renderListProducts(listProducts) {
    let element="";
    for (let i = 0; i < listProducts.length; i++) {
        if(i>=start && i<end){
            element+=
            `
                <div class="product-item">
                    <div class="product-item__top">
                        <img class="product-item__top__img" src="${listProducts[i].image}" alt="Ảnh sản phẩm">
                    </div>
                    <div>
                        <h3 class="product-item__name">${listProducts[i].name}</h3>
                        <p class="product-item__desc">${listProducts[i].desc}</p>
                    </div>
                    <div class="product-item__price">
                        <p>${VND.format(listProducts[i].price)}</p>
                        
                        <div class="btn" onclick="addToCart(${listProducts[i].id})" >
		                    <span>Đặt món <i class="fa-solid fa-cart-plus fa-xs"></i></span>
		                    <div class="dot"></div>
	                    </div>
                    </div>
                </div>
             `
        }
    }
    // <button onclick="addToCart(${listProducts[i].id})">Đặt món +</button>
    document.getElementById("list-products") .innerHTML = element;
}

// 2. Phân trang
let start;
let end;
let currentPage = 1;

// Render khu vực phân trang.
function panigation(listProducts) {
    if(listProducts.length == mixRandomListAll.length){
        perPage = 9;
    
    }else{
        perPage = 6;
    }
    let totalPage = Math.ceil(listProducts.length/perPage);
    let text="";
    text +=
        `
            <span class="material-symbols-outlined arrow-back" onclick="decreasePage(${totalPage})" style="user-select: none;">
                arrow_back_ios
            </span>
            <ul id="pages">
        `;

    for (let i=0; i < totalPage; i++){
        text+= ` <li class="page" onclick=pageNow(${i+1},${perPage})>${i+1}</li> `;
    };

    text +=
        `    
            </ul>
            <span class="material-symbols-outlined arrow-forward"  onclick="increasePage(${totalPage})" style="user-select: none;">
                arrow_forward_ios
            </span>
        `;
    document.getElementById("pagination").innerHTML = text;
}

// Hàm thực hiện tính toán chuyển trang.
function pageNow(numberOfPage,perPage){
    // tính số sản phẩm in trong 1 trang,
        start = (numberOfPage-1) * perPage;
        end = numberOfPage * perPage;

    // đánh dấu trang đang hiển thị,
        let pages = document.getElementsByClassName("page");
        for (let i=0; i < pages.length; i++){
            if ((numberOfPage-1) == i){
                pages[i].classList.add("page--now");
            }else{
                pages[i].classList.remove("page--now");
            }
        }

        let checkListNow = JSON.parse(localStorage.getItem("chooseListNow")) || null;
        if(checkListNow==null){
            renderListProducts(mixRandomListAll);
            renderSortArea();
            return;
        }
        else{
            renderListProducts(checkListNow);
            renderSortArea();
            return;
        }
}
// Nút tiến trang.
function increasePage(totalPage) {
    currentPage = currentPage + 1;
    if (currentPage > totalPage){
        currentPage = totalPage;
    }
    pageNow(currentPage,perPage);
}
// Nút lùi trang.
function decreasePage() {
    currentPage = currentPage - 1;
    if (currentPage < 1 ){
        currentPage = 1;
    }
    pageNow(currentPage,perPage);
    
}

/* -------------------------------------------------------------------------------------------------- */




/* Bảng menu, chọn list-item nào render list-item đó */
// Hàm đổi màu list-item đã chọn.
let menu = document.getElementsByClassName("menu__item");
function menu__itemNow(itemNow){
    for (let i=0; i < menu.length; i++){
        if (i == itemNow ){
            menu[i].classList.add("menu__item--now");
        }else{
            menu[i].classList.remove("menu__item--now");
        }
    }
}


// Nhấn ô tìm kiếm
function renderListSearch(){
    menu__itemNow(0)
    document.getElementById("titleListProducts").innerHTML = "Kết quả tìm kiếm";
} 


// Nhấn chọn All Drinks trên menu.
function renderListAll(){
    localStorage.removeItem("chooseListNow");
    menu__itemNow(1);
    panigation(mixRandomListAll);
    pageNow(1,perPage);
    document.getElementById("search").value = "";
    document.getElementById("titleListProducts").innerHTML = "Tất cả thức uống";
}
renderListAll()


// Nhấn chọn Juice trên menu.
function renderListJuice(){
    let listJuice = [];
    listJuice= listAll.filter((item)=> {
        return item.type == "juice";
    })
    localStorage.setItem("chooseListNow",JSON.stringify(listJuice));
    menu__itemNow(2);
    panigation(listJuice);
    pageNow(1,perPage);
    document.getElementById("search").value = "";
    document.getElementById("titleListProducts").innerHTML = "Nước ép trái cây";
}

// Nhấn chọn Veggie trên menu.
function renderListVeggie(){
    let listVeggie = [];
    listVeggie= listAll.filter((item)=> {
        return item.type == "veggie";
    })
    localStorage.setItem("chooseListNow",JSON.stringify(listVeggie));
    menu__itemNow(3);
    panigation(listVeggie);
    pageNow(1,perPage);
    document.getElementById("search").value = "";
    document.getElementById("titleListProducts").innerHTML = "Nước ép rau củ";
} 

// Nhấn chọn Shake trên menu.
function renderListShake(){
    let listShake = [];
    listShake= listAll.filter((item)=> {
        return item.type == "shake";
    })
    localStorage.setItem("chooseListNow",JSON.stringify(listShake));
    menu__itemNow(4);
    panigation(listShake);
    pageNow(1,perPage);
    document.getElementById("search").value = "";
    document.getElementById("titleListProducts").innerHTML = "Sinh tố";
}
    
// Nhấn chọn Tea trên menu.
function renderListTea(){
    let listTea=[];
    listTea= listAll.filter((item)=> {
        return item.type == "tea";
    })
    localStorage.setItem("chooseListNow",JSON.stringify(listTea));
    menu__itemNow(5);
    panigation(listTea);
    pageNow(1,perPage);
    document.getElementById("search").value = "";
    document.getElementById("titleListProducts").innerHTML = "Trà trái cây";
};

/* ----------------------------------------------------------------------------------------------------- */



/* Giỏ hàng */
// 1. Thêm sản phẩm vào giở hàng
function addToCart(idProduct) {
    if (checkLogin == null){
        alert("Bạn phải đăng nhập để mua hàng!");
        // window.location.href="../html/login.html";
        return;
    }

    // tìm giỏ hàng của người dùng  theo id
    for (let i = 0; i < listUsers.length; i++) {
        if (listUsers[i].idUser == checkLogin){
        
            // so sánh id sản phẩm khách chọn với id sản phẩm trong listAll
            let productDetail = listAll.filter((item)=>{
                return   item.id == idProduct
            })

            // trước khi push vào giỏ hàng thì kiểm tra trong giỏ hàng đã có sản phẩm đó chưa
            // nếu có rồi thì tăng số lượng sản phẩm lên
            for (let j = 0; j < listUsers[i].cart.length; j++) {
                if(listUsers[i].cart[j].id == idProduct){
                    listUsers[i].cart[j].quantity++;
                    listUsers[i].totalQuantityProduct ++;


                    showQuantityProduct()
                    localStorage.setItem("listUsers",JSON.stringify(listUsers))
                    return;
                }
            }

            // push sản phẩm vào giỏ hàng 
            listUsers[i].cart.push(productDetail[0]);
            listUsers[i].totalQuantityProduct ++;
            showQuantityProduct()
            localStorage.setItem("listUsers",JSON.stringify(listUsers))
          
        }
    }
   
}

// hiển thị số sản sản phẩm đucợ thêm vào giỏ hàng
function showQuantityProduct(){
    for (let i= 0; i < listUsers.length; i++) {
        if(listUsers[i].idUser == checkLogin){
            document.getElementsByClassName("header-top__quantity-cart")[0].innerHTML = listUsers[i].totalQuantityProduct;
            document.getElementsByClassName("main__box-left__quantity-cart")[0].innerHTML = listUsers[i].totalQuantityProduct;
            return;
        }
    }
}
showQuantityProduct()

/* ----------------------------------------------------------------------------------------------------------------- */



// Tìm kiếm
// Nhập rồi nhấn kinh lúp để tìm kiếm
function searchProduct(){
    let search =  (document.getElementById("search").value).toLowerCase() || "";
    if( search != ""){
        let resultSearch = [];
        let flag = true;
        for (let i=0; i< listAll.length; i++){
            if( ((listAll[i].name).toLowerCase()).indexOf(search) != -1){
                resultSearch.push(listAll[i]);
                flag = false;
            }
            if( ((listAll[i].desc).toLowerCase()) .indexOf(search) != -1){
                resultSearch.push(listAll[i]);
                flag = false;
            }
        }

        if(flag){
            noMatchingResults()
        }else{
            document.body.scrollTop = 590;
            document.documentElement.scrollTop = 590;
            localStorage.setItem("chooseListNow",JSON.stringify(resultSearch));
            panigation(resultSearch);
            pageNow(1,6);
        }
    }else{
        noMatchingResults()
    }
}

// Nhập rồi nhấn enter để tìm kiếm
document.getElementById("search").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchProduct()
    }
})

// không tìm thấy kết quả hoặc để trống
function noMatchingResults(){
    let element = 
        `
            <div class="main__box-right__no-matching-results">
                Không tìm thấy kết quả
            </div>
            <div class="main__box-right__no-matching-results">
                Không tìm thấy kết quả
            </div>
            <div class="main__box-right__no-matching-results">
                Không tìm thấy kết quả
            </div>
        `
    document.getElementById("list-products").innerHTML = element;
    document.getElementById("pagination").innerHTML = "";
    document.getElementById("sortListProduct").style = "display: none;";
    document.body.scrollTop = 590;
    document.documentElement.scrollTop = 590;
}

/* -------------------------------------------------------------------------------------------------------------------- */



// Sắp xếp tăng dần, giảm dần
// render khu vực nút sort
function renderSortArea(){
    document.getElementById("sortListProduct").style.removeProperty("display");
    let element=
        `
        Sắp xếp
        <ul>
            <li onclick="sortAscending()">Giá tăng dần</li>
            <li onclick="sortDescending()">Giá giảm dần</li>
        </ul>
        `
    document.getElementById("sortListProduct").innerHTML = element;
}


// giá tiền giảm dần
function sortDescending(){
    let checkListNow = JSON.parse(localStorage.getItem("chooseListNow")) || null;
        if(checkListNow==null){
            mixRandomListAll.sort((a,b) => b.price - a.price );
            panigation(mixRandomListAll);
            pageNow(1,perPage);
        }
        else{
            checkListNow.sort((a,b) => b.price - a.price );
            localStorage.setItem("chooseListNow",JSON.stringify(checkListNow));
            panigation(checkListNow);
            pageNow(1,perPage);
        }
}


// giá tiền tăng dần
function sortAscending(){
    let checkListNow = JSON.parse(localStorage.getItem("chooseListNow")) || null;
        if(checkListNow==null){
            mixRandomListAll.sort((a,b) => a.price - b.price );
            panigation(mixRandomListAll);
            pageNow(1,perPage);
        }
        else{
            checkListNow.sort((a,b) => a.price - b.price );
            localStorage.setItem("chooseListNow",JSON.stringify(checkListNow));
            panigation(checkListNow);
            pageNow(1,perPage);
        }
}