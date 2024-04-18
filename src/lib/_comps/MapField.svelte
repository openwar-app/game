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


</style>
<script lang="ts">
    import ClientData from "$lib/client/ClientData.svelte";
    import type {UserData} from "$lib/shared/User/UserData";

    let _UserData = $derived(ClientData.userData) as UserData;
    let POS_X = $derived(_UserData?.posx ?? 0);
    let POS_Y = $derived(_UserData?.posy ?? 0);
    let {posx, posy} = $props();
</script>
<div class="field" class:currentField={posx===POS_X && posy === POS_Y}>
    {posx} / {posy}
</div>