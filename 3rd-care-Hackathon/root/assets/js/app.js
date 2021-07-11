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

        let markerData = 
        [
          {
            lat: 35.495675,
            lng: 139.67078,
            content:
            '<table class="table">'+
              '<tr>'+
                '<th scope="row">混雑度</th>'+
                '<td>'+
                  '<div class="progress">'+
                    '<div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>'+
                  '</div>'+
                '</td>'+
              '</tr>'+
              '<tr>'+
                '<th scope="row">名前</th>'+
                '<td>生麦小学校</td>'+
              '</tr>'+
              '<tr>'+
                '<th scope="row">住所</th>'+
                '<td>生麦四丁目15番1号</td>'+
              '</tr>'+
              '<tr>'+
                '<th scope="row">備考</th>'+
                '<td>'+'被災した住民の避難生活の場所、情報受伝達、備蓄機能を備えた拠点です。'+'</td>'+
              '</tr>'+
            '</table>'+
            '<a href="shelter.html" class="btn btn-primary">避難所の詳細</a>',
            icon: ''
          },
          {
            lat: 35.4961022924626,
            lng: 139.6695676445758,
            content:
              '<div class="card" class="img-fluid">'+
                '<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">'+
                  '<ol class="carousel-indicators">'+
                    '<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>'+
                    '<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>'+
                    '<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>'+
                  '</ol>'+
                  '<div class="carousel-inner">'+
                    '<div class="carousel-item active" data-bs-interval="∞">'+
                      '<img src="../data/blueBack.jpg" class="d-block w-100" alt="no image">'+
                    '</div>'+
                    '<div class="carousel-item">'+
                      '<img src="../data/blueBack.jpg" class="d-block w-100" alt="no image">'+
                    '</div>'+
                    '<div class="carousel-item">'+
                      '<img src="../data/blueBack.jpg" class="d-block w-100" alt="no image">'+
                    '</div>'+
                  '</div>'+
                  '<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">'+
                    '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
                    '<span class="visually-hidden">Previous</span>'+
                  '</a>'+
                  '<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">'+
                    '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
                    '<span class="visually-hidden">Next</span>'+
                  '</a>'+
                '</div>'+
                '<div class="card-body">'+
                  '<h5 class="card-title">タイトル</h5>'+
                  '<p class="card-text">投稿者コメント</p>'+
                '</div>'+
              '</div>'+
              '<br>'+
              '<a href="danger.html" class="btn btn-primary">＋ 追加する</a>'
            ,
            icon: 'data/skull.png'
          },
          {
            lat: 35.4953,
            lng: 139.66695,
            content:
            '<table class="table">'+
              '<tr>'+
                '<th scope="row">混雑度</th>'+
                '<td>0%</td>'+
              '</tr>'+
              '<tr>'+
                '<th scope="row">名前</th>'+
                '<td>生麦小学校</td>'+
              '</tr>'+
              '<tr>'+
                '<th scope="row">住所</th>'+
                '<td>生麦四丁目15番1号</td>'+
              '</tr>'+
              '<tr>'+
                '<th scope="row">備考</th>'+
                '<td>'+'被災した住民の避難生活の場所、情報受伝達、備蓄機能を備えた拠点です。'+'</td>'+
              '</tr>'+
            '</table>'+
            '<a href="shelter.html" class="btn btn-primary">避難所の詳細</a>',
            icon: 'data/male-2.png'
          }
        ];

        let latlng = new google.maps.LatLng({
          lat: markerData[0]['lat'],
          lng: markerData[0]['lng']
        });

        var opts = {
          zoom: 16,
          center: latlng,
          streetViewControl: true,
          mapTypeControl: true
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