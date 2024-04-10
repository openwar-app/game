import type {UserData} from "$lib/shared/network/UserData";

let _userData: null | UserData = $state(null);

const ClientData = {
    get userData(): null | UserData {
        return _userData;
    },
    set userData(value: UserData) {
        _userData = value;
    }
}

export default ClientData;