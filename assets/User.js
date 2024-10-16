$('#login').on('click' ,function(){
    var username = $('#userId').val();
    var password = $('#password').val();

    $.ajax({
        method:"GET",
        url:`http://localhost:8080/Spring_Pos/api/v1/user/${username}`,
        success:function(user){
            if(user.password === password){
                navigateToPos();
            }else{
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "The username or email entered does not exist or is misspelled",
                    showConfirmButton: false,
                    timer: 1500
                });

                return
            }
        },
        error:function(user){
            console.log(user);
        }
        
    })
})

