import { CreditCard } from "../models/CreditCard"

const CreditCardService = {

        getAll: async () => {
            console.log("Pidiendo los datos")
            return await CreditCard.find({});
        },
        create: async (data : any) => {
            console.log("Publicando datos")
            const creditcard = new CreditCard(data);
            creditcard.save();
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
        delete:async (id : string)=>{
            console.log("Actualizando datos");
            return await CreditCard.deleteOne({IdProducto : id});
        }  
    
}
export default CreditCardService;
