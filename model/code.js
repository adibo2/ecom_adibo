import mongoose from "mongoose";

const codeSchema=new mongoose.Schema({
   
    type: {
        type: String,
        required: true
    },
    codes: [{
        code: {
            type: String,
            required: true
        },
        isUsed: {
            type: Boolean,
            default: false
        }
    }]

},
{
    timestamps:true
});
const Code=mongoose.models.Code || mongoose.model('Code',codeSchema);
export default Code;