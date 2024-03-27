export class NetPacket {
    static ALL_TYPES: {[key: string]: typeof NetPacket} = {};
    static TYPE = 'Packet'
    type: string;

    protected constructor(type: string) {
        if(NetPacket === this.constructor) {
            throw Error('Cannot instantiate Packet');
        }
        this.type = (this.constructor as typeof NetPacket).TYPE;
    }
}