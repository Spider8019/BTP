import React, { useState, useRef, useEffect } from "react";
import { loadModules } from "esri-loader";
import Loader from "../components/loaders/Loader";
// import esriConfig from "@arcgis/core/config";
import { useLocation } from "react-router-dom";
import { liveDevices } from "../global/api";

export default function Home({ ...props }) {
  const MapElement = useRef(null);
  const location = useLocation();
  const [color, setcolor] = useState(new Array(50).fill("#"+Math.floor(Math.random()*16777215).toString(16)))
  useEffect(() => {
    let view;
    (async () => {
      loadModules(
        [
          "esri/config",
          "esri/views/MapView",
          "esri/WebMap",
          "esri/Graphic",
          "esri/geometry/Point",
          "esri/core/watchUtils",
        ],
        {
          css: true,
        }
      ).then(
        async ([esriConfig, MapView, WebMap, Graphic, Point, watchUtils]) => {
          esriConfig.apiKey =
            "AAPK389b4ad7e0a84099a61965ae0b29053aC4qbMFfECsOFO_Bd5fivHgb-dEM5ymAAV2YB-fDnpzqXQxdnV-2yU5ENDW59ewwF";
          //   final = await gettingLatestShip({});
          //   console.log(final);
          // const {data:res} = await liveDevices({});
          // setFinal(res)
          const webmap = new WebMap({
            //basemap: "satellite"
            // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
            basemap: "topo-vector",
          });
          var view = new MapView({
            map: webmap,
            // center: [res[0].longitude, res[0].latitude],
            center: [0, 0],
            zoom: 3,
            container: MapElement.current,
          });

          const interval = setInterval(() => {
            liveDevices({}).then(data => {
              console.log(data)
              const {data:res}=data
              let popupTemplate = {
                title: "{Name}",
                content: "{Description}",
              };
              res && res.forEach((item,idx) => {
                var point_symbol = new Point({
                  longitude: item.longitude,
                  latitude: item.latitude,
                  spatialReference: { wkid: 3857 },
                });
                // let temp = res.fishing_type_data.filter((x) => {
                //   return x.ship === item.ship.mmsi;
                // });
                // console.log(temp);
                // console.log()
                var graphic_symbol = new Graphic({
                  geometry: point_symbol,
                  symbol: {
                    type: "simple-marker",
                    style: "circle",
                    color: color[idx],
                    // t
                    size: "28px",
                    outline: {
                      color: "white",
                      width: 1,
                    },
                  },
                  attributes: {
                    Name: `<b>${item.convoyId.device.deviceName}-${item.convoyId.device.deviceId}</b>`,
                    Description: `<div>Longitude: ${item.longitude}<br/>Latitude: ${item.latitude}<br/>Vehicle: ${item.convoyId.vehicle.vehicleModel} ${item.convoyId.vehicle.vehicleCompany} (${item.convoyId.vehicle.vehicleNumber})<br/>Timestamp: ${item.timeStamp}<br/>Vehicle Position: ${item.convoyId.vehiclePosition}<br/>Deployed: ${item.convoyId.device.deployed?"Yes":"No"}</b>`,
                  },
                  popupTemplate,
                });
                view.graphics.add(graphic_symbol);
              });
              watchUtils.whenTrue(view, "updating", function (evt) {
                if (document.getElementById("loaderElement"))
                  document.getElementById("loaderElement").style.display = "block";
              });
    
              // Hide the loading indicator when the view stops updating
              watchUtils.whenFalse(view, "updating", function (evt) {
                if (document.getElementById("loaderElement"))
                  document.getElementById("loaderElement").style.display = "none";
              });
            })
          }, 10000);
          return () => clearInterval(interval);
        }
      );
    })();

    return () => {
      if (!!view) {
        view.destroy();
        view = null;
      }
    };
  }, [location.query]);

  return (
    <div>
      <div className="flex relative">
        <div className="w-full">
          <div
            className="mapLayer relative"
            style={{ height: "calc(100vh - 136px)", width: "100vw" }}
            ref={MapElement}
          >
            <div id="loaderElement" className="loadingMap">
              <Loader text="Fetching data and initiating the GIS" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
