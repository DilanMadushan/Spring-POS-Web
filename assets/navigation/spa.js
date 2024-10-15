$('#customerButton').on('click', function(){

    $('#customerSection').css({display:'block'});
    $('#itemSection').css({display:'none'});
    $('#orderSection').css({display:'none'});
    $('#cardSection').css({display:'none'});
    genarateNextCustomerId()
    setCustomerTableValues()

});

$('#itemButton').on('click', function(){

    $('#itemSection').css({display:'block'});
    $('#customerSection').css({display:'none'});
    $('#orderSection').css({display:'none'});
    $('#cardSection').css({display:'none'});
    genarateNextItemId();
    loadItemTable();

});

$('#orderButton').on('click', function(){

    $('#orderSection').css({display:'block'});
    $('#customerSection').css({display:'none'});
    $('#itemSection').css({display:'none'});
    $('#cardSection').css({display:'none'});
    setCustomerIds();

});

$(document).ready(function(){
    $('#orderSection').css({display:'none'});
    $('#customerSection').css({display:'none'});
    $('#itemSection').css({display:'none'});
    $('#cardSection').css({display:'block'});
})






