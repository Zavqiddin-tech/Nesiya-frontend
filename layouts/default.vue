<template>
  <div class="flex">
    <div class="menu sm:w-[100px] lg:w-[250px]  h-screen sticky top-0">
      <SideBar />
    </div>
		<div class="main p-5 pt-8">
      <slot />
    </div>
  </div>
</template>

<style>
.main {
  width: calc(100% - 250px);
}

</style>
