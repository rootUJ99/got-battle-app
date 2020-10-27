import express from 'express';
import battleModel from './model.js';

const router = express.Router();

router.get('/search',async (req,res)=> {
  try {
    console.log(req.query);
    const searchedData = await battleModel.find({
      ...req.query
    });
    // console.log(searchedData);
    res.send({
      searchedData,
  });
} catch (err) {
  console.log(err);
}
});

router.get('/list', async(req, res)=> {
  try {
    const locationsQuery = await battleModel.find({}, {
      location: 1,
      _id: 0,
    }).where('location').ne("");
    const locations = locationsQuery.map(it=> it.location);
    res.send({
      locations,
    })
  } catch (err) {
    console.log(err);
  }
});

router.get('/count', async(req, res)=> {
  try {
    const count = await battleModel.find().count();
    // console.log(count);
    res.send({
      count,
    })
  } catch (err) {
    console.log(err);
  }
});

export default router;