import { Request, Response } from "express";
import CreditCardService from "../../services/CreditCardService";
import { checkKeys } from "../../shared/Validators";
import { CreditCardI } from "../../interfaces/CreditCardI";

const CreditCardController = {

    getAll: async (_: Request, res: Response) => {
        try {
            const credits = await CreditCardService.getAll();
            res.status(200).send(credits);
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
            const IdProducto = req.params.IdProducto;

            const CreditCards = await CreditCardService.get(IdProducto);
            if (CreditCards == "") {
                res.status(200).send("Usuario no encontrado");
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
    create: async (req: Request, res: Response) => {
        try {
            const data = req.body
            // checkKeys(CreditCardI,req.body);
            checkKeys(["IdProducto", "IdUsuario", "IdEntidad"], data);
            const credits = await CreditCardService.create(data);
            res.status(200).send(credits);
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const data = req.body
            // checkKeys(CreditCardI,req.body);
            checkKeys(["IdProducto"], data);
            const credits = await CreditCardService.update(data);
            res.status(200).send(credits);
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            checkKeys(["IdProducto", "IdUsuario"], req.body);
            const data = req.body.IdProducto;
            const data2 = req.body.IdUsuario;
            const credits = await CreditCardService.delete(data, data2);
            res.status(200).send(credits);
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    }

}

export default CreditCardController;