const homeController = {};

homeController.home = async function (req, res) {
  res.render("home", { userProfile: req.user, title: "Home" });
};

module.exports = homeController;
