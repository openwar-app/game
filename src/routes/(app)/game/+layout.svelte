<script lang="ts">
    import type {PageData} from './$types';
    import {websocket} from "$lib/client/websocket";
    import {GetUser} from "$lib/shared/network/GetUser";

    let {data}: {data: PageData} = $props();

    websocket.connect();
    websocket.sendPacket(new GetUser());

    websocket.on('open', () => {
        console.log('socket opened');
    });

    websocket.on('close', () => {
        console.log('socket closed');
    });



</script>

<slot />