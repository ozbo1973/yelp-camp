//determines which page to show as active on navbar

module.exports = page => {
  const pages = {
    home: "",
    profile: "",
    login: "",
    signup: ""
  };
  pages[page] = "active";

  return pages;
};
