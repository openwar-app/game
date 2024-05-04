import type {TypeMapLogic} from "$lib/shared/Map/logic/TypeMapLogic";

export class MapField {
    posx: number;
    posy: number;
    image: string;
    imageSlice?: {x: number, y: number, scale: number }
    private logic: (() => Promise<typeof TypeMapLogic>);
    public constructor(
        {posx, posy, image, logic, imageSlice} :
            {
                posx: number,
                posy: number,
                image: string,
                logic?: (() => Promise<typeof TypeMapLogic>),
                imageSlice?: { x: number, y: number, scale: number }
            }
    ) {
        this.posx = posx;
        this.posy = posy;
        this.image = image;
        this.imageSlice = imageSlice;
        this.logic = logic ??  (async () => { return (await import("./logic/Default")).default; })
    }

    public async getLogic() : Promise<typeof TypeMapLogic> {
        return await this.logic();
    }

}