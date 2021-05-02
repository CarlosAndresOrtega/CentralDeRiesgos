import {User} from "../models/User";
import { Credit } from "../models/Credits"
import creditsRouter from "../api/routes/credits.router";
import { ObjectId } from "bson";
// const all: any;
// const Update : any;
const CreditsService = {
    
        getAll: async () => {
            console.log("Pidiendo los datos")
            return await Credit.find({});
        },
        get: async (Id : String) => {
            console.log("Pidiendo los datos")
            return await Credit.find({_id :Id });
        },
        create: async (data : any) => {
            console.log("Publicando datos")
            const credit = new Credit(data);
            const user = data.IdUsuario;
            const Sid = credit._id.toString();
            
            credit.save();
            console.log("Actualizando el usuario")
            await User.findOneAndUpdate(
                { _id: user }, 
                { $push: { CreditosActuales: Sid } },
            );    
            return credit;
        },
        update: async (data : any)=>{
            console.log("Actualizando datos");
            const id = data._id;
            delete data._id;
            // Forma si solo se modifica el Estado del Credito(Al dia o moroso)
            // delete data.IdUsuario;
            // delete data.IdEntidad;
            // delete data.TotalCupoCredito;
            // delete data.TotalPagoCredito;
            // delete data.CantidadAbonar;
            return await Credit.where({_id : id}).update(data);
        },
        delete:async (id : ObjectId, usuario: string)=>{
            console.log("Actualizando datos");
            id.toString();
            await User.findOneAndUpdate(
                { _id: usuario }, 
                { $pull: { CreditosActuales: id } },
            );
            return await Credit.deleteOne({_id : id});
        }   
    
}


export default CreditsService;
