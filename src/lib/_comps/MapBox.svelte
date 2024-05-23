<script lang="ts">
    import ClientData from "$lib/client/ClientData.svelte";
    import type {UserData} from "$lib/shared/User/UserData";
    import {Range} from "$lib/shared/Range";
    import MapField from "$lib/_comps/MapField.svelte";


    import {websocket} from "$lib/client/websocket";
    import {MapView} from "$lib/shared/network/MapView";
    import {tick, untrack} from "svelte";

    $effect(() => {
        let MapViewListener = websocket.on('onPacketMapView', (mv: MapView) => {
            ClientData.MapView = mv;
        });
        websocket.sendPacket(new MapView());
        return () => {
            websocket.off('onPacketMapView', MapViewListener);
        }
    })


    let outerWrapper: HTMLElement;
    let dimensions: { w: number, h: number } = $state({w: 0, h: 0});


    let _UserData = $derived(ClientData.userData) as UserData;
    let POS_X = $derived(_UserData?.posx ?? -100);
    let POS_Y = $derived(_UserData?.posy ?? - 100);


    const FIELD_SIZE = 75;


    let observer: null|ResizeObserver = null;

    let FIELDS_PER_ROW = $derived((Math.ceil(dimensions.w / FIELD_SIZE ?? 75) + 2) ?? 3);
    let FIELDS_PER_COL = $derived((Math.ceil(dimensions.h / FIELD_SIZE ?? 75) + 2) ?? 3);


    let Y_RANGE = $derived(Range(
        POS_Y + (FIELDS_PER_COL / 2) + 1,
        POS_Y - (FIELDS_PER_COL / 2) - 1,
        -1
    ));
    let X_RANGE = $derived(Range(
        POS_X - (FIELDS_PER_ROW / 2) - 1,
        POS_X + (FIELDS_PER_ROW / 2) + 1
    ));



    let mapFields: fieldInfo[] = $state([]);
    type fieldInfo = {x: number, y: number, _uid: string};

    let MIN_X = $state(0),
        MAX_X = $state(0),
        MIN_Y = $state(0),
        MAX_Y = $state(0);
    $effect(() => {
        [MIN_X, MAX_X, MIN_Y, MAX_Y] = [
            Math.min(...X_RANGE),
            Math.max(...X_RANGE),
            Math.min(...Y_RANGE),
            Math.max(...Y_RANGE)
        ];
        untrack(() => {
            mapFields = mapFields.filter(f => {
                return f.x >= MIN_X && f.x <= MAX_X && f.y >= MIN_Y && f.y <= MAX_Y;
            });
            for(let x = MIN_X; x <= MAX_X; x++) {
                for(let y = MIN_Y; y <= MAX_Y; y++) {
                    if(!mapFields.find(f => f.x === x && f.y === y)) {
                        mapFields.push({x, y, _uid: `${x}:${y}`});
                    }

                }
            }
        });



    });


    $effect(() => {
        if (outerWrapper && observer === null) {
            observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    const cr = entry.contentRect;
                    dimensions.w = cr.width;
                    dimensions.h = cr.height;
                }
            });

            const cr = outerWrapper.getBoundingClientRect();
            dimensions.w = cr.width;
            dimensions.h = cr.height;

            observer.observe(outerWrapper);
            setTimeout(() => {
                scrollTo();
            }, 0);
        }
        return () => {
            observer?.disconnect();
        }
    });





    function scrollTo() {
        let w = dimensions.w;
        let h = dimensions.h;
        let scrollW = outerWrapper.scrollWidth;
        let scrollH = outerWrapper.scrollHeight;
        let x = (scrollW - w) / 2;
        let y = (scrollH - h) / 2;
        outerWrapper.scrollTo(x, y);
    }

    $effect(() => {
        // noinspection CommaExpressionJS
        dimensions.w, dimensions.h, POS_X, POS_Y;
        scrollTo();
    });



</script>
<style lang="postcss">
    .outerwrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
    }

    .positiondisplay {
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translate(-50%, 0);
        @apply bg-gray-700/30 p-1 text-white text-xl;
        z-index: 100;
        text-shadow: -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
    }
</style>
<div class="outerwrapper" bind:this={outerWrapper} style="--fieldsize:{FIELD_SIZE}px">
    {#each mapFields as field (field._uid)}
        <MapField   posx={field.x} posy={field.y}
                    relx={field.x - MIN_X}
                    rely={MAX_Y - field.y}
        />
    {/each}
</div>
<div class="positiondisplay shadow-2xl backdrop-blur-sm">
    {POS_X} : {POS_Y}
</div>