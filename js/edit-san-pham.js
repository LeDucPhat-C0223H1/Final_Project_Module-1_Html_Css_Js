function editProduct(idProduct) {
    localStorage.setItem("idEditProduct",idProduct);
}

// Bỏ thêm đống này vào phần thêm mới
let checkIdEditProduct = localStorage.getItem("idEditProduct");
    if(checkIdEditProduct !== null){
        for (let i=0; i < listAll.length; i++) {

            if(listAll[i].id == checkIdEditProduct){
                listAll.splice(i,1,{...productInfor,id: checkIdEditProduct});

                localStorage.setItem("listAll",JSON.stringify(listAll));
                renderListProducts(listAll);

                localStorage.removeItem("idEditProduct");

                return;
            }      
        }
    }    