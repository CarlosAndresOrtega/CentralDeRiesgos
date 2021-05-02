import { Request, Response } from "express";
import UsersService from "../../services/UsersService";
import { checkKeys } from "../../shared/Validators";
const fs = require('fs')

const UsersController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const users = await UsersService.getAll();
            res.status(200).json(users);
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
            const TypeDocument = req.params.TypeDocument.toUpperCase();
            const NDocument = req.params.NDocument;
            let bool = false;

            if (TypeDocument == "CC" || TypeDocument == "CE" || TypeDocument == "NIT") {
                // parseInt(NDocument);
                for (var i = 0; i < NDocument.length; i++) {
                    if (NDocument[i] != "1" && NDocument[i] != "2" && NDocument[i] != "3" && NDocument[i] != "4" && NDocument[i] != "5" && NDocument[i] != "6" && NDocument[i] != "7" && NDocument[i] != "8" && NDocument[i] != "9" && NDocument[i] != "0") {
                        bool = true;
                    }
                }
                if (!bool) {
                    const users = await UsersService.get(TypeDocument, NDocument);
                    if(users==""){
                        res.status(200).send("Usuario no encontrado");    
                    }else{
                        res.status(200).json(users);
                    }
                } else {
                    res.status(200).send("Digite solo numeros para el numero de documento");
                }
            } else {
                res.status(200).send("Su tipo de documento esta mal (CC, NIT o CE )");
            }
            // ;
        } catch (error) {
            console.log(error.stack && error.stack || error);
            res.status(500).send({
                error: true,
                msg: error
            })
        }
    },


    create: (req: Request, res: Response) => {
        // try {
        // checkKeys(["name", "lname", ""], req.body);
        // [
        //     "TypeDocument"
        //     "IngresosMensuales"
        //     "CreditosActuales"
        //     "TarjetasCreditoActuales"
        //     "CapacidadEndeudamiento"
        //     "CupoMaximoEndeudamiento"
        //     "EstadoActual"
        // ]
        //     checkKeys(["name", "lname"], req.body);
        //     const user: User = new User(req.body.name, req.body.lname);
        //     user.save();
        //     res.send(user).status(201);
        // } catch (error) {
        //     res.send({error: true, msj: error.stack && error.stack || error }).status(500);
        // }

    }
}

export default UsersController;
