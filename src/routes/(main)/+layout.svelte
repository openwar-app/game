<script lang="ts">
    import { t, locale } from '$lib/translations';
    import { getContext } from 'svelte';
    import { page } from '$app/stores';
    import Select, { Option} from "@smui/select";


    let {children} = $props();

    let isActive: boolean = true;

    let locales : string[] = getContext('serverLocales') ?? ['en'];

    let currentLocale = $state($locale);
    $effect(() => {
        locale.set(currentLocale);
        fetch('/language', {
            method: 'POST',
            body: currentLocale
        });
    });
</script>
<style lang="postcss">


    :global(body) {

            :global(a) {
                @apply text-red-800 hover:text-red-600 hover:underline font-bold;
            }

    }
    .nav {
        li {
            @apply py-1 px-4 bg-gray-200 my-1 border border-transparent;
            &.active {
                background: linear-gradient(to bottom, theme('colors.gray.300'), theme('colors.gray.200'));
                @apply border-gray-400;
                a {
                    @apply text-red-600;
                }
            }
            a {
                @apply text-red-800 hover:text-red-600 hover:underline font-bold;
            }
        }
    }
</style>
<div class="container mx-auto">
    <div class="header w-full bg-red-800 text-white px-4 py-4 my-2">
        <h1 class="text-3xl">OpenWar</h1>
        <h2 class="text-2xl">{$t('website.subheader')}</h2>
    </div>
    <div class="flex w-full">
        <div class="w-56 mr-2 flex-grow-0 flex-shrink-0">

                <ul class="nav">
                    <li class:active={$page.url.pathname === '/'} ><a href="/">{$t('website.nav.home')}</a></li>
                    <li class:active={$page.url.pathname === '/login'} ><a href="/login">{$t('website.nav.login')}</a></li>
                    <li class:active={$page.url.pathname === '/register'}><a href="/register">{$t('website.nav.register')}</a></li>
                    <li class:active={$page.url.pathname === '/faq'}><a href="/faq">{$t('website.nav.faq')}</a></li>
                </ul>

            <div class="my-4">
                <Select class="bg-white" bind:value={currentLocale} label={$t('website.nav.choose_language')}>
                    {#each locales as locale}
                        <Option value={locale}>{$t('locale.'+locale)}</Option>
                    {/each}
                </Select>
            </div>


        </div>
        <div class="px-4 border border-gray-600 border-r-0 border-t-0 border-b-0 w-full">
            {@render children()}
        </div>
    </div>

</div>
