<script lang="ts">
    import ClientData from "$lib/client/ClientData.svelte";
    import type {UserData} from "$lib/shared/User/UserData";
    import {Range} from "$lib/shared/Range";
    import {CachedMap} from "$lib/shared/CachedMap";
    import MapField from "$lib/_comps/MapField.svelte";
    import {mount} from 'svelte';

    let outerWrapper: HTMLElement;
    let dimensions: { w: number, h: number } = $state({w: 0, h: 0});


    let _UserData = $derived(ClientData.userData) as UserData;
    let POS_X = $derived(_UserData?.posx ?? 0);
    let POS_Y = $derived(_UserData?.posy ?? 0);


    let {FIELD_SIZE}: { FIELD_SIZE: number } = $props();


    let observer = null;

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


    $effect(() => {
        if (outerWrapper && observer === null) {
            observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    const cr = entry.contentRect;
                    dimensions.w = cr.width;
                    dimensions.h = cr.height;
                }
            });
            observer.observe(outerWrapper);
        }
        return () => {
            observer.disconnect();
        }
    });


    const _mapCache = new CachedMap<string, any>(15000, (k) => {
        outerWrapper.querySelector(`[data-field="${k}"]`)?.remove();
        delete map[k];
    });
    let map: { [key: string]: any } = $state({});
    $effect(() => {
        _mapCache.cleanLock = true;
        Y_RANGE.forEach((Y) => {
            X_RANGE.forEach((X) => {
                _mapCache.put(`${Y}:${X}`, {X, Y});
            })
        })
        _mapCache.cleanLock = false;
        _mapCache.clean();
        _mapCache.entries().forEach(async ([k, v]) => {
            if (typeof map[k] === 'undefined') {
                map[k] = v;
                let div = document.createElement('div');
                div.classList.add('field');
                div.setAttribute('data-field', `${v.X}:${v.Y}`);
                div.setAttribute('data-posx', v.X);
                div.setAttribute('data-posy', v.Y);
                div.style.setProperty('--posx', v.X);
                div.style.setProperty('--posy', v.Y);

                mount(MapField, {
                    target: div,
                    props: {
                        posx: v.X,
                        posy: v.Y
                    }
                });
                outerWrapper.appendChild(div);


            }

        });
    });


    $effect(() => {
        dimensions.w, dimensions.h, POS_X, POS_Y;
        setTimeout(() => {
            outerWrapper.querySelector(`[data-field="${POS_X}:${POS_Y}"]`)?.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
        }, 100);
    })

</script>
<style lang="postcss">
    .outerwrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
        background: blue;
    }

    .outerwrapper > :global(.field) {
        width: var(--fieldsize);
        height: var(--fieldsize);

        border: 1px solid black;
        box-sizing: border-box;

        position: absolute;
        left: calc(var(--posx) * var(--fieldsize));
        top: calc(10000px - (var(--posy) * var(--fieldsize)));
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

</div>
<div class="positiondisplay shadow-2xl backdrop-blur-sm">
    {POS_X} : {POS_Y}
</div>