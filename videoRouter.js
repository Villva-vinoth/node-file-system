const router = require("express").Router();
const fs = require("fs");

router.get("/", async (req, res) => {
  try {
    const file = await fs.promises.stat("./videoFile/video.mp4");
    const range = req.headers.range;
    console.log("range", range);
    if (!range) {
      throw new Error("Range is Missing !");
    }

    const videoSize = file.size;
    const position = range.replace(/bytes=/, "").split("-");
    const start = Number(position[0]);
    // const chunk = 10**6; // 1mb size
    // const end = Math.min(start+chunk,videoSize-1)
    const end = position[1] ? Number(position[1]) : videoSize - 1;

    if (start >= videoSize || end >= videoSize) {
        throw new Error("Requested range not satisfiable. File size is ${videoSize} bytes.");
      }

    const chunkSize = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
    };

    console.log("st", start, "ed", end, videoSize);
    const fileStream = fs.createReadStream("./videoFile/video.mp4", {
      start,
      end,
    });
    res.writeHead(206, headers);
    fileStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({
      message: "Having Error ! " + error,
    });
  }
});

module.exports = router;
