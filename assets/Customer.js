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
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${customer.cusId}
                </th>
                <td class="px-6 py-4">${customer.name}</td>
                <td class="px-6 py-4">${customer.address}</td>
                <td class="px-6 py-4">${customer.tel}</td>
                <td> 
                <button
                id="updateCustomer"
                type="button"
                class="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:orange-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
              >
                Update
              </button>
              <button
                id="deleteCustomer"
                type="button"
                class="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
              >
                Delete
              </button>
            </td>
                
            </tr>`);
                
                
            });

        },
        error: function(customers){
            console.log(customers);
            
        }
    })

}