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