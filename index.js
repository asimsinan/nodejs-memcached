var express    = require("express");
var Memcached = require('memcached');
var app = express();
 
// make connection with memcached server
var memcached = new Memcached('127.0.0.1:11211', {retries:10,retry:10000,remove:true});

 
// Memcached'de tutulacak nesne
var dersbilgisi = {
               'ders' : 'Yazılım Mühendisliği',
               'konu' : 'NodeJS ile Memcached Kullanımı',
               "ogretimuyesi":'Asım Sinan Yüksel',
               "eposta":'a.sinanyuksel@gmail.com'
            }

// nesne dersbilgisi anahtarında  10 saniye tutuluyor
memcached.set('dersbilgisi', dersbilgisi, 10, function (err) { 
  if(err) throw new err;
});
 
 
// ders bilgisini memcached'den getir
memcached.get('dersbilgisi', function (err, data) {
  console.log(data);
});
 
// tutulan bilgiyi silmek için
/*memcached.del('dersbilgisi', function (err) { 
  if(err) throw new err;
 });*/
 

app.listen(3000,function(){
  console.log("Sunucu 3000 portunda çalışıyor");
});
