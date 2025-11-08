// server.js
import express from "express";
import path from "path";
import compression from "compression";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const dist = path.join(__dirname, "dist");

// gzip responses
app.use(compression());

// serve static files
app.use(express.static(dist, { extensions: ["html"] }));

// history fallback – serve index.html for any non-file route
app.get("*", (_, res) => res.sendFile(path.join(dist, "index.html")));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Frontend listening on ${port}`);
});
