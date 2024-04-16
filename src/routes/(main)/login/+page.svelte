<script lang="ts">
    import {t} from "$lib/translations.js";
    import {goto} from '$app/navigation';

    let { data } = $props();

let email:string = $state('');
let password:string = $state('');
let error: string = $state('');

let loginButtonDisabled:boolean = $state(true);

$effect(() => {
    loginButtonDisabled = !email || !password;
});

async function login() {
    if (loginButtonDisabled) return;
    let result = await fetch(location.href, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({action: 'login', email, password})
    });
    if(result.status === 200) {
        let data = await result.json();
        if (data.status === 'ok') {
            goto('/game');
        } else {
            error = data.error;
        }
    }
}

</script>
<style lang="postcss">
    input {
        @apply shadow border p-2 rounded;
    }
</style>

<svelte:head>
    <title>{$t('website.title.login')}</title>
</svelte:head>

<div class="">
    <h3 class="text-xl mb-4">{$t('website.title.login')}</h3>

    {#if error !== ''}
        <p class="text-red-500">{$t(error)}</p>
    {/if}
    <form method="post" on:submit|preventDefault={() => {login()}}>
    <div class="w-72 grid grid-cols-[max-content_auto] grid-gap-4">

        <label for="input-email">{$t('website.register.email')}</label>
        <input bind:value={email} type="email" id="input-email" />

        <label for="input-password">{$t('website.register.password')}</label>
        <input bind:value={password} type="password" id="input-password">


        <button on:click={login} class="btn btn-red"
                disabled={loginButtonDisabled}>{$t('website.login.buttonText')}</button>

    </div>
    </form>
</div>