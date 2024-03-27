<script lang="ts">

    import type { PageData } from './$types';
    import {t} from "$lib/translations";
    import type {RaceEnum} from "$lib/shared/races/RaceEnum";
    let {data} : {data:PageData} = $props();


    let email : string = $state('');
    let password : string = $state('');
    let passwordRepeat : string = $state('');
    let charname : string = $state('');
    let race : keyof typeof RaceEnum = $state('HUMAN');

    let error : any = $state(null);

    $effect(async () => {
        let res = await fetch(location.href, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({action: 'validatemail', email})
        });
        error = await res.json();
    });

    $effect(() => {
        console.log(error);
    })



</script>
<style lang="postcss">
    input {
        @apply shadow border p-2 rounded;
    }
</style>
<svelte:head>
    <title>{$t('website.title.register')}</title>
</svelte:head>

<div>
    <h3 class="text-xl mb-4">{$t('website.title.register')}</h3>
    <div class="grid grid-cols-2 gap-4">
        <label for="input-email">{$t('website.register.email')}</label>
        <input bind:value={email} type="email" id="input-email" />

        <label for="input-password">{$t('website.register.password')}</label>
        <input bind:value={password} type="password" id="input-password">

        <label for="input-password-confirm">{$t('website.register.password-repeat')}</label>
        <input bind:value={passwordRepeat} type="password" id="input-password-confirm">


        <label for="input-name">{$t('website.register.name')}</label>
        <input bind:value={charname} class="input" placeholder={$t('website.register.name-small')} type="text" id="input-name" />

        <label for="select-race">{$t('website.register.select-race')}</label>
        <select bind:value={race} id="select-race">
            {#each data.races as race}
                <option value={race}>{$t('race.' + race)}</option>
            {/each}
        </select>
    </div>

</div>