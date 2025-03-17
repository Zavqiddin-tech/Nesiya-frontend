<template>
  <div class="flex">
    <div class=" w-[250px]  h-screen sticky top-0">
      <SideBar />
    </div>
		<div class="main">
      <slot />
    </div>
  </div>
</template>

<style>
.main {
  width: calc(100% - 250px);
}
</style>
