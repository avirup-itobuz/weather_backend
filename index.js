import express from "express";
import weatherData from "./data.js";
import fs from "fs";
const app = express();
// console.log(weatherData)
const port = 3001;

app.use(express.json());

app.get("/api/getData/:location", (req, res) => {
  const searchParam = req.params.location;
  let data = 0;
  weatherData.forEach((loc) => {
    if (loc.name.toLowerCase() === searchParam.toLowerCase()) {
      data = loc;
      return;
    }
  });
  if (data) {
    console.log(data);
    res.json({ data: data, status: 200, message: "success" });
  } else {
    res.json({ data: "null", status: 404, message: "data not found" });
  }
});
app.post("/api/writeData", (req, res) => {
  // weatherData = [...weatherData, req.body];
  weatherData.push(req.body);
  console.log(weatherData);
  res.end();
  //   fs.writeFile("data.js", weatherData, (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("success");
  //     }
  //   });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
