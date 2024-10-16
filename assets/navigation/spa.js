$('#customerButton').on('click', function(){

    $('#customerSection').css({display:'block'});
    $('#itemSection').css({display:'none'});
    $('#orderSection').css({display:'none'});
    $('#cardSection').css({display:'none'});
    $('#loginForm').css({display:'none'});
    genarateNextCustomerId()
    setCustomerTableValues()

});

$('#itemButton').on('click', function(){

    $('#itemSection').css({display:'block'});
    $('#customerSection').css({display:'none'});
    $('#orderSection').css({display:'none'});
    $('#cardSection').css({display:'none'});
    $('#loginForm').css({display:'none'});
    genarateNextItemId();
    loadItemTable();

});

$('#orderButton').on('click', function(){

    $('#orderSection').css({display:'block'});
    $('#customerSection').css({display:'none'});
    $('#itemSection').css({display:'none'});
    $('#cardSection').css({display:'none'});
    $('#loginForm').css({display:'none'});
    setCustomerIds();
    setItemIDs();
    genarateNewOrderId();
});


$(document).ready(function(){
    $('#orderSection').css({display:'none'});
    $('#customerSection').css({display:'none'});
    $('#itemSection').css({display:'none'});
    $('#cardSection').css({display:'none'});
    $('#logo-sidebar').css({display:'none'});
    $('#loginForm').css({display:'block'});
})

function navigateToPos(){
    $('#orderSection').css({display:'none'});
    $('#customerSection').css({display:'block'});
    $('#itemSection').css({display:'none'});
    $('#logo-sidebar').css({display:'block'});
    $('#loginForm').css({display:'none'});
    genarateNextCustomerId()
    setCustomerTableValues()
}







