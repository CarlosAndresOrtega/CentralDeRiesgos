import { ObjectId } from "mongoose";
import { CreditCard } from "../models/CreditCard"
import {User} from "../models/User";

const CreditCardService = {

        getAll: async () => {
            console.log("Pidiendo los datos")
            return await CreditCard.find({});
        },
        get: async (Id : String) => {
            console.log("Pidiendo los datos")
            return await CreditCard.find({_id :Id });
        },
        create: async (data : any) => {
            console.log("Publicando datos")
            const creditcard = new CreditCard(data);           
            const user = data.IdUsuario;
            creditcard.save();
            const Sid = creditcard._id.toString();

            await User.findOneAndUpdate(
                { _id: user }, 
                { $push: { TarjetasCreditoActuales: Sid }},
            );
            // const query  = await User.where({ _id: user });
            // const total = query.CapacidadEndeudamiento-creditcard.TotalCupoTc;

            // await User.where({ _id: user }).update({ $set: { CapacidadEndeudamiento: total }});
            return creditcard;
        },
        update: async (data : any)=>{
            console.log("Actualizando datos");
            const id = data._id;
            delete data._id;
            // Forma si solo se modifica el Estado del Credito(Al dia o moroso)
            // delete data.IdUsuario;
            // delete data.IdEntidad;
            // delete data.CantidadUso;
            // delete data.TotalCupoTc;
            // delete data.CantidadDisponible;
            return await CreditCard.where({_id : id}).update(data);
        },
        delete:async (id : ObjectId, usuario: string)=>{
            console.log("Actualizando datos");
            id.toString();
            
            await User.findOneAndUpdate(
                { _id: usuario }, 
                { $pull: { TarjetasCreditoActuales: id}}
            );
            console.log(id);
            return await CreditCard.deleteOne({_id : id});
        }  
    
}
export default CreditCardService;
