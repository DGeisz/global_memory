// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Globe from "react-globe.gl";
import countries from "./geojson/countries.json";

function App() {
  // const globeEl = useRef<HTMLDivElement | null>(null);

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      // arcsData={[
      //   {
      //     startLat: 48.8566,
      //     startLng: 2.3522,
      //     endLat: 35.6895,
      //     endLng: 139.6917,
      //   },
      //   {
      //     startLat: 35.6895,
      //     startLng: 139.6917,
      //     endLat: 23.6345,
      //     endLng: -102.5528,
      //   },
      //   {
      //     startLat: 23.6345,
      //     startLng: -102.5528,
      //     endLat: 48.8566,
      //     endLng: 2.3522,
      //   },
      // ]}
      polygonsData={countries.features
        .filter((d) => d.properties.ISO_A2 !== "AQ")
        .slice(0, 10)}
      polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
      polygonStrokeColor={() => "#111"}
      arcDashAnimateTime={100}
      arcDashGap={4}
    />
  );
}

export default App;
