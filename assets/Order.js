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
        },
        error:function(items){
            console.log(items);
            
        }
    })

});