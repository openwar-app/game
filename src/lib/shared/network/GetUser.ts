import {NetPacket} from "$lib/shared/network/NetPacket";


export class GetUser extends NetPacket {
    static readonly TYPE = 'GetUser'
    username: string | undefined;

    constructor(username: undefined | string = undefined) {
        super(GetUser.TYPE);
        this.username = username;
    }

    getUsername() {
        return this.username;
    }

}