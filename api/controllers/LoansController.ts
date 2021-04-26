import { Request, Response } from "express";
import LoansService from "../../services/LoansService";
// import { checkKeys } from "../../shared/Validators";

const LoansController = {
    getAll: async (_:Request, res: Response) => {
        try {
            const loans = await LoansService.all.getAll();
            res.status(200).send(loans);
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    },
    
    create: (req: Request, res: Response) => {
        
    }

}

export default LoansController;
