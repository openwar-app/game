<style lang="postcss">
    .Monsterlist, .Itemlist, .FieldDescription {
        border: 2px solid black;
        border-radius: 5px;
        @apply mb-4 mx-0.5;

        .Header {
            padding: 3px;
            font-weight: bold;
            font-size: 1.2em;
            background: linear-gradient(to bottom, theme('colors.red.900'), theme('colors.red.500'));

        }

        ul li {
            padding: 0.25em 1em;
            @apply border-t border-gray-800;
        }

        div.content {
            padding: 0.25em;
        }
    }

    .Itemlist .Header {
        background: linear-gradient(to bottom, theme('colors.green.900'), theme('colors.green.500'));
    }

    .FieldDescription .Header {
        background: linear-gradient(to bottom, theme('colors.blue.500'), theme('colors.blue.300'));

    }

</style>
<script lang="ts">
    import ClientData from "$lib/client/ClientData.svelte";
    import type {UserData} from "$lib/shared/User/UserData";
    import {DefaultField, getMapField} from "$lib/shared/Map/MapData";
    import type {TypeMapLogic} from "$lib/shared/Map/logic/TypeMapLogic";
    import {MapField} from "$lib/shared/Map/MapField";
    import Default from "$lib/shared/Map/logic/Default";
    import {t} from "$lib/translations";
    let _UserData = $derived(ClientData.userData) as UserData;
    let POS_X = $derived(_UserData?.posx ?? 0);
    let POS_Y = $derived(_UserData?.posy ?? 0);
    let mapField : MapField|null = $state(null);

    $effect(() => {
        mapField = getMapField(POS_X, POS_Y) ?? DefaultField;
        mapField.getLogic().then(value => logic = value);
    });
    let logic: typeof TypeMapLogic = $state(Default);



</script>
<div class="FieldDescription mt-0">
    <div class="Header">
        <h2>{$t('game.infobox.description')}</h2>
    </div>
    <div class="content">
        <svelte:component this={logic?.getDescriptionComponent(mapField)} mapField={mapField}/>
    </div>

</div>

<div class="Monsterlist">
    <div class="Header">
        <h2>{$t('game.infobox.monsterlistheader')}</h2>

    </div>
    <ul>
        <li>Monster 1</li>
        <li>Monster 2</li>
        <li>Monster 3</li>
    </ul>
</div>


<div class="Itemlist">
    <div class="Header">
        <h2>{$t('game.infobox.itemlistheader')}</h2>

    </div>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</div>