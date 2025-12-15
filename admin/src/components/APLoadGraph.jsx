import React, { useEffect, useState, useRef } from "react";
import { getAPLoad } from "../api/oc200";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function flattenForChart(apList) {
  // create a series of { name: apName, rx: rxKbps, tx: txKbps } per AP
  return apList.map(ap => ({
    apName: ap.apName,
    rx: ap.rxKbps,
    tx: ap.txKbps,
    clients: ap.clientCount
  }));
}

export default function APLoadGraph() {
  const [aps, setAps] = useState([]);
  const [history, setHistory] = useState([]);
  const polling = useRef(null);

  const load = async () => {
    try {
      const resp = await getAPLoad();
      if (resp.data && resp.data.data) {
        setAps(resp.data.data);
        // keep short history window for chart (last 12 samples)
        const sample = { ts: resp.data.ts, points: flattenForChart(resp.data.data) };
        setHistory(h => {
          const next = [...h, sample].slice(-12);
          return next;
        });
      }
    } catch (e) {
      console.error("APLoad load err", e);
    }
  };

  useEffect(() => {
    load();
    polling.current = setInterval(load, 5000);
    return () => clearInterval(polling.current);
  }, []);

  // Build chart data for the first AP as an example (expandable)
  // We'll show stacked small charts: for each AP show a small LineChart
  return (
    <div style={{ padding: 20 }}>
      <h2>AP Load Graph (Live)</h2>
      <p>Auto-refresh every 5s. Shows rx/tx (kbps) and client count.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        {aps.map((ap, idx) => {
          // Build series for this AP from history
          const chartData = history.map(h => {
            const found = h.points.find(p => p.apName === ap.apName);
            return {
              time: new Date(h.ts).toLocaleTimeString(),
              rx: found ? found.rx : 0,
              tx: found ? found.tx : 0,
              clients: found ? found.clients : 0
            };
          });

          return (
            <div key={ap.apMac} style={{ border: "1px solid #eee", padding: 12, borderRadius: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <strong>{ap.apName}</strong> — {ap.apMac} {ap.apIP ? `(${ap.apIP})` : ""}
                </div>
                <div style={{ fontSize: 13 }}>
                  Clients: <strong>{ap.clientCount}</strong> • RX: <strong>{ap.rxKbps} kbps</strong> • TX: <strong>{ap.txKbps} kbps</strong>
                </div>
              </div>

              <div style={{ height: 180, marginTop: 8 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" hide />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rx" stroke="#8884d8" dot={false} name="RX (kbps)" />
                    <Line type="monotone" dataKey="tx" stroke="#82ca9d" dot={false} name="TX (kbps)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
