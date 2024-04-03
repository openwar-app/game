<script lang="ts">
import {t} from "$lib/translations.js";


let { data } = $props();
console.log(data);

let email:string = $state('');
let password:string = $state('');

let loginButtonDisabled:boolean = $state(true);

$effect(() => {
    loginButtonDisabled = !email || !password;
});

async function login() {
    let result = await fetch(location.href, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({action: 'login', email, password})
    });
    if(result.status === 200) {
        let data = await result.json();
        console.log(data);
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
    <div class="w-72 grid grid-cols-[max-content_auto] grid-gap-4">

        <label for="input-email">{$t('website.register.email')}</label>
        <input bind:value={email} type="email" id="input-email" />

        <label for="input-password">{$t('website.register.password')}</label>
        <input bind:value={password} type="password" id="input-password">


        <button on:click={login} class="btn btn-red" disabled={loginButtonDisabled}>{$t('website.register.buttonText')}</button>

    </div>
</div>