let listUsers = JSON.parse(localStorage.getItem("listUsers"))||[];
let listAll = JSON.parse(localStorage.getItem("listAll"))||[];
let checkLogin = localStorage.getItem("checkLogin") || null;

// function convert sang tiền việt
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

// // function tạo id cho từng product
function createIdProduct(){
    let idNewProduct = Math.floor(Math.random()*9999999999999 + new Date().getMilliseconds())
    for(let i=0; i<listAll.length; i++){
        if(idNewProduct == listAll[i].id ){
            createIdProduct()
        }
    }
    return idNewProduct;
}

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
function renderListProducts() {    
    let element="";
        for (let i = 0; i < listAll.length; i++) {
            element+=
            `
                <tr>
                    <td>${i+1}</td>
                    <td>${listAll[i].id}</td>
                    <td><img src="${listAll[i].image}" style="width:50px; height:50px;"></td>
                    <td>${listAll[i].type}</td>
                    <td style="text-align: start;">${listAll[i].name}</td>
                    <td style="text-align: start;">${listAll[i].desc}</td>
                    <td>${VND.format(listAll[i].price)}</td>
                    <td>
                        <button onclick="editProduct(${listAll[i].id})">Sửa</button>
                    </td>
                    <td>
                        <button onclick="deleteProduct('${listAll[i].name}' , ${listAll[i].id})">Xóa</button>
                    </td>
                </tr>
            `
        }
            document.getElementById("tbody").innerHTML = element;
}
renderListProducts();


           
/* ---------------------------------------------------------------------------------------- */
// function để thực hiện việc thêm sản phẩm mới
function addProduct(ee) {
    ee.preventDefault();
    
    let nameProduct = document.getElementById("name-product").value;
    let typeProduct = document.getElementById("type-product").value;
    let priceProduct = document.getElementById("price-product").value;
    let decsProduct = document.getElementById("desc-product").value;
    let imgProduct = document.getElementById("img-product").value;

    let productInfor = {
        type: typeProduct,
        name: nameProduct,
        desc: decsProduct,
        price: priceProduct,
        image: imgProduct,
        quantity:1,
        id: createIdProduct()
    }

    let checkIdEditProduct = localStorage.getItem("idEditProduct");
    if(checkIdEditProduct !== null){
        for (let i=0; i < listAll.length; i++) {

            if(listAll[i].id == checkIdEditProduct){
                listAll.splice(i,1,{...productInfor,id: checkIdEditProduct});

                localStorage.setItem("listAll",JSON.stringify(listAll));
                renderListProducts(listAll);

                localStorage.removeItem("idEditProduct");

                document.getElementById("form__id-product").style = "display: none";
                document.getElementById("btnAddProduct").innerHTML = "Thêm sản phẩm"
                document.getElementById("form__id-product").style = "display: none";
                document.getElementById("name-product").value = "";
                document.getElementById("type-product").value = "";
                document.getElementById("price-product").value = "";
                document.getElementById("desc-product").value = "";
                document.getElementById("img-product").value = ""; 
                document.getElementsByClassName("main__form")[0].style.removeProperty("position");
                document.getElementsByClassName("main__form")[0].style.removeProperty("top");
                document.getElementById("btnClose").style = "display: none";
                return;
            }      
        }
    }    
    else{
        listAll.unshift(productInfor);
        localStorage.setItem("listAll",JSON.stringify(listAll));
        renderListProducts(listAll);

        document.getElementById("form__id-product").style = "display: none";
        document.getElementById("btnAddProduct").innerHTML = "Thêm sản phẩm"
        document.getElementById("form__id-product").style = "display: none";
        document.getElementById("name-product").value = "";
        document.getElementById("type-product").value = "";
        document.getElementById("price-product").value = "";
        document.getElementById("desc-product").value = "";
        document.getElementById("img-product").value = ""; 
    }
}

/* --------------------------------------------------------------------------------------- */



// function edit product
function editProduct(idProduct) {
    localStorage.setItem("idEditProduct",idProduct);

    document.getElementsByClassName("main__form")[0].style = "position: sticky; top: 20px"
    document.getElementById("btnAddProduct").innerHTML = "Lưu"

    for (let i=0; i < listAll.length; i++) {
        if (listAll[i].id == idProduct) {
            document.getElementById("form__id-product").style = "display: block";
            document.getElementById("form__id-product").innerHTML = "ID: " + listAll[i].id;
            document.getElementById("btnClose").style = "display: block";
            document.getElementById("name-product").value = listAll[i].name;
            document.getElementById("type-product").value = listAll[i].type;
            document.getElementById("price-product").value = listAll[i].price;
            document.getElementById("desc-product").value = listAll[i].desc;
            document.getElementById("img-product").value = listAll[i].image; 
        }
    }
    localStorage.setItem("listAll",JSON.stringify(listAll));
}

function cancelEditProduct(){
    localStorage.removeItem("idEditProduct");
    document.getElementsByClassName("main__form")[0].style.removeProperty("position");
    document.getElementsByClassName("main__form")[0].style.removeProperty("top");

    document.getElementById("btnClose").style = "display: none";
    document.getElementById("form__id-product").style = "display: none";
    document.getElementById("btnAddProduct").innerHTML = "Thêm sản phẩm"
    document.getElementById("name-product").value = "";
    document.getElementById("type-product").value = "";
    document.getElementById("price-product").value = "";
    document.getElementById("desc-product").value = "";
    document.getElementById("img-product").value = ""; 
}

/* --------------------------------------------------------------------------------------- */



// function delete product
function deleteProduct(nameProduct,idProduct) {
    let checkDelete = confirm("Bạn muốn xóa sản phẩm:   " + nameProduct)
    if(checkDelete){
        for (let i = 0; i < listAll.length; i++) {
            if (listAll[i].id == idProduct) {
                listAll.splice(i, 1);
                localStorage.setItem("listAll",JSON.stringify(listAll));
                renderListProducts(listAll);
            }
        }
    }
}