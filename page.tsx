"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* Use CDN icons to avoid bundler issues */
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function ClickPicker({ onPick }: { onPick: (coords: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("bigfoot");
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState<[number, number] | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // For now: console + alert. Later connect to Supabase/Firebase
    console.log({ title, cat, desc, loc });
    alert("Report submitted (demo). Next step: hook up DB/auth.");
    setTitle(""); setDesc(""); setLoc(null);
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-green-300">Report a Sighting</h2>

        <form onSubmit={submit} className="space-y-3">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-3 bg-[#071018] border border-gray-700 rounded" required />
          <select value={cat} onChange={e=>setCat(e.target.value)} className="w-full p-3 bg-[#071018] border border-gray-700 rounded">
            <option value="bigfoot">Bigfoot / Sasquatch / Yeti</option>
            <option value="ufo">UFO / UAP</option>
            <option value="alien">Alien Encounter</option>
            <option value="paranormal">Other Paranormal</option>
          </select>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" rows={5} className="w-full p-3 bg-[#071018] border border-gray-700 rounded" required />
          <div className="small-mono text-gray-400">Click the map on the right to place the sighting location.</div>

          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-green-600 rounded text-black font-semibold">Submit</button>
            <button type="button" onClick={()=>{ setLoc(null); setTitle(""); setDesc(""); }} className="px-4 py-2 border rounded text-gray-200">Reset</button>
          </div>
        </form>

        <div className="mt-3 small-mono text-xs text-gray-400">
          NOTE: This demo saves to memory only. We'll wire real DB & auth next (Supabase is recommended).
        </div>
      </div>

      <div className="h-[60vh] rounded overflow-hidden border border-gray-800">
        <MapContainer center={[39.5,-98.35]} zoom={4} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" subdomains={["a","b","c","d"]} />
          <ClickPicker onPick={(c)=>setLoc(c)} />
          {loc && <Marker position={loc} />}
        </MapContainer>
      </div>
    </div>
  );
}
