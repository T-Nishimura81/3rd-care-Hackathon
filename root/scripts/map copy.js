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

<<<<<<< Updated upstream
  };
<<<<<<< HEAD
=======
  // カスタムUI追加
  addUI(map)

  // 
  google.maps.event.addListener(map, 'click', event => functionManager(event, map, directionsService, directionsRenderer));
>>>>>>> Stashed changes

  google.maps.event.addListener(map, 'click', event => clickListener(event, map));

<<<<<<< Updated upstream
  directionsRenderer.setMap(map);
=======
  const centerControlDiv = document.createElement("div");
  CenterControl(centerControlDiv, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  // 現在地から避難所までルート案内
  // let dirRoute = document.getElementById('pre_loc');
  // google.maps.event.addListener(dirRoute, 'click', event => );
>>>>>>> Stashed changes

  calculateAndDisplayRoute(directionsService, directionsRenderer);
  
=======
  google.maps.event.addListener(map, 'click', event => functionManager(event, map, directionsService, directionsRenderer));

>>>>>>> future
}

// 関数マネージャ
function functionManager(event, map, directionsService, directionsRenderer) {
  let lat = event.latLng.lat();
  console.log(lat)
  let lng = event.latLng.lng();
  console.log(lng)
<<<<<<< HEAD
<<<<<<< Updated upstream
  const marker = new google.maps.Marker({
    position: {lat, lng},
  });
=======
  let marker = new google.maps.Marker({
    position: {lat, lng}
  });
  
  // // マップをタップ時にマーカーを生成する関数
  // clickListener(event, map, marker)

  // // 情報ウィンドウを生成する関数
  // infowindowGenerate(lat, lng, marker)

  // スマホフレンドリーな情報ウィンドウ
  // mobileInfoWindow(map)

  // ルート案内
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById('directionPanel'));
  calculateAndDisplayRoute(directionsService, directionsRenderer, lat, lng)
}

// カスタムコントロールUIの追加
function addUI(map) {
  const UIcntrl = document.createElement('div');
  const UI = document.createElement('img');

  UI.src = '../data/img/ポイントカーソル.jpeg';
  UI.style.cursor = "pointer";
  UI.width = 40;
  UI.height = 40;

  UIcntrl.appendChild(UI);
  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(UIcntrl);

  UI.style.paddingRight = '10%';
}

function CenterControl(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");
  controlUI.style.backgroundColor = "#fff";
  controlUI.style.border = "2px solid #fff";
  controlUI.style.borderRadius = "3px";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.marginTop = "8px";
  controlUI.style.marginBottom = "22px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to recenter the map";
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement("div");
  controlText.style.color = "rgb(25,25,25)";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "16px";
  controlText.style.lineHeight = "38px";
  controlText.style.paddingLeft = "5px";
  controlText.style.paddingRight = "5px";
  controlText.innerHTML = "Center Map";
  controlUI.appendChild(controlText);
  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener("click", () => {
    map.setCenter(chicago);
  });
}

// 現在地の取得
function geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, option);
    function success(position) {
      let data = position.coords;
      let lat = data.latitude;
      let lng = data.longitude;

      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.Latlng(lat, lng);
      geocoder.geocode({
        'latLng': latlng
      },function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results[0].formatted_address);
        } else {
          alert("エラー：" + status);
        }
      })
    }
  } else {

  }
}

// マップをタップ時にマーカーを生成する関数
function clickListener(event, map, marker) {
>>>>>>> Stashed changes
=======
  let marker = new google.maps.Marker({
    position: {lat, lng},
  });
  // マップをタップ時にマーカーを生成する関数
  clickListener(event, map, lat, lng, marker)
  // 情報ウィンドウを生成する関数
  infowindowGenerate(lat, lng, marker)
  // ルート案内
  directionsRenderer.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsRenderer, lat, lng)
}

// 現在地の取得

// マップをタップ時にマーカーを生成する関数
function clickListener(event, map, lat, lng, marker) {
>>>>>>> future
  marker.setMap(map);
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