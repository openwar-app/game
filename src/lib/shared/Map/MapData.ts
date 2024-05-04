import MapRice from "$lib/shared/Map/Rice";
import {MapField} from "$lib/shared/Map/MapField";



export const DefaultField : MapField = new MapField({
    posx: 0,
    posy: 0,
    image: "/map/default.jpg",
    logic: async () => { return (await import("./logic/NotExisting")).default; },
});

const MapData : MapField[] = [];

MapData.push(...MapRice);




/**
 * Get map fields in a radius around a position
 * @param posx
 * @param posy
 * @param radius
 * @returns MapField[]
 */
export function getMapFields(posx: number, posy: number, radius: number = 0) : MapField[]  {
    const boundLeft = posx - radius;
    const boundRight = posx + radius;
    const boundTop = posy - radius;
    const boundBottom = posy + radius;

    return MapData.filter((field) => {
        return field.posx >= boundLeft && field.posx <= boundRight && field.posy >= boundTop && field.posy <= boundBottom;
    });
}

/**
 * Get a map field at a position
 * @param posx
 * @param posy
 * @returns MapField | null
 */
export function getMapField(posx: number, posy: number) : MapField | null {
    return MapData.find((field) => field.posx === posx && field.posy === posy) ?? null;
}