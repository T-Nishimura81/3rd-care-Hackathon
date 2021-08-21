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

// 現在地の取得
class UseGeolocation {
  // async function 内で実行すると「{lat: lat, lng: lng}が返ってくる 
  async getLatLng(){
    const main = new Promise((resolve) => {
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

    return main;
  }
}

// マーカーを生成する関数
class UseMarker {
  deploingMarkerAndAttention(initial_location, pin_img_path){
    if (
      pin_img_path == null ||
      pin_img_path == undefined ||
      pin_img_path == ''
    ) {
      pin_img_path = "../data/person.png";
    }

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: initial_location,
      disableDefaultUI: true
    });

    const marker = new google.maps.Marker({
      position: initial_location,
      map: map,
      icon: new google.maps.MarkerImage(
        pin_img_path,
        new google.maps.Size(48, 48),
        new google.maps.Point(0, 0)
      )
    });

    // googleMapのcenterを変更する
    map.setCenter(new google.maps.LatLng(initial_location));

    return [map, marker];
  }

  deploingMarker(map, coordinate, iconImgPath, marker) {
    marker = new google.maps.Marker({
      position: coordinate,
      map: map,
      icon: new google.maps.MarkerImage(
        iconImgPath,
        new google.maps.Size(48, 48),
        new google.maps.Point(0, 0)
      )
    });
  }

  close(marker) {
    marker.setMap(null);
  }
};

// 情報ウィンドウを生成する関数
class UseInfoWindow {
  async open(map, marker, initial_location, pop_design_html) {
    const main = new Promise(resolve => {
      if (
        pop_design_html == null ||
        pop_design_html == undefined ||
        pop_design_html == ''
      ) {
        pop_design_html =
        '<div id="pre_loc_div">'+
          '<button id="pre_loc" class="btn btn-primary">現在地から避難所まで行く</button>'+
        '</div>';
      }
  
      let infoWindow = new google.maps.InfoWindow({
        position: initial_location,
        content: pop_design_html
      });
  
      infoWindow.open(map, marker);
      return resolve(infoWindow);  
    });
 
    return main;
  }

  allocation(map, markers, html) {
    for(let i = 0; markers.length < i; i++) {
      const infowindw = new google.maps.InfoWindow({
        content: html
      });

      markers[i].addListener('click', () => {
        infowindw.open(map, markers[i]);
      });
    }
  }

  close(infoWindow) {
    infoWindow.close();
  }
}

// MutationObserver
// マップの生成を検知
class UseMutationObserver {
  async return(name) {
    const main = new Promise(resolve => {
      const mutationTarget = document.querySelector('#map');

      const mutatoinConf = {
        childList: true,
        subtree: true
      };
  
      const observer = new MutationObserver(function() {
          const node = document.querySelector('"' + name + '"');
          observer.disconnect()
          return resolve(node);
        }
      );
  
      observer.observe(mutationTarget, mutatoinConf);
    });
 
    return main;
  }

  mutationMap(map) {
    const main = new Promise(
      resolve => {
        const mutationTarget = document.querySelector('#map');

        const mutatoinConf = {
          childList: true,
          subtree: true
        };
    
        const observer = new MutationObserver(function() {
            observer.disconnect()
            addMapUI(map)
          }
        );
    
        observer.observe(mutationTarget, mutatoinConf);  
      }
    )

    return main;
  }
}

// ルート案内する関数
class UseDirection {
  route(directionsService, directionsRenderer, origin, destination) {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
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
  }
}

async function addMapUI(map) {
  const UI = document.createElement('img');
  const mapUI = document.createElement('div');

  mapUI.style.paddingRight = "2.5%";
  mapUI.id = 'mapUI';

  UI.src = "../data/location.png";
  UI.style.backgroundColor = "white";
  UI.width = 40;
  UI.height = 40;
  UI.style.cursor = "pointer";

  mapUI.appendChild(UI);

  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(mapUI);

  mapUI.addEventListener("click", (async () => {
    const classGeolocation = new UseGeolocation();
    const classMarker = new UseMarker();
    const classInfoWindow = new UseInfoWindow();
    const classDirection = new UseDirection();

    let initial_location = await classGeolocation.getLatLng();
    const marker = classMarker.set(initial_location);
    let infoWindow_ = await classInfoWindow.open(marker[0], marker[1], initial_location);
    
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setOptions({
      preserveViewport: false
    });
    directionsRenderer.setMap(marker[0]);
    const pin_locations = ({
      lat: 35.495675,
      lng: 139.67078  
    });
  
    classDirection.route(directionsService, directionsRenderer, initial_location, pin_locations)

    console.log(map.getZoom(), map.getCenter());
  }));
}

function setUpKaigoHackMap(initial_location, pin_img_path,pop_design_html, pin_names, pin_locations) {
  const classMarker = new UseMarker();
  const classInfoWindow = new UseInfoWindow();
  const classDirection = new UseDirection();

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setOptions({
    preserveViewport: false
  });

  let marker = classMarker.deploingMarkerAndAttention(pin_locations, pin_img_path);
  let infowindow = classInfoWindow.open(marker[0], marker[1], pin_locations, pop_design_html);

  directionsRenderer.setMap(marker[0]);
  classDirection.route(directionsService, directionsRenderer, initial_location, pin_locations);

  addMapUI(marker[0])
}

// ユーザの現在地を観測し、それをmap上に表示する関数
function currentLocationTracking(map) {
  const classMarker = new UseMarker();

  navigator.geolocation.watchPosition((
    position => {
      const coordinate = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      const iconImgPath = "../data/person.png";

      let marker = classMarker.deploingMarker(map, coordinate, iconImgPath);
    }),
    (error => {
      console.log(error.message);
    }),
    (() => {
      const opt = {
        'enableHighAccuracy': false,
        'timeout': 100,
        'maxinumAge': 100
      };
    })
  )
}

// mapを生成するための非同期コールバック関数
async function initMap() {
  // 初期マップの生成
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: {
      // 神奈川県の中心座標(目測)
      lat: 35.4514441427883,
      lng: 139.36231169109772
    },
    streetViewControl: false
  });

  const classGeolocation = new UseGeolocation();
  const classMutationObserver = new UseMutationObserver();

  addMapUI(map)

  let initial_location = await classGeolocation.getLatLng();
  let pin_img_path;
  let pop_design_html;
  let pin_names;
  let pin_locations = ({
    lat: 35.495675,
    lng: 139.67078
  });
  
  // setUpKaigoHackMap(
  //   initial_location,
  //   pin_img_path,
  //   pop_design_html,
  //   pin_names,
  //   pin_locations
  // )

  currentLocationTracking(map)
}