import React, { useState, useRef, useEffect } from "react";
import { loadModules } from "esri-loader";
import Loader from "../components/loaders/Loader";
// import esriConfig from "@arcgis/core/config";
import { useLocation } from "react-router-dom";

export default function Home({ ...props }) {
  const MapElement = useRef(null);
  const location=useLocation()

  let res;
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
        //   res = await gettingLatestShip({});
        //   console.log(res);

          const webmap = new WebMap({
            //basemap: "satellite"
            // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
            basemap: "topo-vector",
          });
          var view = new MapView({
            map: webmap,
            center: [-0.001545, 51.477928],
            zoom: 3,
            container: MapElement.current,
          });

          const res=[{
            longitude:0,
            latitude:0
          }]
          let popupTemplate = {
            title: "{Name}",
            content: "{Description}",
          };
          res.forEach((item) => {
            var point_symbol = new Point({
              longitude: item.longitude,
              latitude: item.latitude,
              spatialReference: { wkid: 3857 },
            });
            // let temp = res.fishing_type_data.filter((x) => {
            //   return x.ship === item.ship.mmsi;
            // });
            // console.log(temp);
            var graphic_symbol = new Graphic({
              geometry: point_symbol,
              symbol: {
                type: "simple-marker",
                style: "circle",
                color:"orange",
                // t
                size: "28px",
                outline: {
                  color: "white",
                  width: 1,
                },
              },
              attributes: {
                Name: `<b>MMSI ${item.longitude}</b>`,
                Description: `<div>Longitude: ${item.longitude}<br/>Latitude: ${item.latitude}</b><div style="margin-top:2rem"></div></div></div>`,
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
              <Loader text="Fetching data and initiating the GIS"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
