<script lang="ts">
    import "../app.css";
    import {setContext, type Snippet} from 'svelte';
    import type { LayoutData } from './$types';


    let {data, children} : {data: LayoutData, children: Snippet} = $props();


    setContext('serverLocales', data.serverLocales);



</script>

{@render children()}