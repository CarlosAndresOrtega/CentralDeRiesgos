import { UserI } from "../interfaces/UserI";
import mongoose from 'mongoose';


const usersSchema = new mongoose.Schema({
    TypeDocument: {
        type: String,
        required: true
    },
    NDocument: {
        type: String,
        required: true
    },
    IngresosMensuales:{
        type: Number,
        require: false
    },
    CreditosActuales:{
        type: Array,
        require: false
    },
    TarjetasCreditoActuales: {
        type: Array,
        require: false
    },
    CapacidadEndeudamiento: {
        type: Number,
        require: false
    },
    CupoMaximoEndeudamiento:{
        type: Number,
        require: false
    },
    EstadoActual: {
        type: String,
        require: false
    }
    
});

const User = mongoose.model('User', usersSchema);

export { User }

