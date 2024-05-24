<script lang="ts">
    import type {MapField} from "$lib/shared/Map/MapField";
    import {t} from "$lib/translations";
    let {mapField} : {mapField: MapField} = $props();
</script>
{$t('game.map.rice.description')}