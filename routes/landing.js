module.exports = app => {
  //Routes
  app.get("/", (req, res) => {
    res.render("landing", { page: "landing" });
  });
};
