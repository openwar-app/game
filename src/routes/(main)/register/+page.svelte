<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import {t} from "$lib/translations";
    import type {RaceEnum} from "$lib/shared/races/RaceEnum";
    import Select, {Option} from "@smui/select";
    import Textfield from "@smui/textfield";
    import HelperText from '@smui/textfield/helper-text';


    let {data} : {data:PageData} = $props();


    let email : string = $state('');
    let password : string = $state('');
    let passwordRepeat : string = $state('');
    let charname : string = $state('');
    let race : keyof typeof RaceEnum = $state('HUMAN');

    type errorType = { status:'ok'|'error', error?: string }|null;

    let error : {
        emailFlag:boolean, email: errorType,
        passwordFlag:boolean, password: errorType,
        charnameFlag:boolean, charname: errorType
    } = $state({
        emailFlag: false, email: null,
        passwordFlag:false, password: null,
        charnameFlag: false, charname:null
    });



    let registerButtonDisabled = $derived(!(error.charname?.status === 'ok' && error.email?.status === 'ok' && error.password?.status === 'ok'));


    $effect(() => {
        error.emailFlag = error.email !== null;
        error.passwordFlag = error.password !== null;
        error.charnameFlag = error.charname !== null;
    });

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

<svelte:head>
    <title>{$t('website.title.register')}</title>
</svelte:head>


<div class="">
    <h3 class="text-xl mb-4">{$t('website.title.register')}</h3>

    <div class="w-96">
        <div class="my-4">
            <Textfield
                    class="shaped-outlined w-full bg-white"
                    variant="outlined"
                    label={$t('website.register.email')} bind:value={email} type="email" id="input-email"
                    bind:invalid={error.emailFlag}>
                    <HelperText persistent slot="helper">
                        {#if error.email && error.email.status === 'error'}
                            <span class="text-red-600">{$t(error.email.error)}</span>
                        {/if}
                    </HelperText>
            </Textfield>
        </div>
        <div class="my-4">
            <Textfield
                    bind:invalid={error.passwordFlag}
                    class="shaped-outlined w-full bg-white"
                    variant="outlined"
                    label={$t('website.register.password')} bind:value={password} type="password" id="input-password">
                <HelperText persistent slot="helper">
                    {#if error.password && error.password.status === 'error'}
                        <span class="text-red-600"> {$t(error.password.error)}</span>
                    {/if}
                </HelperText>
            </Textfield>
        </div>
         <div class="my-4">
            <Textfield       bind:invalid={error.passwordFlag}    class="shaped-outlined w-full bg-white"
                               variant="outlined" label={$t('website.register.password-repeat')} bind:value={passwordRepeat} type="password" id="input-password-confirm"
            >
                <HelperText persistent slot="helper">
                    {#if error.password && error.password.status === 'error'}
                        <span class="text-red-600"> {$t(error.password.error)}</span>
                    {/if}
                </HelperText>
            </Textfield>
        </div>
        <div class="my-4">
            <Textfield
                    bind:invalid={error.charnameFlag}
                    class="shaped-outlined w-full bg-white"
                               variant="outlined" label={$t('website.register.name')} bind:value={charname}  type="text" id="input-name">
                <HelperText persistent slot="helper">
                    {$t('website.register.name-small')}
                    {#if error.charname && error.charname.status === 'error'}
                        <span class="ml-2 text-red-600"> {$t(error.charname.error)}</span>
                    {/if}
                </HelperText>
            </Textfield>
           </div>

        <div class="my-4">
            <Select class="shaped-outlined w-full bg-white"
                    variant="outlined" bind:value={race} id="select-race" label={$t('website.register.select-race')}>
                {#each data.races as race}
                    <Option value={race}>{$t('race.' + race)}</Option>
                {/each}
            </Select>
        </div>




        <button onclick={register} class="btn btn-red" disabled={registerButtonDisabled}>{$t('website.register.buttonText')}</button>
    </div>

</div>