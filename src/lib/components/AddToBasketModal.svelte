<script lang="ts">
    import { Item } from "../../models";
    export let  item: Item;
    export let  show: boolean;
</script>
<section>
    {#if show}
        Souhaitez-vous ajouter l'objet au panier ?
        <p>Code Barre: {item.descriptif}</p>
    {/if}
</section>