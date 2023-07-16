<script lang="ts">
    import { notification } from "$lib/store";
    export let message: string = "Message par defaut";
    export let type: string = "success";

    $: if ($notification.show) {
        setTimeout(() => {
            $notification.show = false;
        }, 3000);
    }
</script>

<section class="mt-4 mb-4">
    {#if $notification.show}
        <div class="alert {$notification.type} shadow-lg">
            <div>
                <span>{$notification.body}</span>
            </div>
        </div>
    {/if}
</section>