<template>
  <div class="flex">
    <div
      class="menu hidden sm:block sm:w-[100px] lg:w-[250px] h-screen sticky top-0"
    >
      <SideBar />
    </div>
    <div class="sm:hidden">
      <Navigation />
    </div>
    <div class="main w-full mb-10 p-5 pt-8 sm:mb-0">
      
      <slot />
    </div>
  </div>
</template>

<style>
@media (width >= 64rem) {
  .main {
    width: calc(100% - 250px);
  }
}
</style>
