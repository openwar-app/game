<script lang="ts">
    import "../app.css";
    import type { LayoutData } from './$types';


    export let data : LayoutData;
    let cssVariables : {[key: string]:string} = {};
    Object.entries(data.layout?.color ?? {}).forEach(([colorname, colorvalue]) => {
        cssVariables['--color-'+colorname] = colorvalue as string;
    });
    function cssStringify(obj: {[key: string]: string}) {
        return Object.keys(obj).map(k => `${k}: ${obj[k] as string}`).join(';')
    }
</script>
<div style={cssStringify(cssVariables)}>
    <slot />
</div>
