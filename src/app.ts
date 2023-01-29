import express, {Handler, Request, response, Response, Router} from 'express';
import bodyParser from "body-parser";
import validator from "./validator";
import bmi, {BmiInput, BmiOutput} from "./bmi";

const app = express();

//bmi router
const bmiRouter = Router();
bmiRouter.post('/',(req, res, next)=>{
    const {weight, height, weightUnit, heightUnit} = req.body;
    const bmiResult : BmiOutput = bmi({weight, height, weightUnit, heightUnit} as BmiInput);
    res.send(bmiResult);
})
bmiRouter.get('/',(req, res, next)=>{
    const {weight, height, weightUnit, heightUnit} = req.query;
    const bmiResult : BmiOutput = bmi({weight, height, weightUnit, heightUnit} as unknown as BmiInput);
    res.send(bmiResult);
})
// TODO implement me :)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/bmi',bodyParser.json(),validator, bmiRouter);
export default app;
