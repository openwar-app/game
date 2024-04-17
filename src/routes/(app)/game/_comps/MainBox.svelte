<script lang="ts">
    import ChatBox from "./ChatBox.svelte";
    import Components from "$lib/client/ComponentsStore.svelte";

    let chatbox = $state(null);
    $effect(() => Components.chatBox = chatbox);
</script>
<style lang="postcss">
    .chatbox {
        position: absolute;
        bottom: 250px;
        left: 30px;
        width: 600px;
        height: 300px;
    }
</style>

<div class="chatbox">
    <ChatBox bind:this={chatbox}></ChatBox>
</div>
