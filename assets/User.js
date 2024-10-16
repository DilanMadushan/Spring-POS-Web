$('#login').on('click' ,function(){
    var username = $('#userId').val();
    var password = $('#password').val();

    if(!validateUser()){
        return
    }

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


function validateUser(){

    const showError = (message) => {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: message,
            showConfirmButton: false,
            timer: 1500
        });
    };

    var username = $('#userId').val();
    var password = $('#password').val();

    const requiredFields = [
        {field: username, message: "User ID is required"},
        {field: password, message: "Password is required"}
    ];

    for (let i = 0; i < requiredFields.length; i++) {
        if (requiredFields[i].field === "") {
            showError(requiredFields[i].message);
            return false;
        }
    }
    return true;
    
}
