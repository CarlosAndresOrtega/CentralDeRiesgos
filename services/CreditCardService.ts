import { ObjectId } from "mongoose";
import { CreditCard } from "../models/CreditCard"
import { User } from "../models/User";

const CreditCardService = {

    getAll: async () => {
        console.log("Pidiendo los datos")
        return await CreditCard.find({});
    },
    get: async (Id: String) => {
        console.log("Pidiendo los datos")
        return await CreditCard.find({ _id: Id });
    },
    create: async (data: any) => {
        console.log("Publicando datos")
        const user = data.IdUsuario;
        const query = await User.findOne({ _id: user });
        if (query.CapacidadEndeudamiento >= data.TotalCupoTc) {

            const creditcard = new CreditCard(data);
            creditcard.save();
            const Sid = creditcard._id.toString();

            await User.findOneAndUpdate(
                { _id: user },
                { $push: { TarjetasCreditoActuales: Sid } },
            );

            const total = query.CapacidadEndeudamiento - creditcard.TotalCupoTc;
            await User.where({ _id: user }).update({ $set: { CapacidadEndeudamiento: total } });

            return creditcard;
        } else {
            console.log("no tiene suficiente cupo para esta tarjeta de credito");
            return "no tiene suficiente cupo para esta tarjeta de credito";
        }
    },
    update: async (data: any) => {
        console.log("Actualizando datos");
        const id = data._id;
        delete data._id;
        const query = await User.findOne({ _id: data.IdUsuario });
        const query2 = await CreditCard.findOne({ _id: id });

        if ((query.CapacidadEndeudamiento + query2.TotalCupoTc) >= data.TotalCupoTc) {

            //Actualizacion capacidad endeudamiento
            const total = (query.CapacidadEndeudamiento + query2.TotalCupoTc) - data.TotalCupoTc;
            await User.where({ _id: data.IdUsuario }).update({ $set: { CapacidadEndeudamiento: total } });

            return await CreditCard.where({ _id: id }).update(data);
        } else {
            console.log("no tiene suficiente cupo para actualizar esta tarjeta de credito");
            return "no tiene suficiente cupo para actualizar esta tarjeta de credito";
        }

    },
    delete: async (id: ObjectId, usuario: string) => {
        console.log("Actualizando datos");
        id.toString();

        await User.findOneAndUpdate(
            { _id: usuario },
            { $pull: { TarjetasCreditoActuales: id } }
        );
        console.log(id);
        //sume
        const query = await User.findOne({ _id: usuario });
        const query2 = await CreditCard.findOne({ _id: id });
        const total = query.CapacidadEndeudamiento + query2.TotalCupoTc;
        await User.where({ _id: usuario }).update({ $set: { CapacidadEndeudamiento: total } });

        return await CreditCard.deleteOne({ _id: id });
    }

}
export default CreditCardService;
