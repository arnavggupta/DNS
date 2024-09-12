import * as dgram from "dgram";
import { DNSHEADER, IDNSHEADER, OpCode, rCode } from "./dnsqurey/header";
import { DNSQUESTION,dnsQuestionClass,dnsQuestionType,IQUESTION } from "./dnsqurey/question";
import { DNSANSWER, IDNSANSWER } from "./dnsqurey/answer";
const defaultHeader:IDNSHEADER={
    id:1234,
    qr:1,
    opcode:OpCode.standard,
aa:0,
tc:0,
rd:0,
ra:0,
z:0,
rcode:rCode.NOERROR,
qdcount:0,
ancount:0,
nscount:0,
arcount:0,
}

const defaultQuestion: IQUESTION={
qname:"codecrafters.io",
qtype:dnsQuestionType.A,
qclass:dnsQuestionClass.IN
}

const defaultAnswer:IDNSANSWER={
    name:"codecrafters.io",
    atype:dnsQuestionType.A,
    aclass:dnsQuestionClass.IN,
    ttl:60,
    data:"\x08\x08\x08\x08"
}

//
const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");
//
udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        const header = DNSHEADER.writes({...defaultHeader,qdcount:1,ancount:1});
        const question = DNSQUESTION.write([defaultQuestion]);
        const answer= DNSANSWER.write([defaultAnswer])
        // const response = Buffer.from("");
        const response= Buffer.concat([header,question,answer]);
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
