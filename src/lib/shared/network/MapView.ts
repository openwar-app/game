import {NetPacket} from "$lib/shared/network/NetPacket";
import type {MultiPolygon} from "polygon-clipping";


export class MapView extends NetPacket {
    static readonly TYPE = 'MapView'
    polygon: MultiPolygon;

    constructor(polygon: MultiPolygon) {
        super(MapView.TYPE);
        this.polygon = polygon;
    }


}