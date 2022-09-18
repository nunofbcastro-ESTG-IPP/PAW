const mongoose = require('mongoose');

const Points = require('../../models/points');

var pointsController = {};

pointsController.list = function (req, res) {
  if (typeof req.user == 'undefined') {
    return res.redirect('/404');
  }

  const { page } = req.query;
  let query = {};

  const myCustomLabels = {
    docs: 'points',
  };

  const options = {
    page: page != undefined && !isNaN(page) ? page : 1,
    limit: 10,
    customLabels: myCustomLabels,
  };

  Points.paginate(query, options, function (err, result) {
    if (err) {
      console.log('Error:', err);
    } else {
      result.title = 'List Points';
      result.userProfile = req.user;
      res.render('../views/points/listPoints', result);
    }
  });
};

pointsController.ediGet = function (req, res) {
  const { id } = req.params;

  Points.findOne({ _id: id }).exec(function (err, point) {
    if (err) {
      res.redirect('/404');
    } else {
      res.render('../views/points/editPoints', {
        userProfile: req.user,
        point: point,
        title: 'Edit point',
      });
    }
  });
};

pointsController.editPost = function (req, res) {
  const { pointsGiven } = req.body;
  const { id } = req.params;

  if (pointsGiven < 0) {
    res.redirect('/points/edit/' + id);
  }

  Points.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        pointsGiven: pointsGiven,
      },
    },
    { new: true },
    function (err) {
      if (err) {
        console.log(err);
        res.redirect('/points/edit/' + id);
      }
      res.redirect('/points/list');
    }
  );
};

module.exports = pointsController;
