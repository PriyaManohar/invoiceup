importScripts('./script/idb.min.js');
var offlineData;
var offlineProvider;



var CACHE_ID = 'myCache-v1';
var dbPromise;
var urlsToCache = [
  './',
   './manifest.json',
   './index.html',
   './style/mycss.css',
   './style/materialize.min.css',
   './style/datatables.css',
   './script/pdf.js',
   './script/pageController.js',
   './script/matScript.js',
   './script/materialize.js',
   './script/invoice_search.js',
   './script/datatables.js',
   './script/jquery-3.1.1.min.js',
   './script/jspdf.debug.js',
   './script/jspdf.min.js',
   './images/invoice_letter.jpg',
   './partialviews/whoinfo.html',
   './partialviews/search.html',
   './partialviews/newInvoice.html',
   './partialviews/step2.html',
   './partialviews/step3.html',
   './partialviews/home.html'
];

self.addEventListener('install', function(event) {

//test, remove if nothing happens
 if (self.skipWaiting) { self.skipWaiting(); }

  // Perform install steps
  //self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_ID)
      .then(function(cache) {
        console.log('Opened cache');

        return cache.addAll([
          './',
          './index.html',
           './style/mycss.css',
           './style/materialize.css',
           './style/datatables.css',
           './script/pdf.js',
           './script/idb.min.js',
           './script/pageController.js',
           './script/matScript.js',
           './script/materialize.js',
           './script/invoice_search.js',
           './script/datatables.js',
           './script/jquery-3.1.1.min.js',
           './script/jspdf.debug.js',
           './script/jspdf.min.js',
           './images/invoice_letter.jpg',
           './images/logo.png',
           './partialviews/whoinfo.html',
           './partialviews/search.html',
           './partialviews/newInvoice.html',
           './partialviews/step2.html',
           './partialviews/step3.html',
           './partialviews/step4.html',
           './partialviews/home.html'
        ]);
      })
  );
});



self.addEventListener('fetch', function(event) {

  let url = new URL(event.request.url);
  let params = url.searchParams;
  let insProvider = params.get("provider");

  if((url.hostname == "localhost")&&(offlineData==true)&&(insProvider==offlineProvider)){
    console.log("Can be srved frm idb");
    if(url.pathname == "/webapi/invoiceup/provider"){
       console.log("Im in provider path");
      event.respondWith(serveProviderData(url,insProvider));
      return;
    }
    if(url.pathname == "/webapi/invoiceup/chaptercodes"){
      console.log("Im in chapter path");
      let chapterNo = params.get("chapter");
      event.respondWith(serveChapterData(url,insProvider,chapterNo));
      return;
    }
    if(url.pathname == "/webapi/invoiceup/search"){
      console.log("Im in search path");
      let searchStr = params.get("searchString");
      event.respondWith(serveSearchData(url,insProvider,searchStr).then(function(response){
        console.log("Response"+response);
        return response;
      }));
      return;
    }

  }

    event.respondWith(
    caches.open(CACHE_ID).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response||fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          console.log("Im in default fetch route");
          return response;
        });
      });
    })
  );


});

self.addEventListener('activate', function(event) {
 event.waitUntil(self.clients.claim()); // Become available to all pages
});



self.addEventListener('message', function(event) {
  console.log(event.data);
  offlineProvider = event.data.off_provider;
  offlineData = event.data.offline;
  console.log("Message received for "+offlineProvider);

});

function checkOfflineStatus() {
if( typeof offlineData === "undefined"){
  console.log("Offline options not setup ");
}
else
{
  console.log("Offline options setup for "+offlineProvider);
}

}

// function getOfflineData(url,insProvider){
//
//     return new Promise((resolve, reject) => {
//
//      var resp;
//         switch(url.pathname) {
//           case "/webapi/invoiceup/provider":
//               console.log("Im in provider path");
//               resp = serveProviderData(url,insProvider);
//               break;
//           case "/webapi/invoiceup/chaptercodes":
//               let param = url.searchParams;
//               let chapterNo = param.get("chapter");
//               resp = serveChapterData(url,insProvider,chapterNo);
//               console.log("Im in chaptercode path");
//               break;
//           case "/webapi/invoiceup/search":
//               let prm = url.searchParams;
//               let searchStr = prm.get("searchString");
//               resp = serveSearchData(url,insProvider,searchStr);
//               console.log("Im in search path");
//               break;
//
//       }
//       console.log("response = "+resp);
//       resolve (new Response(resp,{
//         headers: {'Content-Type': 'application/json'}
//       }));
//
// });
// }

function serveProviderData(url,insProvider){

      return new Promise((resolve, reject) => {
        idb.open('invoiceup', 1).then(function(db) {
        var tx = db.transaction(['providerContact'], 'readonly');
        var store = tx.objectStore('providerContact');
        var request = store.getAll(insProvider);
        return request;
      }).then(function(request){
        var result = JSON.stringify(request);
        resolve(new Response(result));
      }).catch(function(Err){
        console.log("Error retrieving provider info! "+Err);
      });

  });
}

function serveChapterData(url,insProvider,chapterno){

    return new Promise((resolve, reject) => {

    var chapterCodes = new Array();

    idb.open('invoiceup', 1).then(function(db) {
    var tx = db.transaction(insProvider, 'readonly');
    var store = tx.objectStore(insProvider);
    return store.openCursor();
  }).then(function logItems(cursor) {
    if (!cursor) {
      return;
    }
    //console.log('Cursored at:', cursor.key);
    if(chapterno == cursor.value.chapter_number){
      chapterCodes.push(cursor.value);
    }
    return cursor.continue().then(logItems);
  }).then(function(){
     var chapdata = JSON.stringify(chapterCodes);
     resolve(new Response(chapdata))
  }).catch(function(Err){
      console.log('Error in retrieving chaptercodes '+Err);
  });

});

}

function serveSearchData(url,insProvider,searchstr){

    return new Promise((resolve, reject) => {
    var srchCodes = new Array();

    idb.open('invoiceup', 1).then(function(db) {
    var tx = db.transaction(insProvider, 'readonly');
    var store = tx.objectStore(insProvider);
    return store.openCursor();
  }).then(function logItems(cursor) {
    if (!cursor) {
      return;
    }
    var desc = cursor.value.description;
    if(searchstr == cursor.value.key){
      srchCodes.push(cursor.value);
    }else if(desc.indexOf(searchstr) !== -1){
      srchCodes.push(cursor.value);
    }
    return cursor.continue().then(logItems);
  }).then(function(){
     var data = JSON.stringify(srchCodes);
     resolve(new Response(data))
  }).catch(function(Err){
      console.log('Error in retrieving Searchcodes '+Err);
  });

  });
}
