
const {validationResult} = require('express-validator');
const db = require('../database/models')


module.exports = {
  add: (req, res) => {
    db.products
      .findAll()
      .then((product) => {
        return res.render("productAdd", {
          products,
          categories,
          origenes,
          sections,
        });
      })
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    db.products
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { association: "category" },
          { association: "section" },
          { association: "origen" },
          { association: "imagen" },
          { association: "products" },
        ],
      })
      .then((products) => {
        return res.render("productDetail", {
          products,
          product,
          origenes,
          section,
        });
      })
      .catch((error) => console.log(error));
  },
  loading: (req, res) => res.render("productLoading"),
  save: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const { title, description, price, category, origen, section } = req.body;
      if (req.files) {
      }
    }
  },
};
