<script lang="ts">
    import Select, { Option } from '@smui/select';
    import type { PageData } from './$types';
    let {data} : {data:PageData} = $props();
</script>


<div>
    <Select>
        {#each data.races as race}
            <Option value={race}>{race}</Option>
        {/each}
    </Select>
</div>