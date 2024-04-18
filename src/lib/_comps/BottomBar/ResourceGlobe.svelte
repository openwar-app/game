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
        box-shadow: inset 0 0 20px 10px rgba(0, 0, 0, 0.5);
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

        .globe-filled {
            background-color: var(--color-ressource);
            mix-blend-mode: multiply;
            width: 100%;
            height: 100%;
        }

    }


    .globe-shadow {
        width: calc(100% - 18px);
        height: calc(100% - 18px);
        margin: 9px;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        z-index: 0;
        overflow: hidden;
        box-shadow: inset 0 0 17px 3px rgba(0, 0, 0, 1);

    }

    .globe-full-bg {
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

        .globe-filled {
            background-color: #666;
            mix-blend-mode: multiply;
            width: 100%;
            height: 100%;
        }

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

    .globe-lightning {
        position: absolute;
        top: 35%;
        right: 35%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
        border-radius: 50%;
        box-shadow: 0 0 50px 40px rgba(255, 255, 255, 0.5);
    }
</style>

<div class="rounded-full h-full aspect-square relative overflow-hidden bg-black">
    <div class="globe-full-bg">
        <div class="globe-filled"></div>
    </div>
    <div class="globe-bg" style="--color-ressource: {ressourceColor};clip-path: rect({100-percent}% 100% 100% 0%)">
        <div class="globe-filled"></div>
    </div>

    <div class="globe-shadow"></div>

    <div class="text-white shadow absolute ressourceValue flex">
        <div class=" font-bold">{currentValue} / {maxValue}</div>
    </div>

    <div class="globe-lightning"></div>

    <div class="globe-border"></div>
</div>