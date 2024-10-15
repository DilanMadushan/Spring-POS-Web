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
            console.log(id);
            
        }
    })
}


function setCustomerTableValues(){

    $.ajax({
        method:"GET",
        url:"http://localhost:8080/Spring_Pos/api/v1/customer",
        success: function(customers){

            $('#customerTable').empty();

            customers.forEach(customer => {
                
                $('#customerTable').append(`<tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${customer.cusId}
                </td>
                <td class="px-6 py-4">${customer.name}</td>
                <td class="px-6 py-4">${customer.address}</td>
                <td class="px-6 py-4">${customer.tel}</td>
                
            </tr>`);
                
                
            });

        },
        error: function(customers){
            console.log(customers);
            
        }
    })

}



$('#addCustomer').on('click', function(){

    var cusId = $('#cusId').val();
    var cusName = $('#cusName').val();
    var cusAddress = $('#cusAddress').val();
    var cusTel = $('#cusTel').val();

    var customer = {
        "cusId":cusId,
        "name":cusName,
        "address":cusAddress,
        "tel":cusTel
    }

    $.ajax({
        method:"POST",
        url: "http://localhost:8080/Spring_Pos/api/v1/customer",
        processData:"false",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success:function(result){
            clearFields();
            setCustomerTableValues();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Customer Added successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },
        error: function(result){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Customer Added failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })

});


$("#updateCustomer").on('click' ,function(){

    var cusId = $('#cusId').val();
    var cusName = $('#cusName').val();
    var cusAddress = $('#cusAddress').val();
    var cusTel = $('#cusTel').val();

    var customer = {
        "name":cusName,
        "address":cusAddress,
        "tel":cusTel
    }

    $.ajax({
        method:"PATCH",
        url: `http://localhost:8080/Spring_Pos/api/v1/customer/${cusId}`,
        processData:"false",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success:function(result){
            clearFields();
            setCustomerTableValues();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Customer Update successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },
        error: function(result){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Customer Update failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })

})

$('#customerTable').on('click', 'tr', function() {
    const cusId = $(this).find('td').eq(0).text().trim();  
    
    $.ajax({
        method:"GET",
        url:`http://localhost:8080/Spring_Pos/api/v1/customer/${cusId}`,
        success: function(customer){        
            $('#cusId').val(customer.cusId);
            $('#cusName').val(customer.name);
            $('#cusAddress').val(customer.address);
            $('#cusTel').val(customer.tel);

        },
        error: function(customer){
            console.log(customer);
        }
    })
});


$('#deleteCustomer').on('click' ,function(){
    var cusId = $('#cusId').val();

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
                url:`http://localhost:8080/Spring_Pos/api/v1/customer/${cusId}`,
                success:function(result){
                    clearFields();
                    setCustomerTableValues();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Customer Delete successfully",
                        showConfirmButton: false,
                        timer: 1500
                    }); 
                },
                error:function(result){
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Customer Delete failed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

        }
    })
    
})


function clearFields(){
    genarateNextCustomerId();
    $('#cusName').val("");
    $('#cusAddress').val("");
    $('#cusTel').val("");
}