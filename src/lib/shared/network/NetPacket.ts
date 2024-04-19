export class NetPacket {
    static readonly ALL_TYPES: {[key: string]: typeof NetPacket} = {};
    static readonly TYPE : string = 'Packet'
    private readonly ___type: string;

    get PacketType() {
        return this.___type;
    }

    protected constructor(type: string) {
        if(NetPacket === this.constructor) {
            throw Error('Cannot instantiate Packet');
        }
        this.___type = (this.constructor as typeof NetPacket).TYPE;
    }
}