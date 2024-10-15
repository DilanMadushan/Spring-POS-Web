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
                <td class="px-6 py-4">${item.price}</td>
              </tr>`)
            });

        },
        error:function(){

        }

    })

}