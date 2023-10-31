<script>
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import Fa from "svelte-fa";
    import { faTable, faBarcode } from "@fortawesome/free-solid-svg-icons";
    import { page } from '$app/stores';

    console.log($page.route.id);
</script>
<nav class="fixed w-full bottom-0 bg-surface-700 text-white">
    <ul class="flex flex-row justify-around items-center h-12 ">
        <li class="{$page.route.id == '/search' ? 'bg-secondary-500' : '' } p-2 rounded-full">
            <a href="/search">
                <Fa icon={faTable} />
            </a>
        </li>
        <li class="{$page.route.id == '/borrow' ? 'bg-secondary-500' : '' } p-2 rounded-full">
            <a href="/borrow">
                <Fa icon={faBarcode} />
            </a>
        </li>
        <LightSwitch />
    </ul> 
</nav>