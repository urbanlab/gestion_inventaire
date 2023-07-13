<script lang="ts">
    import { LightSwitch } from '@skeletonlabs/skeleton';

  
</script>

<section>
<h2>Outil de gestion d'inventaire</h2>
<div class="flex flex-wrap space-x-4 justify-center pt-16">
    <a href="/borrow" class="decoration-transparent ">
        <div class="card w-60 h-60 card-hover cursor-pointer bg-primary-500 text-white">
            <header class="card-header">Emprunt</header>
            <section class="p-4">Page permettant de de faire sortir ou entrer du matériel de la techshop</section>
        </div>
    </a>
    <a href="/search"  class="decoration-transparent ">
        <div class="card  w-60 h-60 card-hover cursor-pointer bg-primary-500 text-white">
            <header class="card-header">Recherche</header>
            <section class="p-4">Affichage/Recherche sous forme de tableau les différents éléments référencés dans la techshop </section>
        </div>
    </a>
    <a href=""  class="decoration-transparent ">
        <div class="card  w-60 h-60 card-hover cursor-pointer bg-primary-500 text-white">
            <header class="card-header">Mode jour/nuit</header>
            <section class="p-4 flex flex-col items-center">
                <p>Bascule du theme de couleur du site en clair ou sombre</p> 
                <LightSwitch />
            </section>
        </div>
    </a>
</div>

</section>
