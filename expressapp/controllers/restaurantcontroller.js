const db = require("../models");

module.exports = {
findAll: function (req, res) {
    db.Restaurant.find(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
    create: function (req, res) {
      db.Restaurant.create(req.body)
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    },

    findOne: function (req, res) {
        db.Restaurant.findById({ _id: req.params.id })
          .then((dbModel) => res.json(dbModel))
          .catch((err) => res.status(422).json(err));
      },
   

    updateRestaurant: function(req, res) {
        const id = req.params.id;
      
        db.Restaurant.findByIdAndUpdate(id, req.body).
            then((result) => {
                if (result) {
                    res.status(200).send({ message: 'updated' })
                }
                else {
                    res.status(404).send({ message: 'not found' })
                }
            })
            .catch((error) =>
                res.status(404).send({ message: 'not found' }));
      }
}
