<script lang="ts">
  interface Video {
    id: string;
    name: string;
    creator: string;
    release: string;
    tags: string[];
    language: string;
  }
  import { query, settings } from "./stores";
  import { writable } from "svelte/store";
  export let getVideos: Video[];
  const videos = writable<Video[]>(getVideos);
  videos.set(getVideos);

  $: {
    const value = $query;
    videos.set(
      getVideos.filter((video: Video) => {
        return (
          (video.name.toLowerCase().includes(value.toLowerCase()) ||
            video.tags.includes(value.toLowerCase())) &&
          video.language.includes($settings.language.toLowerCase())
        );
      })
    );
    if (value === "") {
      videos.set(
        getVideos.filter(
          (video: Video) =>
            video.language.includes($settings.language.toLowerCase())
        )
      );
    }
  }
</script>

{#if $videos.length === 0}
  <div class="flex items-center justify-center h-full">
    <p class="text-gray-500">No videos found.</p>
  </div>
{:else}
  {#each $videos as video}
    <a
      href={"https://youtube.com/watch?v=" + video.id}
      class="w-64 overflow-hidden rounded-md bg-neutral-800 hover:brightness-110 transition-all hover:outline hover:outline-1 shadow-md"
    >
      <div class="relative">
        <img
          src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
          alt=""
          class="h-32 w-full object-cover"
        />
        <span
          class="absolute inset-0 flex items-center justify-center bg-black opacity-50"
        >
          <svg
            class="viewBox-24 h-12 w-12 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      <div class="p-4">
        <h3 class="mb-2 text-lg font-bold">
          {video.name.length > 30
            ? `${video.name.slice(0, 30)}...`
            : video.name}
        </h3>
        <p class="text-sm text-gray-500">
          {video.creator} • {video.release}
        </p>
      </div>
    </a>
  {/each}
{/if}
