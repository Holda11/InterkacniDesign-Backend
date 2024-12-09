import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
    departure_Airport: {
        type: String,
        required: true,
        unique: true,
    },
    arrival_Airport: {
        type: String,
        required: true,
        unique: true,
    },
    return_departure_Airport: {
        type: String,
        required: true,
        unique: true,
    },
    return_arrival_Airport: {
        type: String,
        required: true,
        unique: true,
    },
    departure_Date: {
        type: String,
        required: true,
        unique: true,
    },
    return_Date: {
        type: String,
        required: true,
        unique: true,
    },
    departure_IATA: {
        type: String,
        required: true,
        unique: true,
    },
    arrival_IATA: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: String,
        required: true,
        unique: true,
    },
    layovers: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Flight = mongoose.model('Flight', flightSchema)