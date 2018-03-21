//Router middleware

module.exports = (name, home) => {
  home = home || name;
  const routePath = {
    home: home,
    homeDir: "/" + home,
    homeDirID: "/" + home + "/:id",
    name: name,

    //restful routes abbrv
    rt: function(restFull, strID) {
      strID = strID || "id";
      const route = {
        index: "/" + name,
        create: "/" + name,
        new: "/" + name + "/new",
        edit: "/" + name + "/:" + strID + "/edit",
        show: "/" + name + "/:" + strID,
        update: "/" + name + "/:" + strID,
        destroy: "/" + name + "/:" + strID
      };
      return route[restFull];
    },

    //views
    view: function(restFull) {
      return name + "/" + restFull;
    },

    //redirects
    redirectUpdate: function(id) {
      return "/" + home + "/" + id;
    },
    redirectHome: function(id) {
      if (id) {
        return "/" + home + "/" + id;
      }
      return "/" + home;
    }
  };
  return routePath;
};
