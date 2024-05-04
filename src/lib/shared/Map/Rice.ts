import {MapField} from "$lib/shared/Map/MapField";

var MapData : MapField[] = [];
for(let x = 0; x < 7; x++) {
    for(let y = 0; y < 4; y++) {
        MapData.push(new MapField({
            posx: 100+x,
            posy: 100-y,
            image: "/map/rice/map.jpg",
            imageSlice: {x: x, y: y+2, scale: 10}
        }));
    }
}



export default MapData;