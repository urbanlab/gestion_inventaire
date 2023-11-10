<script lang="ts">
    import Fa from "svelte-fa";
    import { faComment } from '@fortawesome/free-solid-svg-icons'
    //import type { Feedback } from '$lib/models/index'
    //import { addFeedback } from '$lib/utils/feedback';
	
    let show: boolean = false;

    let feedback = {
        title: '',
        url: window.location.href,
        message: '',
    }

    async function sendFeedback() {
        // send post request to /api/feedback/add
        const res = await fetch('/api/feedback/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedback),
        });
        if (res.ok) {
            // addFeedback(feedback);
            show = false;
        }
    }
    
    </script>
    <section class="">
        <label for="feedback_modal" class=" btn fixed right-5 bottom-20 bg-primary w-fit p-3 rounded-full text-white text-2xl" on:click={() => show = true}>
            <Fa icon={faComment} />
        </label>
        {#if show}
            <div class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <form class="w-4/5 m-auto bg-surface-500 rounded-lg shadow-lg p-4" on:submit|preventDefault>
                    <label class="label">
                        <span>Objet</span>
                        <input class="input" type="text" placeholder="le boutton ne fonctionne pas" bind:value={feedback.title} />
                    </label>
                    <label class="label">
                        <span>Message</span>
                        <textarea class="textarea" rows="4" placeholder="Sur firefox lorsque je clique sur le boutton, aucune action ne ce declenche" bind:value={feedback.message}></textarea>
                    </label>
                    <button type="button" class="btn variant-filled" on:click={() => {sendFeedback()}}>Envoyer</button>
                </form>
            </div>
        {/if}
    </section>