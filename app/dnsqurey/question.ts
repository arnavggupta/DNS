export enum dnsQuestionType{
A=1,
NS=2
}
export enum dnsQuestionClass{
    IN=1,
    CS=2
}
 
export interface IQUESTION{
qname:string,
qtype:dnsQuestionType,
qclass:dnsQuestionClass
}

export class DNSQUESTION{
        static  write(value:IQUESTION[]){
            return Buffer.concat(
value.map((val)=>{

const nameStr=val.qname.split('.').map((part)=>{`${String.fromCharCode(part.length)}${part}`}).join("");
const typeAndClass=Buffer.alloc(4);

typeAndClass.writeInt16BE(val.qtype);
typeAndClass.writeInt16BE(val.qclass,2);
return Buffer.concat([Buffer.from(nameStr+'\0','binary'),typeAndClass]);

})
    
)
}

}




