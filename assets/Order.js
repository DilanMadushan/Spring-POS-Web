function setCustomerIds(){
    
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