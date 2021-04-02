// Show or hide password
$('#pw-toggle').on('click',function(){

  let state = $('#password').prop('checked');

  if(!state){
    $('#password').prop('checked',true);
    $('#password').prop('type','text');
  }
  else{
    $('#password').prop('checked',false);
    $('#password').prop('type','password');
  }
  
})

// Foolproof on user registration page
$('#register').on('click',function(){

  let ans = confirm('この内容で登録します。よろしいですか？');

  if (ans) {
    location.href = 'login.html';  
  }
  else {
    location.href = '#';
  }

})

// Change and save password after login
$('#change').on('click',function(){

  let state = $('.form-control').prop('disabled');

  if(state){
    $('.form-control').prop('disabled',false);
    $('#pw-toggle').prop('disabled',false);
    $('#change').attr('value','保存');
  }
  else{

    let ans = confirm('この内容に変更します。よろしいですか？');

    if(ans){
      $('#password').prop('type','password');
      $('.form-control').prop('disabled',true);
      $('#pw-toggle').prop('checked',false);
      $('#pw-toggle').prop('disabled',true);
      $('#change').attr('value','変更');
    }
    else{
      location.href = '#';
    }
    
  }

})

// Validation
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

// Use of open data sources
// List of regional disaster prevention bases in Yokohama

// <user>
  // <home.html>
    // <Generate map>

      function initMap() {

        coordinateSetting();

        let latlng = new google.maps.LatLng({
          lat: markerData[0]['lat'],
          lng: markerData[0]['lng']
        });

        var opts = {
          zoom: 16,
          center: latlng
        };

        // <Generate map>
        let map = new google.maps.Map(document.getElementById("map"), opts);

        // <Generate marker>
        for(var i=0; i<markerData.length; i++){
  
          let marker = new google.maps.Marker({
            position: {
              lat: markerData[i]['lat'],
              lng: markerData[i]['lng']  
            },
            map: map
          });

        };

        // Generate infowindow when clicking marker
        var infowindow = new google.maps.InfoWindow({
          position: {
            lat: markerData[1]['lat'],
            lng: markerData[1]['lng']
          },
          content: markerData[1]['content']
        });

        var marker = new google.maps.Marker({
          position: {
            lat: markerData[1]['lat'],
            lng: markerData[1]['lng'],
          },
          map: map
        });

        google.maps.event.addListener(marker,'click',function(){
          infowindow.open(map, marker);
        });  

        // Generate marker on click
        google.maps.event.addListener(map, 'click', event => clickListener(event, map));

        // Route guidance    
        
      };

      // 座標設定
      function coordinateSetting(){
        fetch('/data/shelter.xml')
        .then(response => response.text())
        then(data => {
          const parser = new DOMParser();
          const sitemap = parser.parseFromString(data, "application/xml");
          
        });
      };

      // マップ上のクリック時にマーカーを生成
      function clickListener(event, map) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const marker = new google.maps.Marker({
          position: {lat, lng},
          map: map
        });
      };

    // </Generate map>
  // </home.html>
// </user>

// support-team/users
// Sorting