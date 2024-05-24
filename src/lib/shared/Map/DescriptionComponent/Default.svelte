<script lang="ts">
    import type {MapField} from "$lib/shared/Map/MapField";

    let {mapField} : {mapField: MapField} = $props();
</script>
{mapField?.description}