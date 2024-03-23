import Layout from '$lib/server/database/Entities/Layout';
import objectPath from 'object-path';
import {building} from "$app/environment";




const layout: {[k: string]: string} = {};

export async function reloadLayout() {
    let layouts = await Layout.find();
    for(const k in layout) {
        delete layout[k];
    }
    layouts.forEach(row => {
        objectPath.set(layout, row.name, row.value);
    });
    return true;
}
if(Object.keys(layout).length === 0 && !building) {
    await reloadLayout();
}




export { layout };