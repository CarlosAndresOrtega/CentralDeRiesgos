import {User} from "../models/User";
import { Credit } from "../models/Credits"
import creditsRouter from "../api/routes/credits.router";
// const all: any;
// const Update : any;
const CreditsService = {
    
        getAll: async () => {
            console.log("Pidiendo los datos")
            return await Credit.find({});
        },
        get: async (Id : String) => {
            console.log("Pidiendo los datos")
            return await Credit.find({IdProducto :Id });
        },
        create: async (data : any) => {
            console.log("Publicando datos")
            const credit = new Credit(data);
            const user = data.IdUsuario;
            const dato = data.IdProducto;
            credit.save();
            console.log("Actualizando el usuario")
            await User.findOneAndUpdate(
                { _id: user }, 
                { $push: { CreditosActuales: dato } },
            );       
            return credit;
        },
        update: async (data : any)=>{
            console.log("Actualizando datos");
            const id = data.IdProducto;
            delete data.IdProducto;
            // Forma si solo se modifica el Estado del Credito(Al dia o moroso)
            // delete data.IdUsuario;
            // delete data.IdEntidad;
            // delete data.TotalCupoCredito;
            // delete data.TotalPagoCredito;
            // delete data.CantidadAbonar;
            return await Credit.where({IdProducto : id}).update(data);
        },
        delete:async (id : string, usuario: string)=>{
            console.log("Actualizando datos");
            await User.findOneAndUpdate(
                { _id: usuario }, 
                { $pull: { CreditosActuales: id } },
            );
            return await Credit.deleteOne({IdProducto : id});
        }   
    
}


export default CreditsService;
