import express, {Request, Response} from "express";
import mongoose from 'mongoose';
import Deck from './models/Deck'

const PORT = 5000;

const app = express();

//allow support for json post request
app.use(express.json())

app.post("/decks", async (req: Request, res: Response) => {
    console.log(req.body)
    const newDeck = new Deck({
        title: req.body.title,
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck)
});

app.get('/', (req: Request, res: Response) => {
    res.send("gg");
    
});

app.get("/hello", (req:Request,res:Response) => {
    res.send("hello world");
});

const db = mongoose.connect(
    'mongodb+srv://flashcardsage:lxcK99qLNFc1iGPb@cluster0.0bc0ll2.mongodb.net/?retryWrites=true&w=majority'
)
.then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
});

