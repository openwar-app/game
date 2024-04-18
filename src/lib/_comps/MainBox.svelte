<script lang="ts">
    import ChatBox from "./ChatBox.svelte";
    import Components from "$lib/client/ComponentsStore.svelte";
    import MapBox from "./MapBox.svelte";

    let chatbox = $state(null);
    let mapbox = $state(null);
    $effect(() => Components.chatBox = chatbox);
    $effect(() => Components.mapBox = mapbox);
</script>
<style lang="postcss">
    .chatbox {
        position: absolute;
        bottom: 250px;
        left: 30px;
        width: 600px;
        height: 300px;
        z-index: 100;
    }

    .mapbox {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        overflow: hidden;
    }
</style>

<div class="chatbox">
    <ChatBox bind:this={chatbox}></ChatBox>
</div>
<div class="mapbox">
    <MapBox bind:this={mapbox} FIELD_SIZE={75}></MapBox>
</div>