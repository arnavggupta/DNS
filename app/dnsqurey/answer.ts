
import{ dnsQuestionClass, dnsQuestionType } from "./question";
export interface IDNSANSWER{
    name:string,
    atype:dnsQuestionType,
    aclass:dnsQuestionClass,
    ttl:number,
    data:string
}

export class DNSANSWER{
    static write(value:IDNSANSWER[]){
        return Buffer.concat(
            value.map((val)=>{
                
                const nameStr = val.name.split('.').map((part) => `${String.fromCharCode(part.length)}${part}`).join("");
                const typeAndClass=Buffer.alloc(10);
                typeAndClass.writeInt16BE(val.atype,0);
                typeAndClass.writeInt16BE(val.aclass,2);
                typeAndClass.writeInt32BE(val.ttl,4);
                typeAndClass.writeInt16BE(val.data.length,8);
                return Buffer.concat([Buffer.from(nameStr+'\0','binary'),typeAndClass,
                Buffer.from(val.data + '\0','binary')

                ])
}
            )
        )
        }
    }


