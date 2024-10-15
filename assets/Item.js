function genarateNextItemId(){

    $.ajax({
        method:"GET",
        url:"http://localhost:8080/Spring_Pos/api/v1/item/last",
        success: function(id){
            console.log(id);
            
            if(id == ""){
                $('#proId').val("P009")

            }else{
                var parts = id.split("P");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#proId").val("P00"+genNum);
                }else if(genNum.length == 2){
                    $("#proId").val("P0"+genNum);
                }
                else{
                    $("#proId").val("P"+genNum);
                }
            }

        },
        error: function(id){
            console.log(id);
        }
    })
}

function loadItemTable(){

    $('#proTable').empty();

    $.ajax({
        method:"GET",
        url:"http://localhost:8080/Spring_Pos/api/v1/item",
        success:function(items){
            items.forEach(item => {
                $("#proTable").append(`<tr
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ${item.itemId}
                </td>
                <td class="px-6 py-4">${item.name}</td>
                <td class="px-6 py-4">${item.price}</td>
                <td class="px-6 py-4">${item.qty}</td>
              </tr>`)
            });

        },
        error:function(){

        }

    })

}

$('#addProduct').on('click', function(){

    var proId =   $('#proId').val();
    var proName = $('#proName').val();
    var proPrice = $('#proPrice').val();
    var proQty = $('#proQty').val();

    var item = {
        "itemId": proId,
        "name": proName,
        "price": proPrice,
        "qty": proQty
    }

    $.ajax({
        method:"POST",
        url:"http://localhost:8080/Spring_Pos/api/v1/item",
        processData:false,
        contentType:"application/json",
        data:JSON.stringify(item),
        success:function(){
            clearItemFields();
            loadItemTable();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product Added successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error:function(){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Product Added failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
})


$('#proTable').on('click', 'tr', function() {
    const itemId = $(this).find('td').eq(0).text().trim();  
    
    $.ajax({
        method:"GET",
        url:`http://localhost:8080/Spring_Pos/api/v1/item/${itemId}`,
        success: function(item){        
            $('#proId').val(item.itemId);
            $('#proName').val(item.name);
            $('#proPrice').val(item.price);
            $('#proQty').val(item.qty);

        },
        error: function(customer){
            console.log(customer);
        }
    })
});



$('#updateProduct').on('click', function(){

    var proId =  $('#proId').val();
    var proName = $('#proName').val();
    var proPrice = $('#proPrice').val();
    var proQty = $('#proQty').val();

    var item = {
        "name": proName,
        "price": proPrice,
        "qty": proQty
    }

    $.ajax({
        method:"PATCH",
        url:`http://localhost:8080/Spring_Pos/api/v1/item/${proId}`,
        processData:false,
        contentType:"application/json",
        data:JSON.stringify(item),
        success:function(){
            loadItemTable();
            clearItemFields();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product Update successfully",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function(){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Product update failed",
                showConfirmButton: false,
                timer: 1500
            });

        }
    })


})



$('#deleteProduct').on('click', function(){

    var proId = $('#proId').val();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"

    }).then((result) =>{

        if(result.isConfirmed){
            $.ajax({
                method:"DELETE",
                   url:`http://localhost:8080/Spring_Pos/api/v1/item/${proId}`,
                success:function(){
                   loadItemTable();
                   clearItemFields();
                   Swal.fire({
                       position: "top-end",
                       icon: "success",
                       title: "Product Delete successfully",
                       showConfirmButton: false,
                       timer: 1500
                   });
                   
                   },
                   error:function(){
                       Swal.fire({
                           position: "top-end",
                           icon: "error",
                           title: "Product Delete failed",
                           showConfirmButton: false,
                           timer: 1500
                       });
                   }
               })
        }

    })
})

function clearItemFields(){
    genarateNextItemId();
    $('#proName').val("");
    $('#proPrice').val("");
    $('#proQty').val("");
}

