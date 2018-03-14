if(!location.hash)
{
  location.hash ='#home';
  window.history.pushState("","", '#home');
  addContent('home');
}

//OnClick handlers calling corresponding changePage functions

$('.home').click(function()
{
  changePage('home');
});

$('.search').click(function(event)
{

  changePage('search');
});

$('.whoinfo').click(function()
{
  changePage('whoinfo');
});

$('.whyinfo').click(function()
{
  changePage('whyinfo');
});

$('.newInvoice').click(function()
{
  changePage('newInvoice');
});

// $('#forward_step2').click(function()
// {
//   storeClinicianDetails();
//   changePage('step2');
// });

// $('#forward_step3').click(function()
// {
//   storePatientDetails();
//   changePage('step3');
// });

// $('#forward_step4').click(function()
// {
//   storeProviderDetails();
//   generatePdf();
//   changePage('step4');
// });

function changePage(pageHash)
{
    var pageHash;
    console.log("im working");
    $(".pageContent").empty();
    addContent(pageHash);
    addNavHistory(pageHash);
}

function addContent(screen){

  //   $.get('partialviews/'+screen+'.html', function(data) {
  //   //inject the content into the DOM
  //   $(".pageContent").empty();
  //   $(".pageContent").append(data);
  //   contentLoaded = true;
  // //  console.log(data);
  // });

  // url (required), options (optional)
fetch('./partialviews/'+screen+'.html', {
	method: 'get'
}).then(response => response.text())
.then(function(data) {
  $(".pageContent").empty();
  //var html = $.parseHTML(data);
  $(".pageContent").append(data);
  //console.log(data);

}).catch(function(err) {
	// Error :(
});


}

function addNavHistory(hash){
//Hash Hijack Method for SPA
//for each new SPA partial view, add the hash to the URL bar
    var hashValue = location.hash;
    hashValue = hashValue.substr(1);
    if(hashValue!=hash){
    window.history.pushState("", "", "#"+hash);
  }else{
    window.history.pushState("", "", "#"+hashValue);
  }

}//e

//On hash change event handler for page navigation
window.onhashchange = navigatePage;


function navigatePage(){

      var hash = location.hash;
      var hashValue = hash.substr(1);
      //Empties the previous content and adds the new partial view content
      $(".pageContent").empty();
      addContent(hashValue);

}
