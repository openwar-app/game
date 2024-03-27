<script lang="ts">
    import "../app.css";
    import {setContext } from 'svelte';
    import type { LayoutData } from './$types';


    let {data} = $props();


    setContext('serverLocales', data.serverLocales);



</script>

<slot />