/*
->利用する API について
  ->料金表：https://cloud.google.com/maps-platform/pricing/?hl=ja#:~:text=%E3%83%9E%E3%83%83%E3%83%97%E3%80%81%E3%83%AB%E3%83%BC%E3%83%88%E3%80%81%E3%83%97%E3%83%AC%E3%82%A4%E3%82%B9%E3%81%AE%E6%96%99%E9%87%91&text=%E6%AF%8E%E6%9C%88%20%24200%20%E5%88%86%E3%81%BE%E3%81%A7%E3%81%AF%E7%84%A1%E6%96%99%E3%81%A7%E3%81%94%E5%88%A9%E7%94%A8%E3%81%84%E3%81%9F%E3%81%A0%E3%81%91%E3%81%BE%E3%81%99%E3%80%82&text=%E4%BD%BF%E7%94%A8%E9%87%8F%E3%81%8C%2010%20%E4%B8%87,%E3%81%94%E7%94%A8%E6%84%8F%E3%81%97%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82

  ->無料枠：$200/1mth
->maps javascript api
  ->公式ドキュメント：
  ->料金：$7/1000request
->geolocation api
  ->公式ドキュメント：https://developers.google.com/maps/documentation/geolocation/overview?hl=ja
  ->料金：$5/1000request
->direction api
*/

async function initMap() {

  // マップ生成のためのテストデータ
  const markerData = 
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
    },
  ];
  
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setOptions({
    preserveViewport: false
  });

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: {
      lat: markerData[0]["lat"],
      lng: markerData[0]["lng"]
    },
  });

  // 初期マーカーの生成
  for(var i=0; i<markerData.length; i++){

    let marker = new google.maps.Marker({
      position: {
        lat: markerData[i]['lat'],
        lng: markerData[i]['lng']  
      },
      map: map
    });

  };
  google.maps.event.addListener(map, 'click', event => clickListener(event, map));
  directionsRenderer.setMap(map);

  // ルート案内
  directionsRenderer.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsRenderer);
}

// 現在地の取得

// マップをタップ時にマーカーと情報ウィンドウを生成する関数を定義
async function clickListener(event, map) {
  // マーカーを生成
  const lat = event.latLng.lat();
  console.log(lat)
  const lng = event.latLng.lng();
  console.log(lng)
  const marker = new google.maps.Marker({
    position: {lat, lng},
  });
  marker.setMap(map);

  // 情報ウィンドウを生成
  const infowindow = new google.maps.InfoWindow({
    position: {
      lat: lat,
      lng: lng
    },
    content:
    '<a href="../use-base-material-kit/danger.html" class="btn btn-primary">危険地点を共有する</a>'+
    '<button id="pre_loc" class="btn btn-primary" onclick="calculateAndDisplayRoute()">ここから避難所まで行く</button>'
  });
  infowindow.open(map, marker);
};

// ルート案内関数の定義
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
    {
      origin: {
        lat: 35.495675, // jsonデータを直接指定することができなかった
        lng: 139.67078　// jsonデータを直接指定することができなかった
      },
      destination: {
        lat: 35.4953,　// jsonデータを直接指定することができなかった
        lng: 139.66695　// jsonデータを直接指定することができなかった
      },
      travelMode: google.maps.TravelMode.WALKING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      };
    }
  );
};