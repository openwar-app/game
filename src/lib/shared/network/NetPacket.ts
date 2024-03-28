export class NetPacket {
    static readonly ALL_TYPES: {[key: string]: typeof NetPacket} = {};
    static readonly TYPE : string = 'Packet'
    type: string;

    protected constructor(type: string) {
        if(NetPacket === this.constructor) {
            throw Error('Cannot instantiate Packet');
        }
        this.type = (this.constructor as typeof NetPacket).TYPE;
    }
}