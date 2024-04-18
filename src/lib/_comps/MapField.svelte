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

    }


</style>
<script lang="ts">
    let {posx, posy} = $props();
</script>
<div class="field">
    {posx} / {posy}
</div>