import type {UserData} from "$lib/shared/network/UserData";
import {MapView} from "$lib/shared/network/MapView";

let _userData: null | UserData = $state(null);
let _mapView: MapView = $state(new MapView([]))

const ClientData = {
    get userData(): null | UserData {
        return _userData;
    },
    set userData(value: UserData) {
        _userData = value;
    },
    get MapView(): MapView {
        return _mapView;
    },
    set MapView(value: MapView) {
        _mapView = value;
    }
}

export default ClientData;