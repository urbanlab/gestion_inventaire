<script lang="ts">
  import { Html5Qrcode } from "html5-qrcode";
  import { onMount } from "svelte";
  import { currentBarcodes, currentItems } from "$lib/store";


  let scanning = false;
  let cameraFacingMode = "environment";

  let html5Qrcode: Html5Qrcode;

  let lastBarcode = "";
  let itemName = "No item found";
  $: lastBarcode = $currentBarcodes[$currentBarcodes.length - 1];

  function init() {
    html5Qrcode = new Html5Qrcode("reader");
  }

  function start() {
    html5Qrcode.start(
      { facingMode: cameraFacingMode },
      {
        fps: 5,
        qrbox: 250,
      },
      onScanSuccess,
      onScanFailure
    );
    scanning = true;
  }

  async function stop() {
    await html5Qrcode.stop();
    scanning = false;
  }

  async function onScanSuccess(decodedText: string) {
    lastBarcode = await decodedText;
    // add lastBarcode to currentBarcodes if not already in
    if (!$currentBarcodes?.includes(lastBarcode)) {
      // check if lastBarcode is in itemsStore
      const item = $currentItems.data.find((item) => item.id_code_barre === lastBarcode);
      if (item) {
        itemName = item.descriptif;
        // add item to currentBarcodes
        $currentBarcodes = [...$currentBarcodes, lastBarcode];
      }
      else {
        itemName = "No item found";
      }
    }
    console.log(`Code scanned = ${decodedText}`);
  }

  function onScanFailure(error: string) {
    //console.warn(`Code scan error = ${error}`);
  }



  onMount(() => {
    init();
    start();
  });
</script>

<main class="text-white">
  <p class="text-white">Item: {itemName}</p>
  <p class="text-white">Last code: {lastBarcode}</p>
  <reader id="reader" />
</main>

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
    min-height: 250px;
    background-color: black;
  }
</style>
