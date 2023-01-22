import mongoose from "mongoose";
export const code_data=[{
    code:"8DVY4-NV2MW-3CGTG-XCBDB-2PQFM"
},
{
    code:"Adib"

},
{
    code:"Bens"
},
{
    code:"Moha"
}
]
const codeSchema=new mongoose.Schema({
    code:{type:String,required:true},
},
{
    timestamps:true
});
const Code=mongoose.models.Code || mongoose.model('Code',codeSchema);
export default Code;