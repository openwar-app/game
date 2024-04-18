import type ChatBox from "$lib/_comps/ChatBox.svelte";
import MapBox from "$lib/_comps/MapBox.svelte";


let _chatBox: null | ChatBox = $state(null);
let _mapBox: null | MapBox = $state(null);

const Components = {
    get chatBox(): null | ChatBox {
        return _chatBox;
    },
    set chatBox(value: ChatBox) {
        _chatBox = value;
    },
    get mapBox(): null | MapBox {
        return _mapBox;
    },
    set mapBox(value: MapBox) {
        _mapBox = value;
    }
}

export default Components;