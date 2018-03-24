//Router middleware

module.exports = (name, home) => {
  home = home || name;
  const routePath = {
    home: home,
    homeDir: "/" + home,
    homeDirID: "/" + home + "/:id",
    name: name,

    //restful routes fullname
    rt: function(restFull = "index", strID = "id") {
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

    i: "/" + name, //index
    c: "/" + name, //create
    n: "/" + name + "/new", //new
    e: function(strID = "id") {
      return "/" + name + "/:" + strID + "/edit"; //edit
    },
    s: function(strID = "id") {
      return "/" + name + "/:" + strID; //show
    },
    u: function(strID = "id") {
      return "/" + name + "/:" + strID; //update
    },
    d: function(strID = "id") {
      return "/" + name + "/:" + strID; //destroy
    },

    //views
    view: function(restFull) {
      return name + "/" + restFull;
    },

    //redirects
    redirectUpdate: function(id) {
      return "/" + name + "/" + id;
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
