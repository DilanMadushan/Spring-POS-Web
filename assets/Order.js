var itemDTOS = [];

function genarateNewOrderId(){

    $.ajax({
        method:"GET",
        url:"http://localhost:8080/Spring_Pos/api/v1/order/last",
        success:function(id){

            if(id == ""){
                $('#orderId').text("O001")

            }else{
                var parts = id.split("O");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#orderId").text("O00"+genNum);
                }else if(genNum.length == 2){
                    $("#orderId").text("O0"+genNum);
                }
                else{
                    $("#orderId").text("O"+genNum);
                }
            }

        },
        error:function(id){
            console.log(id);
        }
    })
}


function setCustomerIds(){

    $('#orderCusId').empty();
    $('#orderCusId').append(`<option value="">Customer Id</option>`);

    $.ajax({
        method:"GET",
        url:"http://localhost:8080/Spring_Pos/api/v1/customer",
        success: function(customers){

            customers.forEach(customer => {
                
                $('#orderCusId').append(`<option value="${customer.cusId}">${customer.cusId}</option>`)
                
            });

        },
        error: function(customers){
            console.log(customers);
            
        }
    })
}



$('#orderCusId').change(function(){
    var cusId = $('#orderCusId').val();

    $.ajax({
        method:"GET",
        url:`http://localhost:8080/Spring_Pos/api/v1/customer/${cusId}`,
        success: function(customer){        
            $("#orderCustomerName").val(customer.name);
        },
        error: function(customer){
            console.log(customer);
        }
    })
    
})


function setItemIDs(){
    $("#orderProId").empty();
    $("#orderProId").append(`<option value="">Product Id</option>`);

    $.ajax({
        method:"GET",
        url:"http://localhost:8080/Spring_Pos/api/v1/item",
        success:function(items){
            items.forEach(item => {
                $("#orderProId").append(`<option value="${item.itemId}">${item.itemId}</option>`)
            });

        },
        error:function(items){
            console.log(items);
            
        }
    })

}


$("#orderProId").change(function(){
    var itemId =  $("#orderProId").val();

    $.ajax({
        method:"GET",
        url:`http://localhost:8080/Spring_Pos/api/v1/item/${itemId}`,
        success:function(items){
            $('#proItemName').val(items.name);
            $('#orderItemPrice').val(items.price);
            $("#orderItemQtyOnHand").val(items.qty);
        },
        error:function(items){
            console.log(items);
            
        }
    })

});

$('#addOrder').on('click',function (){
    var cusId = $('#orderCusId').val();
    var proId = $('#orderProId').val();
    var proName = $('#proItemName').val();
    var price = parseFloat($('#orderItemPrice').val());
    var qtyOnHand = parseFloat($("#orderItemQtyOnHand").val());
    var qty = parseFloat($('#orderItemQty').val());

    if(qtyOnHand<qty){
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "The quantity entered exceeds the available stock",
            showConfirmButton: false,
             timer: 1500
        });

        return
    }

    products={
        "itemId": proId,
        "name": proName,
        "price": price,
        "qty": qty
    }


    $('#orderTable').append(`<tr
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ${proId}
                </th>
                <td class="px-6 py-4">${proName}</td>
                <td class="px-6 py-4"> ${price}</td>
                <td class="px-6 py-4"> ${qty}</td>
              </tr>`);

    calculateTotal(price*qty);

})

function calculateTotal(price){
    var tot = parseFloat($('#totalPrice').text());
    $('#totalPrice').text(tot+=price);
}


$('#placeOrder').on('click',function (){
    var tot = $('#totalPrice').text();
    var cusId = $('#orderCusId').val();
    var orderId = $('#orderId').text();

    $.ajax({
        method:"POST",
        url:`http://localhost:8080/Spring_Pos/api/v1/order?orderId=${orderId}&cusId=${cusId}&totalPrice=${tot}`,
        contentType:"application/json",
        data:JSON.stringify(itemDTOS),
        success:function(){
            clearOrderFields();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Order Placed successfully",
                showConfirmButton: false,
                timer: 1500
            }); 
        },
        error:function(){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Order Placed failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
})

function clearOrderFields(){
    genarateNewOrderId();
    $('#orderProId').val("");
    $('#orderCusId').val("");
    $('#orderCustomerName').val("");
    $('#proItemName').val("");
    $('#orderItemPrice').val("");
    $("#orderItemQtyOnHand").val("");
    $('#orderItemQty').val("");
    $('#orderTable').empty()
    $('#totalPrice').text("");
    itemDTOS = [];
}