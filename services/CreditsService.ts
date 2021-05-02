import { User } from "../models/User";
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
    get: async (Id: String) => {
        console.log("Pidiendo los datos")
        return await Credit.find({ _id: Id });
    },
    create: async (data: any) => {
        console.log("Publicando datos")
        const user = data.IdUsuario;
        const query = await User.findOne({ _id: user });

        if (query.CapacidadEndeudamiento >= data.TotalCupoTc) {
            const credit = new Credit(data);
            credit.save();
            const Sid = credit._id.toString();
            await User.findOneAndUpdate(
                { _id: user },
                { $push: { CreditosActuales: Sid } },
            );
            const total = query.CapacidadEndeudamiento - credit.TotalCupoCredito;
            await User.where({ _id: user }).update({ $set: { CapacidadEndeudamiento: total } });

            return credit;
        } else {
            console.log("no tiene suficiente cupo para este credito");
            return "no tiene suficiente cupo para este credito";
        }
    },
    update: async (data: any) => {
        console.log("Actualizando datos");
        const id = data._id;

        const query = await User.findOne({ _id: data.IdUsuario });
        const query2 = await Credit.findOne({ _id: id });
        if ((query.CapacidadEndeudamiento + query2.TotalCupoCredito) >= data.TotalCupoCredito) {

            //Actualizacion capacidad endeudamiento
            const total = (query.CapacidadEndeudamiento + query2.TotalCupoCredito) - data.TotalCupoCredito;
            await User.where({ _id: data.IdUsuario }).update({ $set: { CapacidadEndeudamiento: total } });
            delete data._id;

            return await Credit.where({ _id: id }).update(data);
        } else {
            console.log("no tiene suficiente cupo para actualizar este credito");
            return "no tiene suficiente cupo para actualizar este credito";
        }

    },
    delete: async (id: ObjectId, usuario: string) => {
        console.log("Actualizando datos");
        id.toString();
        await User.findOneAndUpdate(
            { _id: usuario },
            { $pull: { CreditosActuales: id } },
        );
        //sume
        const query = await User.findOne({ _id: usuario });
        const query2 = await Credit.findOne({ _id: id });
        const total = query.CapacidadEndeudamiento + query2.TotalCupoCredito;
        await User.where({ _id: usuario }).update({ $set: { CapacidadEndeudamiento: total } });
        return await Credit.deleteOne({ _id: id });
    }

}


export default CreditsService;
