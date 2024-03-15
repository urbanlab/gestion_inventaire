<script lang="ts">
  import AutoComplete from "simple-svelte-autocomplete";
  let terms = ["hoho", "haha", "hihi", "huhu"];
  export let term = "";
    function createUpdateKeyword() {
        // add to terms array
        terms = [...terms, term];
    }
</script>

<section>
    <AutoComplete
        items={terms}
        labelFieldName="name"
        valueFieldName="id"
        createText={"Item doesn't exist, create one?"}
        create={true}
        onCreate={createUpdateKeyword}
        bind:value={term}
    />
</section>
