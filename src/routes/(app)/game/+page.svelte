<script lang="ts">
    import ClientData from "$lib/client/ClientData.svelte";

    let userData = $derived(ClientData.userData);
    let resizing = $state(false);

    let widthLeftCol = $state(400);

    function resize(event) {
        if (resizing) {
            widthLeftCol = event.clientX;
        }
    }

</script>
<svelte:window on:mouseup={() => resizing=false} on:mousemove={resize}/>
<style lang="postcss">

    #resizeLeftColBorder {
        width: 2px;
        cursor: ew-resize;
        @apply bg-gray-800 bg-opacity-20;

        &:hover {
            @apply bg-opacity-50;
        }
    }

    .wrapper {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }


    .Monsterlist, .Itemlist {
        border: 2px solid black;
        border-radius: 5px;
        margin: 2em 0.25em;

        .Header {
            padding: 3px;
            font-weight: bold;
            font-size: 1.2em;
            background: linear-gradient(theme('colors.red.900'), theme('colors.red.500'));

        }

        ul li {
            padding: 0.25em 1em;
            @apply border-t border-gray-800;
        }
    }

    .Itemlist .Header {
        background: linear-gradient(theme('colors.green.900'), theme('colors.green.500'));
    }

</style>

<div class="wrapper">
    <div class="flex  w-full h-full">
        <div id="leftcol" class="flex" style="width: {widthLeftCol}px">
            <div class="flex-1 p-2">
                <h1>Du stehst auf einer Wiese</h1>
                <div>
                    Hier steht auch ganz vieeeel Text
                </div>


                <div class="Monsterlist">
                    <div class="Header">
                        <h2>Monster auf diesem Feld</h2>

                    </div>
                    <ul>
                        <li>Monster 1</li>
                        <li>Monster 2</li>
                        <li>Monster 3</li>
                    </ul>
                </div>


                <div class="Itemlist">
                    <div class="Header">
                        <h2>Items auf diesem Feld</h2>

                    </div>
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </div>
            </div>
            <div id="resizeLeftColBorder" class="bg-gray-800 overflow-hidden" on:mousedown={() => resizing = true}>aaa
            </div>

        </div>
        <div class="flex-auto">
        </div>
    </div>
</div>
