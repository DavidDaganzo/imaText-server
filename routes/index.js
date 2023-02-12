module.exports = app => {
  app.use("/api", require("./index.routes"));
  app.use("/api/generate-image", require("./openia.routes"))
}