<script lang="ts">
    import ClientData from "$lib/client/ClientData.svelte";
    import InfoBox from "./_comps/InfoBox.svelte";
    import MainBox from "./_comps/MainBox.svelte";
    import BottomBar from "./_comps/BottomBar.svelte";

    let userData = $derived(ClientData.userData);
    let resizing = $state(false);

    let widthLeftCol = $state(400);

    function resize(event) {
        if (resizing) {
            widthLeftCol = event.clientX;
        }
    }

    let infoBoxLeft = $derived(ClientData.infoBoxLeft ?? true);

</script>
<svelte:window on:mouseup={() => resizing=false} on:mousemove={resize}/>
<style lang="postcss">

    #resizeLeftColBorder {
        width: 2px;
        cursor: ew-resize;
        @apply bg-gray-800 bg-opacity-10;

        &:hover {
            @apply bg-opacity-50;
        }
    }

    .wrapper {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
    }




</style>

<div class="wrapper">
    <div class="flex  w-full h-full">
        <div id="leftcol" class="flex" style="width: {widthLeftCol}px">
            <div class="flex-1 p-2">
                <svelte:component this={infoBoxLeft? InfoBox : MainBox}/>
            </div>
            <div id="resizeLeftColBorder" class="bg-gray-800 overflow-hidden" on:mousedown={() => resizing = true}>aaa
            </div>

        </div>
        <div class="flex-auto">
            <svelte:component this={!infoBoxLeft? InfoBox : MainBox}/>
        </div>
    </div>
    <BottomBar/>
</div>
