import { Router } from 'express';
import { Truck, Review } from '../models/';
import { authenticate } from '../middleware/authMiddleware';

export const truckController = ({ config, db }) => {
  const api = Router();

  // 'v1/trucks/add'
  api.post('/add', authenticate, (req, res) => {
    const newTruck = new Truck();
    newTruck.name = req.body.name;
    newTruck.foodType = req.body.foodType;
    newTruck.avgCost = req.body.avgCost;
    newTruck.geometry.coordinates = req.body.geometry.coordinates;
    newTruck.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Truck saved successfully' });
    });
  });

  // 'v1/trucks/'
  api.get('/', (req, res) => {
    Truck.find({}, (err, trucks) => {
      if (err) {
        res.send(err);
      }
      res.json(trucks);
    });
  });

  // 'v1/trucks/:id'
  api.get('/:id', (req, res) => {
    Truck.findById(req.params.id, (err, truck) => {
      if (err) {
        res.send(err);
      }
      res.json(truck);
    });
  });

  // 'v1/trucks/:id'
  api.put('/:id', (req, res) => {
    Truck.findById(req.params.id, (err, truck) => {
      if (err) {
        res.send(err);
      }
      truck.name = req.body.name;
      truck.save((error) => {
        if (err) {
          res.send(error);
        }
        res.json({ message: 'Truck info updated' });
      });
    });
  });

  // 'v1/trucks/:id'
  api.delete('/:id', (req, res) => {
    Truck.remove(
      {
        _id: req.params.id,
      },
      (err, truck) => {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Truck successfully removed', truck });
      }
    );
  });

  api.post('/reviews/add/:id', (req, res) => {
    Truck.findById(req.params.id, (err, truck) => {
      if (err) {
        res.send(err);
      }
      const newReview = new Review();
      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.truck = truck._id;
      newReview.save((error, review) => {
        if (error) {
          res.send(error);
        }
        truck.reviews.push(newReview);
        truck.save((e) => {
          if (e) {
            res.send(e);
          }
          res.json({ message: 'Food Truck review saved.', review });
        });
      });
    });
  });

  api.get('/reviews/:id', (req, res) => {
    Review.find({ truck: req.params.id }, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  return api;
};
