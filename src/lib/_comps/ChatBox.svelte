<script lang="ts">
    import {websocket} from "$lib/client/websocket";
    import {Packet} from "$lib/shared/network";
    import type {ChatMessage} from "$lib/shared/network/ChatMessage";

    const scrollToBottom = async () => {
        messageBox.scroll({top: messageBox.scrollHeight, behavior: 'smooth'});
    };


    $effect(() => {
        if (messages.length) setTimeout(scrollToBottom, 100);
    })

    let input = $state();
    let messageBox = $state();

    let chatmsg = $state('');


    let _showChat = $state(false);

    export function showChat() {
        _showChat = true;
        input.focus({
            forceVisible: true
        });
    }

    export function hideChat() {
        _showChat = false;
        input.blur();
    }


    function sendChat() {
        let msg = chatmsg.trim();
        if (msg.length > 0) {
            websocket.sendPacket(new Packet.SendChat(msg));
        }
        chatmsg = '';
        hideChat();
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

<svelte:window on:keypress={(e) => {
    if(e.key === 'Enter') {
        _showChat ? hideChat() : showChat();
    }
}}/>

<style lang="postcss">
    .input-line {
        border-top: 1px solid black;

        input {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .3);
            pointer-events: none;
        }

    }

    .content > div {
        overflow-y: scroll;
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        scrollbar-width: none; /* Firefox */
    }

    .activeChat {
        .content {
            @apply bg-gray-700/30;
        }

        .content > div {
            -ms-overflow-style: unset; /* Internet Explorer 10+ */
            scrollbar-width: unset; /* Firefox */
        }

        .input-line input {
            pointer-events: all;
        }
    }
</style>
<div class="flex w-full h-full flex-col" class:activeChat={_showChat}>
    <div class="content w-full flex-1 overflow-hidden bg-gray-700/5 ">
        <div class="h-full w-full p-2" bind:this={messageBox} id="divId">
            {#each messages as message (message.guid)}
                <div>
                    <strong>{message.fromUser}:</strong> {message.message}
                </div>
            {/each}
        </div>
    </div>

    <div class="input-line" class:opacity-0={!_showChat}>
        <form method="POST" on:submit|preventDefault={sendChat}>
            <input type="text" name="inputchat" class="p-2 outline-0" on:keypress|stopPropagation={() => {}}
                   bind:value={chatmsg} bind:this={input}/>
        </form>
    </div>

</div>
