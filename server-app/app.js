const express = require("express");
const fs = require("fs");
const Path = require("path");
const { parse } = require("json2csv");

const fields = ["tradingParty", "counterParty", "amount"];
const opts = { fields };

var app = express();
var cors = require("cors");

const port = 8000;
const path = Path.join(__dirname + "/mockDB", "mockDB.json");
const pathFolder = Path.join(__dirname + "/mockDB");

// Cores for localHost
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.end(`<h1>Hello from Yaniv Suriyano server...</h1>`);
});

app.get("/getData", async function (req, res) {
  console.log("read Data from mockJSON");
  const command = path.replace(/\\/g, "/");
  await fs.access(command, function (err) {
    if (err) {
      console.log("Start Create a new Folder + File ...");
      fs.mkdir(pathFolder, function (err) {
        if (err) {
          console.log("There is a problem with create the folder");
          console.log(`error => ${err}`);
        } else {
          console.log("Dir Created...");
          console.log("Start create MOCKDB file...");
          const mockDB = require("./mockDB");
          fs.writeFile(
            "./mockDB/mockDB.json",
            JSON.stringify(mockDB),
            "utf8",
            function (err) {
              if (err) {
                console.log(
                  "An error occured while writing JSON Object to File."
                );
              }
              console.log("JSON file has been saved.");

              res.status(201).json(mockDB);
            }
          );
        }
      });
    } else {
      console.log("read File...");
      let transcations = JSON.parse(fs.readFileSync(command, "utf8"));
      res.status(200).json(transcations);
    }
  });
});

app.put("/addLine", function (req, res) {
  console.log(`get new line to add...`);
  // Read File
  const command = path.replace(/\\/g, "/");
  let transcations = JSON.parse(fs.readFileSync(command, "utf8"));
  console.log(transcations);
  const newLine = {
    tradingParty: "me",
    counterParty: req.body.name,
    amount: req.body.amount,
  };
  transcations.mockDB[transcations.mockDB.length] = newLine;

  fs.writeFile(
    "./mockDB/mockDB.json",
    JSON.stringify(transcations),
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
      }
      console.log("JSON file has been saved.");
    }
  );
  res.status(200).json({ newLine });
  res.end();
});

app.post("/sendCompress", function (req, res) {
  console.log("Start to create compress file...");
  console.log("read File...");
  const command = path.replace(/\\/g, "/");
  let transcations = JSON.parse(fs.readFileSync(command, "utf8"));
  const compressResult = compress(transcations);
  console.log(compressResult);
  let csvFormant = [];
  compressResult.forEach((line) => {
    csvFormant.push(line.tradingParty, line.counterParty, line.amount);
  });
  console.log("create CSV file to send...");
  try {
    const csv = parse(compressResult, opts);
    console.log(csv);
    // write CSV to a file
    fs.writeFileSync("file.csv", csv);
    res.header("Content-Disposition", "attachment;filename=file.csv");
    res.sendFile(Path.join(__dirname, "\\file.csv"));
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Server listen to port ${port}...`);
});

function compress(data) {
  let compressMap = [];
  if (data) {
    for (let i = 0; i < data.mockDB.length; i++) {
      let isFound = false;
      compressMap.forEach((line) => {
        if (line.counterParty === data.mockDB[i].counterParty) {
          line.amount += parseInt(data.mockDB[i].amount);
          isFound = true;
        }
      });
      if (!isFound) {
        let newLineToCompress = {
          tradingParty: "me",
          counterParty: data.mockDB[i].counterParty,
          amount: parseInt(data.mockDB[i].amount),
        };
        compressMap.push(newLineToCompress);
      }
    }
  }
  return compressMap;
}

process.on("uncaughtException", function (err) {
  console.log(`Error => ${err} \n Server still alive =) ...`);
});
