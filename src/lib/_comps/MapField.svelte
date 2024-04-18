<style lang="postcss">
    .field {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: green;
    }


</style>
<script lang="ts">
    let {posx, posy} = $props();
</script>
<div class="field">
    {posx} / {posy}
</div>