
var provider_name,prof,profIndex;
var  main_table = $('#maintable');


$("#select_provider1").change(function(){
 var provider = document.getElementById("select_provider1");
 provider_name = provider.options[provider.selectedIndex].text.toLowerCase();

});

$("#select_profession").change(function(){
 var profession = document.getElementById("select_profession");
 prof = profession.options[profession.selectedIndex].text.toLowerCase();
 profIndex = profession.options[profession.selectedIndex].value;
});


$('#search_text1').keypress(function (event) {
    var keypressed = event.keyCode || event.which;
    if (keypressed == 13)
    {
        event.preventDefault();
        searchString = $('#search_text1').val().toLowerCase();
        //console.log(searchString);
        var sTable = $('#maintable').DataTable();
        sTable.destroy();
        var url3 = baseUrl+'search?provider='+provider_name+'&&searchString='+searchString;


        populateInvoiceTable(url3,main_table);
        $('#clrSearchButton').show();


    }
});

$( "#clrSearchButton" ).click(function() {
  $('#search_text1').val("");
  clearTable(main_table);
});


// $(function() {
//
//
// });

function populateInvoiceTable(url,table){

 fetch(url, {
   method: 'get'
 }).then(response => response.json())
 .then(function(data) {

   table.DataTable( {
   responsive: true,
   select: true,
   data: data,
   columns: [
       { data: 'code' },
       { data: 'description' },
       { data: 'anaes_fees' },
       { data: 'surg_fees' }
   ]

} );

$('#maintable tbody').on('click', 'tr', function () {
      //  var data = table.api.row( this ).data();
    var code = $(this).find("td").eq(0).html();
    var feeindex = parseInt(profIndex) + 1;
    var fees =$(this).find("td").eq(feeindex).html();
    $("#procedure_code").empty();
    $("#proc_fees").empty();
    $("#procedure_code").val(code);
    $("#proc_fees").val(fees);
    $("#procedure_code").parent().find("label").addClass("active");
    $("#proc_fees").parent().find("label").addClass("active");
    } );

   table.show();
   table.resize();
   console.log(data);



 }).catch(function(err) {
   // Error :(
 });

}
