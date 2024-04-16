<script lang="ts">
    import {websocket} from "$lib/client/websocket";
    import {Packet} from "$lib/shared/network";
    import type {ChatMessage} from "$lib/shared/network/ChatMessage";

    let chatmsg = $state('');

    let _showChat = $state(true);

    export function showChat() {
        _showChat = true;
    }


    function sendChat() {
        let msg = chatmsg.trim();
        if (msg.length > 0) {
            websocket.sendPacket(new Packet.SendChat(msg));
        }
        chatmsg = '';
    }


    let newChatMessageEvent;
    $effect(() => {
        newChatMessageEvent = websocket.on('onPacketChatMessage', (message: ChatMessage) => {
            messages.push(message);
        });

        return () => {
            websocket.off('onPacketChatMessage', newChatMessageEvent);
        }

    })


    let messages: ChatMessage[] = $state([]);

</script>
<style lang="postcss">
    .input-line {
        border-top: 1px solid black;

        input {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .3);
            pointer-events: all;
        }

    }
</style>
<div class="flex w-full h-full bg-gray-700/30 flex-col">
    <div class="content w-full flex-1 overflow-hidden">
        <div class="h-full w-full overflow-y-scroll p-2">
            {#each messages as message}
                <div>
                    <strong>{message.fromUser}:</strong> {message.message}
                </div>
            {/each}
        </div>
    </div>
    {#if _showChat}
        <div class="input-line">
            <form method="POST" on:submit|preventDefault={sendChat}>
                <input type="text" class="p-2 outline-0" bind:value={chatmsg}/>
            </form>

        </div>
    {/if}
</div>
