<script lang="ts">
    import ResourceGlobe from "./BottomBar/ResourceGlobe.svelte";
    import ClientData from "$lib/client/ClientData.svelte";

    let originalHeight = 233;
    let originalWidth = 2359;


    const maxScale = 0.6

    let observer = null, outerWrapper, wrapper;
    let scale = 1.0;

    $effect(() => {
        if (outerWrapper && observer === null) {
            observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    const cr = entry.contentRect;
                    scale = Math.min(maxScale, cr.width / originalWidth);
                    wrapper.style.transform = `scale(${scale}) translateX(-50%)`;
                }
            });
            observer.observe(outerWrapper);
        }
        return () => {
            observer.disconnect();
        }
    });




    let life = $derived(ClientData?.userData?.life ?? 0);
    let mana = $derived(ClientData?.userData?.mana ?? 0);
    let maxLife = $derived(ClientData?.userData?.stats.maxHp ?? 0);
    let maxMana = $derived(ClientData?.userData?.stats.maxMana ?? 0);

    let xp = $derived(ClientData?.userData?.xp ?? 0);
    let xpNeeded = $derived(XP_FOR_LEVEL((ClientData?.userData?.level ?? 1)+1));
    let xpPerc = $derived((xp / xpNeeded) * 100);

    import SettingsButtonPNG from "./BottomBar/bb_bar_menu_btn_settings.png";
    import ItemsButtonPNG from "./BottomBar/bb_bar_menu_btn_items.png";
    import {derived} from "svelte/store";
    import {XP_FOR_LEVEL} from "$lib/shared/Level";

</script>

<style>
    #bottomBar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 361px;
    }

    .bottomBarDesign {
        background: url("./BottomBar/ab1_main_frame.png") no-repeat;
        background-size: 1937px 233px;
        width: 1937px;
        height: 233px;
        pointer-events: none;


        .settingsButton {
            position: absolute;
            right: 552px;
            top: 79px;
            height: 65px;
            width:64px;
            background: rgba(0,0,0,.6);

            img {
                pointer-events: all;
                cursor: pointer;
                &:hover {
                    filter: brightness(1.2);
                }
            }
        }

        .itemsButton {
            position: absolute;
            right: 632px;
            top: 79px;
            height: 65px;
            width:64px;
            background: rgba(0,0,0,.6);

            img {
                pointer-events: all;
                cursor: pointer;
                &:hover {
                    filter: brightness(1.2);
                }
            }
        }

    }

    .wrapper {
        position: absolute;
        bottom: 0;
        left: 50%;
        height: 100%;
        width: 2359px;
        margin: 0 auto;
        transform-origin: bottom left;
    }


    .innerWrapper {
        z-index: 3;
        position: absolute;
        left: 211px;
        bottom: 10px;
        pointer-events: none;
    }


    .globe {
        height: 343px;
        width: 361px;
        position: absolute;
        bottom: 0;

        z-index: 1;

        &.health {
            background-image: url("./BottomBar/ab1_globe_empty_left.png");

            & > div {
                position: relative;
                left: 8px;
                top: 7px;
            }
        }

        &.mana {
            right: 0;
            background-image: url("./BottomBar/ab1_globe_empty_right.png");

            & > div {
                position: absolute;
                right: 8px;
                top: 7px;
            }
        }

        & > div {
            height: 280px;

        }
    }


    .xpBar {
        pointer-events: all;
        position: absolute;
        bottom:0;
        background: black;
        left: 116px;
        right: 116px;
        height: 46px;

        .filled {
            position: absolute;
            background: green;
            height:100%;
            width:0;
            transition: 300ms ease all;
        }

        &:hover .label {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            color: white;
            font-size: 1.5em;
            text-shadow: 2px 2px 2px black;
        }
    }
</style>
<div id="bottomBar" clasS="pointer-events-none" bind:this={outerWrapper}>


    <div class="wrapper" bind:this={wrapper}>
        <div class="health globe">
            <div>
                <ResourceGlobe currentValue={life} maxValue={maxLife} ressourceColor="#ff0000"/>
            </div>

        </div>
        <div class="xpBar">
            <div class="filled" style:width={`${xpPerc}%`}></div>
            <div class="label">{xp.toLocaleString()} / {xpNeeded.toLocaleString()}</div>
        </div>

        <div class="mana globe">
            <div>
                <ResourceGlobe currentValue={mana} maxValue={maxMana} ressourceColor="#3333FF"/>
            </div>

        </div>

        <div class="innerWrapper" style="width:{originalWidth}px; height: {originalHeight}px;">

            <div class="bottomBarDesign">
                <div class="settingsButton">
                    <img src={SettingsButtonPNG} alt="Settings" class="h-full w-full"/>
                </div>
                <div class="itemsButton">
                    <img src={ItemsButtonPNG} alt="Inventory" class="h-full w-full"/>
                </div>
            </div>

        </div>

    </div>
</div>