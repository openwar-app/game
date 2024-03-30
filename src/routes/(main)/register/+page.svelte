<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import {t} from "$lib/translations";
    import type {RaceEnum} from "$lib/shared/races/RaceEnum";
    let {data} : {data:PageData} = $props();


    let email : string = $state('');
    let password : string = $state('');
    let passwordRepeat : string = $state('');
    let charname : string = $state('');
    let race : keyof typeof RaceEnum = $state('HUMAN');

    type errorType = { status:'ok'|'error', error?: string }|null;

    let error : { email: errorType, password: errorType, charname: errorType } = $state({email: null, password: null, charname:null});


    let registerButtonDisabled = $derived(!(error.charname?.status === 'ok' && error.email?.status === 'ok' && error.password?.status === 'ok'));

    $effect(() => {
        email;
        (async () => {
            if(email === '') return error.email = null;
            let res = await fetch(location.href, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({action: 'validatemail', email})
            });
            error.email = await res.json();
        })();
    });

    $effect(() => {
        charname;
        (async () => {
            if(charname === '') return error.charname = null;
            let res = await fetch(location.href, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({action: 'validatecharname', charname})
            });
            error.charname = await res.json();
        })();
    });

    $effect(()=>{

        password = password.trim();
        passwordRepeat = passwordRepeat.trim();
        if(password === '') { error.password = null; return; }

        if(password.length < 8) {
            error.password = {status: 'error', error: 'website.register.password-too-short'};
            return;
        }
        let complexity = 0;
        if(/[a-z]/.test(password)) complexity++;
        if(/[A-Z]/.test(password)) complexity++;
        if(/[0-9]/.test(password)) complexity++;
        if(/[^a-zA-Z0-9]/.test(password)) complexity++;
        if(complexity < 3) {
            error.password = {status: 'error', error: 'website.register.password-too-simple'};
            return;
        }
        if(password !== passwordRepeat) {
            error.password = {status: 'error', error: 'website.register.password-mismatch'};
        } else {
            error.password = {status: 'ok'};
        }

    });

    async function register() {
        let res = await fetch(location.href, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({action: 'register', email, password, charname, race})
        });
        let data = await res.json();
        if (data.status === 'ok') {
            goto('/register-success', {replaceState: true});
            return;
        }
    }

</script>
<style lang="postcss">
    input {
        @apply shadow border p-2 rounded;
    }
</style>
<svelte:head>
    <title>{$t('website.title.register')}</title>
</svelte:head>

<div class="">
    <h3 class="text-xl mb-4">{$t('website.title.register')}</h3>
    {#if error.email && error.email.status === 'error'}
        <p class="text-red-500">{$t(error.email.error)}</p>
    {/if}
    {#if error.password && error.password.status === 'error'}
        <p class="text-red-500">{$t(error.password.error)}</p>
    {/if}
    {#if error.charname && error.charname.status === 'error'}
        <p class="text-red-500">{$t(error.charname.error)}</p>
    {/if}
    <div class="w-full grid grid-cols-[max-content_auto] grid- gap-4">
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


        <button on:click={register} class="btn btn-red" disabled={registerButtonDisabled}>{$t('website.register.buttonText')}</button>
    </div>

</div>