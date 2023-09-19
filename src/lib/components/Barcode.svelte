<script>
    import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'

    let scanning = false
    let cameraFacingMode = 'environment'

    let html5Qrcode

    export let lastBarcode = ''


    function init() {
        html5Qrcode = new Html5Qrcode('reader')
    }

    function start() {
        html5Qrcode.start(
            { facingMode: cameraFacingMode },
            {
                fps: 10,
                qrbox: 250
            },
            onScanSuccess,
            onScanFailure
        )
        scanning = true
    }

    async function stop() {
        await html5Qrcode.stop()
        scanning = false
    }

    function onScanSuccess(decodedText, decodedResult) {
        //alert(`Code matched = ${decodedText}`)
        console.log(decodedResult)
        lastBarcode = decodedText
        //html5QrcodeScanner.clear();
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`)
    }

    function toggleCamera() {
        if (cameraFacingMode === 'environment') {
            cameraFacingMode = 'user'
        } else {
            cameraFacingMode = 'environment'
        }
        if (scanning) {
            stop()
            start()
        }
    }

    onMount( () => {
        init()
        start()
    }) 
</script>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    reader {
        width: 100%;
        min-height: 500px;
        background-color: black;
    }
</style>

<main>
    <reader id="reader"/>
    {#if scanning}
        <button on:click={stop}>stop</button>
    {:else}
        <button on:click={start}>start</button>
    {/if}
    <button on:click={toggleCamera}>Toggle Camera</button>
    <p>Last code: {lastBarcode}</p>

</main>