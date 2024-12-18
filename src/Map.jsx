
  import { useRef, useEffect} from 'react';
import { Map, Config } from 'mapicgc-gl-js';
import '../node_modules/mapicgc-gl-js/dist/mapicgc-gl.css';
import './map.css';

export default function MapICGC() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Prevent re-initialization

    async function initMap() {
      const data = await Config.getConfigICGC();

      // Initialize the map
      map.current = new Map({
        container: mapContainer.current,
        hash: true,
        pitch: 0,
        style: data.Styles.TOPO,
        center: [1.808, 41.618],
        zoom: 10,
      });

      // Add controls and layers once the map has loaded
      map.current.on('load', () => {
        // Add controls only if they haven't been added yet
        if (!map.current.geocoderAdded) {
          map.current.addGeocoderICGC();
          map.current.geocoderAdded = true; // Custom property to track addition
        }

        if (!map.current.geolocateControlAdded) {
          map.current.addGeolocateControl(
            {
              positionOptions: {
                enableHighAccuracy: true,
              },
              trackUserLocation: true,
            },
            'bottom-right'
          );
          map.current.geolocateControlAdded = true; // Track addition
        }

        if (!map.current.exportControlAdded) {
          map.current.addExportControl({}, 'top-right');
          map.current.exportControlAdded = true; // Track addition
        }

        if (!map.current.fullscreenControlAdded) {
          map.current.addFullscreenControl({}, 'top-right');
          map.current.fullscreenControlAdded = true; // Track addition
        }

        if (!map.current.terrainLayerAdded) {
          map.current.addTerrainICGC(data.Terrains.WORLD30M, 'bottom-right');
          map.current.terrainLayerAdded = true; // Track addition
        }
      });
    }

    initMap();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="map-container">
      <div ref={mapContainer} className="map" />
    </div>
  );
}