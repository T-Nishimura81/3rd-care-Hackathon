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

/**
 * 現在地の取得に関するclass
 */
class Geolocation {
  async getCurrentLocation() {
    const main = new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

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

/**
 * markerに関するclass
 */
class Marker {
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

  /**
   * [{ lat: number, lng: number }]
   * @param {object} map 
   * @param {number[]} coordinate 
   * @param {string} iconImgPath 
   */
  async open(map, coordinate, iconImgPath) {
    const main = new Promise(
      resolve => {
        let markers = [];

        for (let i = 0; i < coordinate.length; i++) {
          const marker  = new google.maps.Marker({
            map: map,
            position: coordinate[i],
            icon: iconImgPath
          });

          markers.push(marker);
        }
    
        return resolve(markers);
      }
    )

    return main;
  };
}

/**
 * infowindowに関するclass
 */
class InfoWindow {
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

  allocation(coordinate, htmlToDisplay, map, markers) {
    for (let i = 0; i < markers.length; i++) {
      const infowindow = new google.maps.InfoWindow({
        position: coordinate,
        content: htmlToDisplay[i]
      });

      markers[i].addListener("click", () => {
        infowindow.open(map, markers[i]);
      });
    }
  }

  close(infoWindow) {
    infoWindow.close();
  }
}

/**
 * MutationObserverを利用するclass
 */
class MutationObserver {
  async return(name) {
    const main = new Promise(resolve => {
      const mutationTarget = document.querySelector('#map');

      const mutationConf = {
        childList: true,
        subtree: true
      };
  
      const observer = new MutationObserver(function() {
          const node = document.querySelector('"' + name + '"');
          observer.disconnect()
          return resolve(node);
        }
      );
  
      observer.observe(mutationTarget, mutationConf);
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

/**
 * ルート案内に関するclass
 */
class Direction {
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

// function setUpKaigoHackMap(initial_location, pin_img_path,pop_design_html, pin_names, pin_locations) {
//   const classMarker = new Marker();
//   const classInfoWindow = new Infowindow();
//   const classDirection = new Direction();

//   const directionsService = new google.maps.DirectionsService();
//   const directionsRenderer = new google.maps.DirectionsRenderer();
//   directionsRenderer.setOptions({
//     preserveViewport: false
//   });

//   let marker = classMarker.deploingMarkerAndAttention(pin_locations, pin_img_path);
//   let infowindow = classInfoWindow.open(marker[0], marker[1], pin_locations, pop_design_html);

//   directionsRenderer.setMap(marker[0]);
//   classDirection.route(directionsService, directionsRenderer, initial_location, pin_locations);

//   addMapUI(marker[0])
// }

/**
 * map上に避難所または危険地点を出力する
 * @param {number[]} initial_location
 * @param {string} pin_img_path
 * @param {string} pop_design_html 
 * @param {string[]} pin_names 
 * @param {number[]} pin_locations 
 */
async function setUpKaigoHackMap(
  initial_location,
  pin_img_path,
  pop_design_html,
  pin_names,
  pin_locations,
  map
) {
  const class_Marker = new Marker();
  const class_Infowindow = new InfoWindow();

  const markers = await class_Marker.open(map, pin_locations, pin_img_path);

  class_Infowindow.allocation(pin_locations, pop_design_html, map, markers);
}

/**
 * ユーザの現在地を追跡表示し続ける関数
 */
function currentLocationTracking(map) {
  const classMarker = new Marker();

  navigator.geolocation.watchPosition((
    position => {
      const coordinate = [
        {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      ];

      const iconImgPath = "../data/person.png";

      const markerOpen = classMarker.open(map, coordinate, iconImgPath);
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

/**
 * mapの右側中央にカスタムUIを追加する関数
 * @param {object} map 
 */
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

  mapUI.addEventListener("click", () => {
    currentLocationTracking(map);
  });
}

/**
 * mapを生成するための非同期コールバック関数
 */
async function initMap() {
  // 初期マップの生成
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: {
      // 推定神奈川県中心座標(目測)
      lat: 35.4514441427883,
      lng: 139.36231169109772
    },
    disableDefaultUI: true
  });

  addMapUI(map)

  const initial_location = 0;

  const pin_img_path = "../data/person.png";

  const pop_design_html = [
    '<div id="pre_loc_div"><button id="pre_loc" class="btn btn-primary">現在地から避難所まで行く</button></div>',
    
    '<div id="pre_loc_div"><button id="pre_loc" class="btn btn-primary">現在地から避難所まで行く</button></div>'
  ];

  const pin_names = 0;
  
  const pin_locations = [
    {
      lat: 35.4514441427883,
      lng: 139.36231169109772
    },
    {
      lat: 35.39824418905391,
      lng: 139.49811992812673
    }
  ];
  
  setUpKaigoHackMap(
    initial_location,
    pin_img_path,
    pop_design_html,
    pin_names,
    pin_locations,
    map
  )

  currentLocationTracking(map);
}