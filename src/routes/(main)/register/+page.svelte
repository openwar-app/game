<script lang="ts">

    import type { PageData } from './$types';
    import {t} from "$lib/translations";
    let {data} : {data:PageData} = $props();
</script>
<svelte:head>
    <title>{$t('website.title.register')}</title>
</svelte:head>

<div>
    <h3 class="text-xl mb-4">{$t('website.title.register')}</h3>
    <div class="flex gap-4">
        <label for="select-race">{$t('website.register.select-race')}</label>
        <select id="select-race">
            {#each data.races as race}
                <option value={race}>{$t('race.' + race)}</option>
            {/each}
        </select>
    </div>

</div>