<style lang="postcss">
    .field {
        position: absolute;
        left: 0;
        top: 0;
        width: var(--fieldsize);
        height: var(--fieldsize);
        background-image: var(--background-image);
        background-size: cover;

        box-shadow: inset 5px 5px 15px -6px #FFFFFF,
        inset -5px -5px 15px -6px #000000;
        pointer-events: none;



        &.slicedBg {
            background-position-x: calc(-1 * var(--slice-x) * var(--fieldsize));
            background-position-y: calc(-1 * var(--slice-y) * var(--fieldsize));
            background-size: calc(var(--slice-scale) * 100%);
        }
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

    .neighbourField.isEnterable {
        .clickoverlay {
            display: block;
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
    import {DefaultField, getMapField} from "$lib/shared/Map/MapData";
    import type {TypeMapLogic} from "$lib/shared/Map/logic/TypeMapLogic";

    let _UserData = $derived(ClientData.userData) as UserData;
    let POS_X = $derived(_UserData?.posx ?? 0);
    let POS_Y = $derived(_UserData?.posy ?? 0);
    let {posx, posy, relx, rely} = $props();
    let MapField = $state();
    MapField = getMapField(posx, posy) ?? DefaultField;





    let logic: null|TypeMapLogic = $state(null);
    MapField.getLogic().then(value => logic = value);
    let isEnterable = $derived(logic?.isEnterable() ?? false);

    let IsCurrentField = $derived(posx === POS_X && posy === POS_Y);
    let IsNeighbourField = $derived(
        Math.abs(POS_X - posx) <= 1 && Math.abs(POS_Y - posy) <= 1 && !IsCurrentField
    )

    function moveTo() {
        if(!isEnterable) return false;
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
            (isPointInMultiPolygon(point, MapView)));

    }







</script>
<div class="field"
     data-field={`${posx}:${posy}`}
     class:currentField={IsCurrentField}
     class:neighbourField={IsNeighbourField}
     class:isEnterable
     class:slicedBg={MapField.imageSlice !== undefined}

     style:--background-image={`url(${MapField.image})`}
     style:--slice-x={MapField.imageSlice?.x}
     style:--slice-y={MapField.imageSlice?.y}
     style:--slice-scale={MapField.imageSlice?.scale}

     style:left={`calc(var(--fieldsize) * ${relx})`}
     style:top={`calc(var(--fieldsize) * ${rely})`}

     class:isHidden={IsHidden}>
    <div class="clickoverlay" onclick={moveTo} role="button">

    </div>
</div>