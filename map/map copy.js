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

function initMap() {
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
  addMapUI(map, directionsService, directionsRenderer)

  // let initial_location = [];
  // let pin_img_path = '';
  // let pin_names = [];
  // let pin_locations = []; 
  // setUpKaigoHackMap(initial_location, info_html, pin_img_path, pin_names, pin_locations)
}

// カスタムUIの追加
async function addMapUI(map, directionsService, directionsRenderer) {
  const UIbg = document.createElement('div');
  const UI = document.createElement('img');

  UIbg.style.paddingRight = "2.5%";

  UI.src = "../data/location.png";
  UI.style.backgroundColor = "white";
  UI.width = 40;
  UI.height = 40;
  UI.style.cursor = "pointer";
  UIbg.appendChild(UI);

  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(UIbg);

  UIbg.addEventListener("click", async () => {
    let initial_location = await geolocationCM()
    markerGenerate(map, initial_location)
  });
}

// 現在地の取得
// 「変数名 = await geolocation()」をasync func 内で実行すると「[{lat: lat, lng: lng}」が返ってくる 
async function geolocationCM(){
  let latlng = new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          return resolve({
            lat: lat,
            lng: lng
          });
        }
      );
    }
  });
  let initial_location = await latlng;
  return initial_location;
}

// マーカーを生成する関数
function markerGenerate(map, initial_location) {

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: initial_location
  })

  let marker = new google.maps.Marker({
    position: initial_location,
    map: map,
    icon: new google.maps.MarkerImage(
      "../data/person.png",
      new google.maps.Size(48, 48),
      new google.maps.Point(0, 0)
    )
  })
  marker.setMap(map);

  // googleMapのcenterを変更する
  map.setCenter(new google.maps.LatLng(initial_location));

  // googleMapのcenterを変更するとUIが消えるので再追加する
  addMapUI(map)
  infowindowGenerate(map, marker, initial_location)
};

// 情報ウィンドウを生成する関数
function infowindowGenerate(map, marker, initial_location) {
  let info_html =
  '<div id="pre_loc_div">'+
    '<button id="pre_loc" class="btn btn-primary">現在地から避難所まで行く</button>'+
  '</div>'
  let infowindow = new google.maps.InfoWindow({
    position: initial_location,
    content: info_html
  });

  infowindow.open(map, marker);

  // MObsever(map, marker, infowindow, directionsService, directionsRenderer, lat, lng)
}

// MutationObserver
// マップの生成を検知
function MObsever(map, marker, infowindow, directionsService, directionsRenderer, initial_location) {

  let MTarget = document.querySelector("#map");

  const MConf = {
    childList: true,
    subtree: true
  };

  const observer = new MutationObserver(function (){
    MTarget = document.querySelector("#pre_loc");

    if (MTarget) {
      observer.disconnect();
      MTarget.addEventListener("click", () => {
        directionsRenderer.setMap(map);
        directionsRenderer.setPanel(document.querySelector("#route"));
        calculateAndDisplayRoute(directionsService, directionsRenderer, initial_location, marker, infowindow)
      }, false);
    }
  });
  
  observer.observe(MTarget, MConf);
}

// ルート案内する関数
function calculateAndDisplayRoute(directionsService, directionsRenderer, initial_location, marker, infowindow) {
  infowindow.close();
  marker.setMap(null);
  directionsService.route(
    {
      origin: initial_location,
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

function setUpKaigoHackMap(initial_location,pin_img_path,pop_design_html,pin_names,pin_locations){}