let checkLogin = localStorage.getItem("checkLogin") || [];
let listUsers = JSON.parse(localStorage.getItem("listUsers"))||[];

// function convert sang tiền việt
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

/* ----------------------------------------------------------------------------------------------------- */



//Hiển thị đại email mua hàng 
for( let i=0; i<listUsers.length ;i++)
    if(checkLogin == listUsers[i].idUser){
        document.getElementById("email").innerHTML = listUsers[i].email;
        break;
}

// Render các sản phẩm đã thêm vào giỏ hàng
function renderCarts() {    
    let total = 0;
    for (let i = 0; i < listUsers.length; i++) {
        if (listUsers[i].idUser == checkLogin){
            
            let element="";
            let result = listUsers[i].cart;

            if(result.length != 0){
                document.getElementsByClassName("main__pay")[0].style = "display:block;";
            }    
         
            for (let j = 0; j < result.length; j++) {
                total += result[j].price * result[j].quantity;
                element+=
                `
                    <tr>
                        <td>${j+1}</td>
                        <td class="name-product">${result[j].name}</td>
                        <td>${VND.format(result[j].price)}</td>
                        <td class="action-quantity">
                            <span onclick=decreaseQuatity(${result[j].id}) class="material-symbols-outlined">
                                remove
                            </span>
                            ${result[j].quantity}
                            <span onclick=increaseQuatity(${result[j].id}) class="material-symbols-outlined">
                                add
                            </span>
                        </td>
                        <td>${VND.format(result[j].price * result[j].quantity)}</td>
                    </tr>
                `
            }
            document.getElementById("tbody").innerHTML = element;
            document.getElementById("total").innerHTML = 
            `
                <div>Tổng số lượng : ${listUsers[i].totalQuantityProduct} ly</div>
                <div>Tổng tiền : ${VND.format(total)}</div>
            `;

        }
        
    }
}
renderCarts();


// Tăng giảm số lượng sản phẩm trong giỏ hàng
// function tăng số lượng sản phẩm
function increaseQuatity(idProduct) {
    for (let i=0; i < listUsers.length; i++) {
        if (listUsers[i].idUser == checkLogin){
            
            for (let j = 0; j < listUsers[i].cart.length; j++) {
                if(listUsers[i].cart[j].id == idProduct){
                    listUsers[i].cart[j].quantity++;
                    listUsers[i].totalQuantityProduct++;
                    
                    localStorage.setItem("listUsers",JSON.stringify(listUsers));
                    renderCarts();
                    return;
                }
            }
        }
        
    }
}

// function giảm số lượng sản phẩm
function decreaseQuatity(idProduct) {
    for (let i = 0; i < listUsers.length; i++) {
        if (listUsers[i].idUser == checkLogin) {
           
            for (let j = 0; j < listUsers[i].cart.length; j++) {
                if (listUsers[i].cart[j].id == idProduct) {
                    
                    listUsers[i].cart[j].quantity--;
                    if(listUsers[i].totalQuantityProduct>0){
                        listUsers[i].totalQuantityProduct--;
                    }
                   
                    if (listUsers[i].cart[j].quantity == 0){
                        let checkDelete = confirm("Bạn muốn xóa thức uống này phải không?");

                        if(checkDelete){
                            listUsers[i].cart.splice(j,1);
                        }
                        else{
                            return;
                        }
                    }

                    localStorage.setItem("listUsers", JSON.stringify(listUsers));
                    renderCarts();
                    return;
                }
            }
        }

    }
}


// Thanh toán
function payCart(){
    for (let i = 0; i < listUsers.length; i++) {
        if (listUsers[i].idUser == checkLogin) {
            listUsers[i].cart.length = 0;
            listUsers[i].totalQuantityProduct = 0;
            localStorage.setItem("listUsers", JSON.stringify(listUsers));
            let element = 
            `
                <div class="main__thanks-guest">
                    <h2>
                        Cảm ơn quý khách đã mua hàng
                        <i class="fa-solid fa-heart"></i>
                    </h2>
                    <button onclick="backToProductPage()">Quay về</button>
                </div>
            `
            document.getElementById("main").innerHTML = element;
            return;
        }
    }
}

function backToProductPage(){
    window.location.href="../index.html";
}