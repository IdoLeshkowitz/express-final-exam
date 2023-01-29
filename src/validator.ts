import type {NextFunction, Request, Response} from 'express';


/**
 * The middleware should check if the payload valid
 * @param req
 * @param res
 * @param next
 */
export default function validator(req: Request, res: Response, next: NextFunction) {
    function validateQueryParams(req: Request) {
        function getParamsFromRequest (req: Request) {
            if (req.method === 'GET') {
                return req.query;
            } else if (req.method === 'POST') {
                return req.body;
            }
        }
        const {weight, height, weightUnit, heightUnit} = getParamsFromRequest(req);
        console.log(weight, height, weightUnit, heightUnit);
        /*
        accepts received weight and returns true if it is a number
         */
        const validateWeight= (weight : unknown)=> weight && !isNaN(Number(weight));
        /*
        accepts received height and returns true if it is a number
         */
        const validateHeight = (height: unknown) => height && !isNaN(Number(height));
        /*
        accepts received weightUnit and returns true if it is a number between 0 and 2
         */
        const validateWeightUnit = (weightUnit: unknown) => weightUnit && /^[0-2]$/.test(weightUnit.toString());
        /*
        accepts received heightUnit and returns true if it is a number between 0 and 3
         */
        const validateHeightUnit = (heightUnit: unknown) => heightUnit && /^[0-3]$/.test(heightUnit.toString());
        if (!validateWeight(weight)) {
         throw new Error('Invalid weight');
        }
        if (!validateHeight(height)) {
            throw new Error('Invalid height');
        }
        if(!validateWeightUnit(weightUnit)){
            throw new Error('Invalid weightUnit');
        }
         if(!validateHeightUnit(heightUnit)){
             console.log(heightUnit)
             throw new Error('Invalid heightUnit');
         }
        return true;
    }
    try {
        if (validateQueryParams(req)) {
            return next();
        }
    }catch (e) {
        res.status(400).send('Invalid input');
    }

}
