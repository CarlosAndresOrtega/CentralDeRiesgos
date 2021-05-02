import { Request, Response } from "express";
import CreditsService from "../../services/CreditsService";
import { checkKeys } from "../../shared/Validators";

const CreditsController = {
    getAll: async (_:Request, res: Response) => {
        try {
            const loans = await CreditsService.getAll();
            res.status(200).send(loans);
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    },
    get: async (req: Request, res: Response) => {
        try {
            // const data: Array<String> = [req.params.TypeDocument, req.params.NDocument];
            const IdProducto = req.params._id;

            const CreditCards = await CreditsService.get(IdProducto);
            if (CreditCards == "") {
                res.status(200).send("Credito no encontrado");
            } else {
                res.status(200).json(CreditCards);
            }


        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    },
    create:async (req:Request, res: Response) => {
        try {
            const data = req.body
            // checkKeys(CreditCardI,req.body);
            checkKeys(["IdUsuario","IdEntidad"], data);
            const credits = await CreditsService.create(data);
            res.status(200).send(credits);
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    },
    update:async (req:Request, res: Response) => {
        try {
            const data = req.body
            // checkKeys(CreditCardI,req.body);
            checkKeys(["_id"], data);
            const credits = await CreditsService.update(data);
            if (credits == "") {
                res.status(200).send("Credito no encontrado");
            } else {
                res.status(200).json(credits);
                // res.status(200).send(credits);
            }
            
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    },
    delete:async (req:Request, res: Response) => {
        try {
            checkKeys(["_id", "IdUsuario"], req.body);
            const data = req.body._id;
            const data2 = req.body.IdUsuario;
            const credits = await CreditsService.delete(data, data2);
            if (credits == "") {
                res.status(200).send("Credito no encontrado");
            } else {
                res.status(200).json(credits);
                // res.status(200).send(credits);
            }
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    }    

}

export default CreditsController;