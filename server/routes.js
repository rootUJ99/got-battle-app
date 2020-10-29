import express from 'express';
import battleModel from './model.js';

const router = express.Router();

router.get('/search',async (req,res)=> {
  try {
    // console.log(req.query);
    const {king, commander, ...rest} = req.query;
    let queryForKingAndCommander = {};
    if( king && commander) {
      queryForKingAndCommander = {$and: [
        {$or: [{attacker_commander: commander}, {defender_commander: commander}]},
        {$or: [{attacker_king: king}, {defender_king: king}]},
      ]};
    } else if (king) {
      queryForKingAndCommander = {$or: [{attacker_king: king}, {defender_king: king}]}
    } else if (commander) {
      queryForKingAndCommander =  {$or: [{attacker_commander: commander}, {defender_commander: commander}]}
    } else {
      queryForKingAndCommander = {};
    }
    // console.log(queryForKingAndCommander, ' ', rest);
    const searchedData = await battleModel.find({
      ...queryForKingAndCommander,
      ...rest
    });
    // console.log(searchedData);
    res.send({
      status: 'success',
      searchedData,
  });
} catch (err) {
  res.status(400).send({
      status: 'fail',
      message: err
    });
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
      status: 'success',
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
      status: 'success',
      count,
    })
  } catch (err) {
    res.status(400).send({
      status: 'fail',
      message: err
    });
  }
});

router.get('/indexed-search',async (req,res)=> {
  try {
    // console.log(req.query);
    if ('q' in req.query){
      const searchedData = await battleModel.find(
        {
          $text: {
            $search: req.query.q,
            $caseSensitive: false,
          },
        },
        {
          score: {
            $meta: 'textScore',
          }
        }
      ).sort({ score : { $meta : 'textScore' } });

      return res.status(200).send({
        status: 'success',
        searchedData,
      });
    }
    // console.log(searchedData);
    res.status(400).send({
      'status': 'fail',
      'message': 'please use right query param',
    });
  } catch (err) {
    res.status(400).send({
      status: 'fail',
      message: err
    });
  }
});

export default router;