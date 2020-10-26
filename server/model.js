import mongoose from 'mongoose';
const {Schema} = mongoose;

const battleSchema = new Schema({
    "name": {
      "type": "String"
    },
    "year": {
      "$numberInt": {
        "type": "Date"
      }
    },
    "battle_number": {
      "$numberInt": {
        "type": "String"
      }
    },
    "attacker_king": {
      "type": "String"
    },
    "defender_king": {
      "type": "String"
    },
    "attacker_1": {
      "type": "String"
    },
    "attacker_2": {
      "type": "String"
    },
    "attacker_3": {
      "type": "String"
    },
    "attacker_4": {
      "type": "String"
    },
    "defender_1": {
      "type": "String"
    },
    "defender_2": {
      "type": "String"
    },
    "defender_3": {
      "type": "String"
    },
    "defender_4": {
      "type": "String"
    },
    "attacker_outcome": {
      "type": "String"
    },
    "battle_type": {
      "type": "String"
    },
    "major_death": {
      "$numberInt": {
        "type": "Date"
      }
    },
    "major_capture": {
      "$numberInt": {
        "type": "Date"
      }
    },
    "attacker_size": {
      "$numberInt": {
        "type": "Date"
      }
    },
    "defender_size": {
      "type": "String"
    },
    "attacker_commander": {
      "type": "String"
    },
    "defender_commander": {
      "type": "String"
    },
    "summer": {
      "$numberInt": {
        "type": "Date"
      }
    },
    "location": {
      "type": "String"
    },
    "region": {
      "type": "String"
    },
    "note": {
      "type": "String"
    }
});
const Battle = mongoose.model('battle', battleSchema);
export default Battle;