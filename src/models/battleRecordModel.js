//@flow strict
// Document Schema for the Battle Record
// Used for Battles and Replays

// Required Imports
import Mongoose from 'mongoose';

const BattleRecord = new Mongoose.model('BattleRecord', new Mongoose.Schema({
    // _id field made upon creation
    
    // ID of users
    userOne: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    userTwo: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // -1 = Battle not evaluated, 0 = Tie, 1 = User one victory, 2 = User two victory
    winner: {
        type: Number,
        required: true,
        enum: [-1, 0, 1, 2]
    },
    // Total of money wagered
    prizeMoney: {
        type: Number,
        required: true
    },
    // Amount of Elo exchanged between players
    eloExchanged: {
        type: Number,
        required: true
    },
    // User one's tank state for this battle
    tankOne: {
        tankName: {
            type: String,
            required: true
        },
        components: [{
            type: String,
            required: true
        }],
        casusCode: {
            type: Object,
            required: true
        }
    },
    // User two's tank state for this battle
    tankTwo: {
        tankName: {
            type: String,
            required: true
        },
        components: [{
            type: String,
            required: true
        }],
        casusCode: {
            type: Object,
            required: true
        }
    }
}));

module.exports = BattleRecord;