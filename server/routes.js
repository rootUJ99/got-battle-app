import express from 'express';
import battleModel from './model.js';

const router = express.Router();

router.get('/search',async (req,res)=> {
  try {
    console.log(req.query);
    const searchedData = await battleModel.find({
      ...req.query
    });
    console.log(searchedData);
    res.send({
      searchedData,
  });
} catch (err) {
  console.log(err);
}
});

export default router;