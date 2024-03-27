import {NetPacket} from "$lib/shared/network/NetPacket";


export class Login extends NetPacket {
    static readonly TYPE = 'Login'
    username: string;
    password: string;

    constructor(username: string, password: string) {
        super(Login.TYPE);
        this.username = username;
        this.password = password;
    }


}