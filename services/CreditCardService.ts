import { CreditCard } from "../models/CreditCard"
import {User} from "../models/User";

const CreditCardService = {

        getAll: async () => {
            console.log("Pidiendo los datos")
            return await CreditCard.find({});
        },
        get: async (Id : String) => {
            console.log("Pidiendo los datos")
            return await CreditCard.find({IdProducto :Id });
        },
        create: async (data : any) => {
            console.log("Publicando datos")
            const creditcard = new CreditCard(data);           
            const user = data.IdUsuario;
            const dato = data.IdProducto;
            creditcard.save();
            await User.findOneAndUpdate(
                { _id: user }, 
                { $push: { TarjetasCreditoActuales: dato } },
            ); 
            return creditcard;
        },
        update: async (data : any)=>{
            console.log("Actualizando datos");
            const id = data.IdProducto;
            delete data.IdProducto;
            // Forma si solo se modifica el Estado del Credito(Al dia o moroso)
            // delete data.IdUsuario;
            // delete data.IdEntidad;
            // delete data.CantidadUso;
            // delete data.TotalCupoTc;
            // delete data.CantidadDisponible;
            return await CreditCard.where({IdProducto : id}).update(data);
        },
        delete:async (id : string, usuario: string)=>{
            console.log("Actualizando datos");
            
            await User.findOneAndUpdate(
                { _id: usuario }, 
                { $pull: { TarjetasCreditoActuales: id } },
            );
            return await CreditCard.deleteOne({IdProducto : id});
        }  
    
}
export default CreditCardService;
