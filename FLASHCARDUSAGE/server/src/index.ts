import { config } from 'dotenv';
config()
import express, {Request, Response} from "express";
import mongoose from 'mongoose';
import cors from 'cors';


import Deck from './models/Deck'

const PORT = 5000;

const app = express();
//middleware
//bypass cors error locally
app.use(cors()); //default argument is '*'
//allow support for json post request
app.use(express.json())

app.get("/decks", async (req: Request, res: Response) => {
    //TODO, fetch all decks and send back to the user
    const decks = await Deck.find() //get Deck collection from mongodb
    res.json(decks)
});

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
    //TODO
    //1. get the deck id from the url
    const deckId = req.params.deckId;
    //2. delete the deck from mongo
    const deck = await Deck.findByIdAndDelete(deckId)
    //3. return the deleted deck to the user who made the request
    res.json({
        message:"successfully deleted the entry"
    })
});

app.post("/decks", async (req: Request, res: Response) => {
    console.log(req.body)
    const newDeck = new Deck({
        title: req.body.title,
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck)
});

const db = mongoose.connect(process.env.MONGO_URL!)
.then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
});
 
