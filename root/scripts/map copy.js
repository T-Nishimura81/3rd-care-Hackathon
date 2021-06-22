/*
->利用する API について
  ->料金表：https://cloud.google.com/maps-platform/pricing/?hl=ja

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

  // 初期マップの生成
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: {
      lat: 35.495675,
      lng: 139.67078
    },
  });

  // 現在地にマーカーを立てるUIの追加
  addUI(map)

}

// 関数マネージャ
function functionManager(event, map, directionsService, directionsRenderer) {
  let lat = event.latLng.lat();
  console.log(lat)
  let lng = event.latLng.lng();
  console.log(lng)
  let marker = new google.maps.Marker({
    position: {lat, lng},
  });
  
  // ルート案内
  directionsRenderer.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsRenderer, lat, lng)
}

// カスタムUIの追加
function addUI(map) {
  const UIbg = document.createElement('div');
  const UI = document.createElement('img');

  UIbg.style.paddingRight = "2.5%";

  UI.src = "../data/img/ポイントカーソル.jpeg";
  UI.width = 40;
  UI.height = 40;
  UI.style.cursor = "pointer";
  UIbg.appendChild(UI);

  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(UIbg);

  UIbg.addEventListener("click", () => {
    geolocation(map)
  });
}

// 現在地の取得
function geolocation(map) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        markerGenerate(map, lat, lng)
      }
    );
  }
}

// マーカーを生成する関数
function markerGenerate(map, lat, lng) {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: {
      lat: lat,
      lng: lng
    }
  })

  let marker = new google.maps.Marker({
    position: {
      lat: lat,
      lng: lng
    },
    map: map,
    icon: new google.maps.MarkerImage(
      "../data/img/位置情報アイコン4.png",
      new google.maps.Size(48, 48),
      new google.maps.Point(0, 0)
    )
  })
  marker.setMap(map);

  addUI(map)
};

// 情報ウィンドウを生成する関数
function infowindowGenerate(lat, lng, marker) {

  let infowindow = new google.maps.InfoWindow({
    position: {
      lat: lat,
      lng: lng
    },
    content:
    '<a href="../use-base-material-kit/danger.html" class="btn btn-primary">危険地点を共有する</a>'+
    '<br>'+
    '<button id="pre_loc" class="btn btn-primary" onclick="calculateAndDisplayRoute()">ここから避難所まで行く</button>'
  });
  infowindow.open(map, marker);
}

// ルート案内する関数
function calculateAndDisplayRoute(directionsService, directionsRenderer, lat, lng) {
  directionsService.route(
    {
      origin: {
        lat: lat, // jsonデータを直接指定することができなかった
        lng: lng　// jsonデータを直接指定することができなかった
      },
      destination: {
        lat: 35.495619,　// jsonデータを直接指定することができなかった
        lng: 139.670701　// jsonデータを直接指定することができなかった
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