import type ChatBox from "../../routes/(app)/game/_comps/ChatBox.svelte";


let _chatBox: null | ChatBox = $state(null);

const Components = {
    get chatBox(): null | ChatBox {
        return _chatBox;
    },
    set chatBox(value: ChatBox) {
        _chatBox = value;
    }
}

export default Components;