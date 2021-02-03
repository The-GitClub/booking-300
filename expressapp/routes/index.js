var express = require('express');
const booking = require('../models/booking');
//const booking = require('../models/booking');
var router = express.Router();
const Booking = require('../models/booking')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// // Cancel a booking
// router.delete('bookings/:id',(req, res) => {
//   deleteBooking(req, res);
// });
// function deleteBooking(req, res) {
//   const id = req.params;
//   newBooking.findByIdAndDelete(id).
//       then((result) => {
//           if (result) {
//               res.status(202).send({ message: 'deleted' })
//           }
//           else {
//               res.status(404).send({ message: 'not found' })
//           }
//       })
//       .catch((error) =>
//           res.status(404).send({ message: 'not found' }));
// }

// Get Bookings

router.get('/', (req, res) => {
  readBookings(req, res);
})

function readBookings(req, res, options = []) {

  // this uses object deconstruction to extract the data from the query string

  const { limit } = req.query;
  let filter = {};

const limitNumber = parseInt(limit)

    Booking.find(filter)
        .limit(limitNumber)
        .then((result) => {
            res.json(result)
        })
        .catch((error) =>
            res.status(500).json({ error: 'An error' + error}))
      }


// Cancel a booking
router.delete('/:id',(req, res) => {
  deleteBooking(req, res);
});
function deleteBooking(req, res) {
  const id = req.params.id;
  Booking.findByIdAndRemove(id).
      then((result) => {
          if (result) {
              res.status(202).send({ message: 'deleted' })
          }
          else {
              res.status(404).send({ message: 'not found' })
          }
      })
      .catch((error) =>
          res.status(404).send({ message: 'not found' }));
}

// Get specific booking
router.get('/:id', (req,res) => {
    
  readBooking(req,res);

});
function readBooking(req, res) {
  const id = req.params.id;
  Booking.findById(id)
      .then((result) => {
          console.log('result' + result.uri);

          res.json(result)
      })
      .catch((error) =>
          res.status(404).json({ error: 'not found' }))
}


// Update a booking
router.put('/:id',(req, res) => {
  updateBooking(req, res);
});
function updateBooking(req, res) {
  const id = req.params.id;

  Booking.findByIdAndUpdate(id, req.body).
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

module.exports = router;
