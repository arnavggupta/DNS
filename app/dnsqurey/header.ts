export enum OpCode{
    standard=0,
    inverse=1,
    serverStatus=2
}
export enum rCode{
    NOERROR=0,
    FORMATERROR=1
}
export interface IDNSHEADER{
    id:number
    qr:number
opcode:OpCode
aa:number
tc:number
rd:number
ra:number
z:number
rcode:rCode
qdcount:number
ancount:number
nscount:number
arcount:number
}

export class DNSHEADER{
static writes( values:IDNSHEADER){
    let buffer=Buffer.alloc(12)
    buffer.writeUInt16BE(values.id,0)
   const flag=values.qr<<15|values.opcode<<11|values.aa<<10|values.tc<<9|values.rd<<8|values.ra<<7|values.z<<4|values.rcode;
   buffer.writeUInt16BE(flag,2)
    buffer.writeUInt16BE(values.qdcount,4)
    buffer.writeUInt16BE(values.ancount,6)
    buffer.writeUInt16BE(values.nscount,8)
    buffer.writeUInt16BE(values.arcount,10)
    return buffer;
}
}

