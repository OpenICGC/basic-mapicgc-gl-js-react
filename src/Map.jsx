
  import  { useRef, useEffect, useState } from 'react';
  import {Map, Config} from 'mapicgc-gl-js';
  import "../node_modules/mapicgc-gl-js/dist/mapicgc-gl.css";
  import './map.css';
  
  export default function MapICGC() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom] = useState(10);
  
    useEffect( () => {
      if (map.current) return; 

      async function initMap(){
      const data= await Config.getConfigICGC();
      map.current = new Map({
        container: mapContainer.current,
        hash: true,
        pitch: 0,
        style: data.Styles.TOPO,
        center: [1.808, 41.618],
        zoom: zoom
        
      });
    }
    initMap();
    }, [1.808, 41.618, zoom]);
  
    return (
      <div className="map-container">
        <div ref={mapContainer} className="map" />
      </div>
    );
  } 