<style lang="postcss">
    .Monsterlist, .Itemlist {
        border: 2px solid black;
        border-radius: 5px;
        margin: 2em 0.25em;

        .Header {
            padding: 3px;
            font-weight: bold;
            font-size: 1.2em;
            background: linear-gradient(to bottom, theme('colors.red.900'), theme('colors.red.500'));

        }

        ul li {
            padding: 0.25em 1em;
            @apply border-t border-gray-800;
        }
    }

    .Itemlist .Header {
        background: linear-gradient(to bottom, theme('colors.green.900'), theme('colors.green.500'));
    }

</style>
<h1>Du stehst auf einer Wiese</h1>
<div>
    Hier steht auch ganz vieeeel Text
</div>


<div class="Monsterlist">
    <div class="Header">
        <h2>Monster auf diesem Feld</h2>

    </div>
    <ul>
        <li>Monster 1</li>
        <li>Monster 2</li>
        <li>Monster 3</li>
    </ul>
</div>


<div class="Itemlist">
    <div class="Header">
        <h2>Items auf diesem Feld</h2>

    </div>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</div>