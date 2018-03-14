

// var codes_table =  $('#codes_table');
// var  search_table = $('#search_table');
// var prov_name,searchString,chap_no;
// var baseUrl ="http://localhost:8080/webapi/invoiceup/";
//
$(function() {

$(".button-collapse").sideNav();
$('select').material_select();
 $('.collapsible').collapsible({
    accordion: false,
    fillSpace: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

if(localStorage.getItem("offlineOptIn")=== "true"){
  let providerName = localStorage.getItem("offln_provider")
  sendMessage({offline: true,off_provider: providerName});
}
});

function sendMessage(message) {
  // This wraps the message posting/response in a promise, which will resolve if the response doesn't
  // contain an error, and reject with the error if it does. If you'd prefer, it's possible to call
  // controller.postMessage() and set up the onmessage handler independently of a promise, but this is
  // a convenient wrapper.
  return new Promise(function(resolve, reject) {
    var messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = function(event) {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    // This sends the message data as well as transferring messageChannel.port2 to the service worker.
    // The service worker can then use the transferred port to reply via postMessage(), which
    // will in turn trigger the onmessage handler on messageChannel.port1.
    // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
    navigator.serviceWorker.controller.postMessage(message,[messageChannel.port2]);
  });
}

// function to set select box with the selected text value
function getIndex(id,text)
{
   var textToFind = text;
   var selectID = id;
   var selectBox = document.getElementById(selectID);
   console.log(selectID,textToFind);
   for (var i = 0; i < selectBox.options.length; i++) {
    if (selectBox.options[i].text === textToFind) {
        selectBox.selectedIndex = i;
        return(i);
        break;
    }
    }

}

//  codes_table.hide();
//  search_table.hide();
//  main_table.hide();
//  $('#clearSearchButton').hide();
//  $('#clearTableButton').hide();
//  $('#clrSearchButton').hide();
//
//
//
//
//
//
//  // $(window).bind('resize', function () {
//  // codes_table.fnAdjustColumnSizing();
//  // search_table.fnAdjustColumnSizing();
//  //  } );
//
// });
//
// $( "#search_text" ).focus(function() {
//   var prov = $( "#select_provider option:selected" ).text();
//   console.log(prov);
//   if (prov === "Select Provider")
//       alert( "Please select the provider first !" );
//   $( "#search_text" ).off( "focus" );
// });
//
// // $( "#select_chapter_search" ).focus(function() {
// //     var pro = $( "#select_provider option:selected" ).text();
// //     if (pro === "Select Provider")
// //       alert( "Please select the provider first !" );
// //   $( "#select_chapter_search" ).off( "focus" );
// // });
//
//
// $("#select_provider").change(function(){
//  var provider = document.getElementById("select_provider");
//  prov_name = provider.options[provider.selectedIndex].text.toLowerCase();
// });
//
// $('#search_text').keypress(function (event) {
//     var keypressed = event.keyCode || event.which;
//     if (keypressed == 13)
//     {
//         event.preventDefault();
//         searchString = $('#search_text').val().toLowerCase();
//         //console.log(searchString);
//         var sTable = $('#search_table').DataTable();
//         sTable.destroy();
//         var url2 = baseUrl+'search?provider='+prov_name+'&&searchString='+searchString;
//
//
//         populateTable(url2,search_table);
//         $('#clearSearchButton').show();
//
//
//     }
// });
//
// $("#select_chapter_search").change(function(){
//
//   var pro = $( "#select_provider option:selected" ).text();
//   if (pro === "Select Provider"){
//       alert( "Please select the provider first !" );
//       // $("#select_chapter_search").val("").change();
//       // $( "#select_chapter_search" ).off( "focus" );
//
//   }
//   else {
//
//        var chapter = document.getElementById("select_chapter_search");
//        chap_no = chapter.options[chapter.selectedIndex].value;
//        console.log(chap_no);
//        var myTable = $('#codes_table').DataTable();
//        myTable.destroy();
//        var url1 = baseUrl+'chaptercodes?provider='+prov_name+'&&chapter='+chap_no;
//
//        //To do.....check if prov_name is valid
//        populateTable(url1,codes_table);
//         $('#clearTableButton').show();
//
// }
// });
//
//
//  function populateTable(url,table){
//
//   fetch(url, {
//   	method: 'get'
//   }).then(response => response.json())
//   .then(function(data) {
//
//     table.DataTable( {
//     responsive: true,
//     data: data,
//     columns: [
//         { data: 'code' },
//         { data: 'description' },
//         { data: 'anaes_fees' },
//         { data: 'surg_fees' }
//     ]
// } );
//
//     table.show();
//     table.resize();
//     console.log(data);
//
//    //  if (typeof table !== "undefined")
//    // table.columns.adjust().responsive.recalc();
//
//   }).catch(function(err) {
//   	// Error :(
//   });
//
// }
//
// function clearTable(table){
//   var clrTable = table.DataTable();
//   clrTable.destroy();
//   table.hide();
//
// }

// $( "#clearSearchButton" ).click(function() {
//   $('#search_text').val("");
//   clearTable(search_table);
// });
//
// $( "#clearTableButton" ).click(function() {
//   clearTable(codes_table);
// });

// function storeClinicianDetails(){
//
//       var fname = $("#first_name_prof").val();
//       var lname = $("#last_name_prof").val();
//       var title = $( "#prof_title option:selected" ).text();
//       var designation = $("#designation").val();
//       var email = $("#prof_email").val();
//       var gmcNo =  $("#gmc_no").val();
//       var mobile_no = $("#mobile_no").val();
//       var address1 = $("#address_1_prof").val();
//       var address2 = $("#address_2_prof").val();
//       var city = $("#city_prof").val();
//       var postcode = $("#postcode_prof").val();
//
//       sessionStorage.setItem("doc_firstname", fname);
//       sessionStorage.setItem("doc_lastname", lname);
//       sessionStorage.setItem("doc_title", title);
//       sessionStorage.setItem("doc_designation", designation);
//       sessionStorage.setItem("doc_email", email);
//       sessionStorage.setItem("doc_gmcno", gmcNo);
//       sessionStorage.setItem("doc_mobno", mobile_no);
//       sessionStorage.setItem("doc_add1", address1);
//       sessionStorage.setItem("doc_add2", address2);
//       sessionStorage.setItem("doc_city", city);
//       sessionStorage.setItem("doc_postcode", postcode);
//
//       var lastnam= sessionStorage.getItem("doc_lastname");
//       console.log(lastnam);
//
// }

// function  storePatientDetails(){
//
//         var fname = $("#patientfirst_name").val();
//         var lname = $("#patientlast_name").val();
//         var title = $( "#patient_title option:selected" ).text();
//         var policy_ref =  $("#policy_no").val();
//         var dob = $("#patient_dob").val();
//         var address1 = $("#patient_address1").val();
//         var address2 = $("#patient_address2").val();
//         var city = $("#patient_city").val();
//         var postcode = $("#patient_postcode").val();
//
//         sessionStorage.setItem("pat_firstname", fname);
//         sessionStorage.setItem("pat_lastname", lname);
//         sessionStorage.setItem("pat_title", title);
//         sessionStorage.setItem("policy_ref", policy_ref);
//         sessionStorage.setItem("pat_dob", dob);
//         sessionStorage.setItem("pat_add1", address1);
//         sessionStorage.setItem("pat_add2", address2);
//         sessionStorage.setItem("pat_city", city);
//         sessionStorage.setItem("pat_postcode", postcode);
//
//
// }

// function   storeProviderDetails(){
//
//     var prov = $( "#select_provider1 option:selected" ).text();
//     var dob_proc = $("#date_of_procedure").val();
//     var proc_code = $("#procedure_code").val();
//     var proc_fees = $("#proc_fees").val();
//
//     providerUrl = baseUrl+"provider?provider="+prov.toLowerCase();
//
//     fetch(providerUrl, {
//     	method: 'get'
//     }).then(response => response.json())
//     .then(function(data) {
//
//     var provider = data[0];
//     var prov_add1 = provider.address1;
//     var prov_add2 = provider.address2;
//     var prov_town = provider.town;
//     var prov_pcode = provider.postcode;
//
//     sessionStorage.setItem("prov_name", prov);
//     sessionStorage.setItem("dob_proc", dob_proc);
//     sessionStorage.setItem("proc_code", proc_code);
//     sessionStorage.setItem("proc_fees", proc_fees);
//     sessionStorage.setItem("prov_add1", prov_add1);
//     sessionStorage.setItem("prov_add2", prov_add2);
//     sessionStorage.setItem("prov_town", prov_town);
//     sessionStorage.setItem("prov_pcode", prov_pcode);
//
//     }).catch(function(err) {
//     	// Error :(
//     });
//
//
// }


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
