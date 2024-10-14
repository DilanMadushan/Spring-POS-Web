function setCustomerIds(){
    $.ajax({
        method:"GET",
        url:"http://localhost:8080/Spring_Pos/api/v1/customer",
        success: function(customers){

            customers.forEach(customer => {
                
                $('#cusId').append(`<option value="${customer.cusId}">${customer.cusId}</option>`)
                
            });

        },
        error: function(customers){
            console.log(customers);
            
        }
    })
}



function genarateNextCustomerId(){
    $.ajax({
        method:"GET",
        url:"http://localhost:8080/Spring_Pos/api/v1/customer/last",
        success:function(id){
            if(id == ""){
                $('#cusId').val("C001")

            }else{
                var parts = id.split("C");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#cusId").val("C00"+genNum);
                }else if(genNum.length == 2){
                    $("#cusId").val("C0"+genNum);
                }
                else{
                    $("#cusId").val("C"+genNum);
                }
            }

        },
        error:function(id){

        }
    })
}