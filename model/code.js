import mongoose from "mongoose";

export const code_data=[{
    type:"Windows 10 Professional Digital License",
    codes:[
        {
            code:"3J7GN-2PWHK-YMH83-T44T4-7H66Y"
        },
        {
            code:"3J7GN-2PWHK-YMH83-T44T4-7H66Y"

        },
        {
            code:"3J7GN-2PWHK-YMH83-T44T4-7H66Y"

        },
        {
            code:"3J7GN-2PWHK-YMH83-T44T4-7H66Y"

        },
        {
            code:"3J7GN-2PWHK-YMH83-T44T4-7H66Y"

        },
        {
            code:"3J7GN-2PWHK-YMH83-T44T4-7H66Y"

        },

    ],
    
},

{
    type:"Windows 11 Professional Digital License",
    codes:[
        {
            code:"FBWDW-WNMJF-Q9MYV-64CYG-MKMP6"

        },
        {
            code:"FBWDW-WNMJF-Q9MYV-64CYG-MKMP6"


        },
        {
            code:"FBWDW-WNMJF-Q9MYV-64CYG-MKMP6"


        },
        {
            code:"FBWDW-WNMJF-Q9MYV-64CYG-MKMP6"


        },
        {
            code:"FBWDW-WNMJF-Q9MYV-64CYG-MKMP6"


        },
        {
            code:"XFW6C-RFN73-727XF-7VB73-BG9TT"
        }
    ]
},
{
    type:"Windows 11 Home Digital License",
    codes:[
        {
            code:"DDTQQ-CWNK2-9BTJF-TTY89-XKXQV"

        },
        {
            code:"DDTQQ-CWNK2-9BTJF-TTY89-XKXQV"

        },
        {
            code:"DDTQQ-CWNK2-9BTJF-TTY89-XKXQV"

        },
        {
            code:"DDTQQ-CWNK2-9BTJF-TTY89-XKXQV"

        },
        {
            code:"DDTQQ-CWNK2-9BTJF-TTY89-XKXQV"

        },
        
    ]
    
},
{
    type:"Office 2019 Professional Plus Digital License",
    codes:[
        {
            code:"YPNB6-M6FFW-TPQWF-GTCHJ-82RW6"

        },  
        {
            code:"YPNB6-M6FFW-TPQWF-GTCHJ-82RW6"

        },  
        {
            code:"YPNB6-M6FFW-TPQWF-GTCHJ-82RW6"

        },  
        {
            code:"YPNB6-M6FFW-TPQWF-GTCHJ-82RW6"

        },  
        {
            code:"YPNB6-M6FFW-TPQWF-GTCHJ-82RW6"

        },  
    ]
    
},
{
    type:"Office 2021 Home and Business Mac",
    codes:[
        {
            code:"CQBKN-VVBPQ-4Y4FJ-M7PWJ-D9PW8"

        },
        {
            code:"FN7CK-86XK3-QJ8XQ-8CJDK-9HK6J"

        },
        {
            code:"2FVKN-XJHCW-WVMGG-D7FDM-MY7GJ"

        },

        
    ]
    
},
{
    type:"Office 2019 Home and Business for Mac Digital License",
    codes:[
        {
            code:"BM88D-NWKM6-XF6QK-7B8MM-KD887"

        },
        {
            code:"YN6DJ-FK7XG-JY934-2VMYQ-BHB2V"

        },
        {
            code:"CRJT8-HNYXX-VB8WP-DPT2X-DYJ87"

        },
        

        
    ]
    
},
{
    type:"Windows 11 Enterprise Digital License",
    codes:[
        {
            code:"FW8HB-N27JC-VW8MY-TDT74-K4R8R"

        },
        {
            code:"FW8HB-N27JC-VW8MY-TDT74-K4R8R"

        },
        {
            code:"FW8HB-N27JC-VW8MY-TDT74-K4R8R"

        },
        {
            code:"FW8HB-N27JC-VW8MY-TDT74-K4R8R"

        },
        {
            code:"FW8HB-N27JC-VW8MY-TDT74-K4R8R"

        },
        {
            code:"FW8HB-N27JC-VW8MY-TDT74-K4R8R"

        },
        {
            code:"FW8HB-N27JC-VW8MY-TDT74-K4R8R"

        },

        
    ]
    
},
{
    type:"Windows 10 Enterprise Digital License",
    codes:[
        {
            code:"99C7N-73M63-HTK2T-V2RCQ-TCQF4"

        },
        {
            code:"99C7N-73M63-HTK2T-V2RCQ-TCQF4"
        },
        {
            code:"N399V-989D4-GRQP9-PQMW6-MKMPF"

        },
        {
            code:"N399V-989D4-GRQP9-PQMW6-MKMPF"

        },
        {
            code:"N399V-989D4-GRQP9-PQMW6-MKMPF"

        },
    ]
}

]
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