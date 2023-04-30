<script>
  import { query, settings } from "./stores.ts";
</script>

<form on:submit|preventDefault class="flex flex-row gap-x-2">
  <label
    for="default-search"
    class=" mb-2 text-sm font-medium sr-only text-white"
    >Search</label
  >
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        /></svg
      >
    </div>
    <input
      on:input={e => query.set(e.target.value)}
      type="search"
      id="default-search"
      class="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      placeholder="Search..."
    />
  </div>
  <select on:change={e => settings.set({
    language: e.target.value
  })} class="border text-sm rounded-lg block w-12 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
    <option selected>en</option>
    <option>se</option>
  </select>
</form>
