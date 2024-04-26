<script lang="ts">
    import type {PageData} from './$types';
    import {websocket} from "$lib/client/websocket";
    import {GetUser} from "$lib/shared/network/GetUser";
    import {getUserId, setUserId} from "$lib/client/UserId.svelte";
    import type {UserData} from "$lib/shared/network/UserData";
    import ClientData from "$lib/client/ClientData.svelte";

    let {data, children}: {data: PageData, children: Snippet} = $props();
    setUserId(data.userId);

    let openEvent, closeEvent, userDataEvent;


    $effect(() => {
        websocket.connect();
        websocket.sendPacket(new GetUser());

        openEvent = websocket.on('open', () => {
            console.log('socket opened');
        });

        closeEvent = websocket.on('close', () => {
            console.log('socket closed');
        });

        userDataEvent = websocket.on('onPacketUserData', (message: UserData) => {
            if (message.userid === getUserId()) {
                ClientData.userData = message;
            }
        });

        return () => {
            websocket.off('open', openEvent);
            websocket.off('close', closeEvent);
            websocket.off('onPacketUserData', userDataEvent);
        }

    })





</script>

{@render children()}