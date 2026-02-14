import mongoose from "mongoose";

const societySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
        maxlength: 500,
    },
    logo: {
        type: String,
        default: "",
    },
    bannerImage:{
        type: String,
        default: "",
    }
},
    { timestamps: true }
);

export default mongoose.model("Society", societySchema);