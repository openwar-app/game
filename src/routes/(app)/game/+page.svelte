<script lang="ts">
    import ClientData from "$lib/client/ClientData.svelte";
    import InfoBox from "$lib//_comps/InfoBox.svelte";
    import MainBox from "$lib//_comps/MainBox.svelte";
    import BottomBar from "$lib//_comps/BottomBar.svelte";

    //let userData = $derived(ClientData.userData);
    let resizing = $state(false);

    let widthLeftCol = $state(400);

    function resize(event) {
        if (resizing) {
            widthLeftCol = event.clientX;
        }
    }

    let infoBoxLeft = $derived(ClientData.infoBoxLeft ?? true);

</script>
<svelte:head>
    <title>OpenWar Game</title>
</svelte:head>
<svelte:window onmouseup={() => resizing=false} onmousemove={resize}/>
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
            <div class="flex-1 p-2 relative">
                <svelte:component this={infoBoxLeft? InfoBox : MainBox}/>
            </div>
            <div id="resizeLeftColBorder" class="bg-gray-800 overflow-hidden" onmousedown={() => resizing = true}>
            </div>

        </div>
        <div class="flex-auto relative">
            <svelte:component this={!infoBoxLeft? InfoBox : MainBox}/>
        </div>
    </div>
    <BottomBar/>
</div>
