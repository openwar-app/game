<script lang="ts">
    let {
        ressourceColor = '#ff0000',
        maxValue = 100,
        currentValue = 50
    }: {
        ressourceColor: string,
        maxValue: number,
        currentValue: number
    } = $props();

    let percent = $derived(100 / maxValue * currentValue);


</script>
<style>
    .globe-border {
        background-image: url("./ab1_globe_border_overlay.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: relative;
        z-index: 1;
    }


    .globe-bg {
        background-image: url("./ab1_globe_fill.png");
        background-size: cover;
        background-position: center;
        background-repeat: repeat;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        z-index: 0;
        overflow: hidden;
        padding: 5px;
        transition: 300ms ease all;

    }


    .globe-filled {
        background-color: var(--color-ressource);
        mix-blend-mode: multiply;
        width: 100%;
        height: 100%;
    }


    .ressourceValue {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        text-shadow: -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
        @apply text-2xl;
    }
</style>

<div class="rounded-full h-full aspect-square relative overflow-hidden bg-black">
    <div class="globe-bg" style="--color-ressource: {ressourceColor};clip-path: rect({100-percent}% 100% 100% 0%)">
        <div class="globe-filled"></div>
    </div>

    <div class="text-white shadow absolute ressourceValue flex">
        <div class=" font-bold">{currentValue} / {maxValue}</div>
    </div>

    <div class="globe-border"></div>
</div>