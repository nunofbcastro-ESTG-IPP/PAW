const mongoose = require('mongoose');

const Sale = require('../../models/sale');

const saleController = {};

saleController.getAllSales = function (req, res) {
  const { page, search } = req.query;
  let query = { $and: [{ state: 'Active' }] };

  const myCustomLabels = {
    docs: 'sales',
  };

  const options = {
    page: page != undefined && !isNaN(page) ? page : 1,
    limit: 10,
    customLabels: myCustomLabels,
  };

  Sale.paginate(query, options, function (err, result) {
    if (err) {
      console.log('Error:', err);
    } else {
      result.title = 'List Sales';
      result.userProfile = req.user;
      res.render('../views/books/listSales', result);
    }
  });
};

saleController.showSale = function (req, res) {
  const { id } = req.params;
  Sale.findOne({ _id: id }).exec(function (err, sale) {
    if (err) {
      res.redirect('/404');
    } else {
      res.render('../views/books/showSale', {
        userProfile: req.user,
        sale: sale,
        title: 'Show Sale',
      });
    }
  });
};

saleController.changeStatus = function (req, res) {
  Sale.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        status: req.params.status,
      },
    },
    { new: true },
    function (err) {
      if (err) {
        res.redirect('/404');
      }
      res.redirect('/book/listSales/');
    }
  );
};

module.exports = saleController;
