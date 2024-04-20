<style lang="postcss">
    .field {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: green;

        box-shadow: inset 5px 5px 15px -6px #FFFFFF,
        inset -5px -5px 15px -6px #000000;
        pointer-events: none;

    }

    .currentField {
        box-shadow: inset 5px 5px 15px -6px #FFFF00,
        inset -5px -5px 15px -6px #FFDD00;
        border: 1px solid #FFFF00;
    }

    .clickoverlay {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
    }

    .neighbourField {
        .clickoverlay {
            display: block;

            background: red;
            pointer-events: all;
            cursor: pointer;
        }
    }

    .isHidden {
        .clickoverlay {
            display: block;
            cursor: not-allowed;
            background: black;
        }
    }


</style>
<script lang="ts">
    import ClientData from "$lib/client/ClientData.svelte";
    import type {UserData} from "$lib/shared/User/UserData";
    import {websocket} from "$lib/client/websocket";
    import {PlayerMoveTo} from "$lib/shared/network/PlayerMoveTo";
    import {type Pair} from "polygon-clipping";
    import {isPointInMultiPolygon} from "$lib/shared/utils";

    let _UserData = $derived(ClientData.userData) as UserData;
    let POS_X = $derived(_UserData?.posx ?? 0);
    let POS_Y = $derived(_UserData?.posy ?? 0);
    let {posx, posy} = $props();

    let IsCurrentField = $derived(posx === POS_X && posy === POS_Y);
    let IsNeighbourField = $derived(
        Math.abs(POS_X - posx) <= 1 && Math.abs(POS_Y - posy) <= 1 && !IsCurrentField
    )

    function moveTo() {
        let direction = {
            x: posx - POS_X,
            y: posy - POS_Y
        }
        websocket.sendPacket(new PlayerMoveTo(direction));
    }

    let point: Pair = [posx, posy];


    let MapView = $derived(ClientData.MapView.polygon);
    let IsHidden = $derived.by(() => {
        cachedHidden = calcIsHidden();
        return cachedHidden;
    })

    let cachedHidden = true;

    function calcIsHidden() {
        if (!cachedHidden) {
            return false;
        }
        return !(MapView.length > 0 &&
            (isPointInMultiPolygon(point, structuredClone(MapView))));

    }







</script>
<div class="field" class:currentField={IsCurrentField} class:neighbourField={IsNeighbourField}
     class:isHidden={IsHidden}>
    <div class="clickoverlay" on:click={moveTo}>

    </div>
</div>