<script lang="ts">
    import ClientData from "$lib/client/ClientData.svelte";

    let userData = $derived(ClientData.userData);

    console.log(userData);
    $effect(() => {
        console.log(userData);
    })

</script>

<h1>Name: {userData?.charname}</h1>