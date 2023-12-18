<template>
    <div class="home-container">
        <nuxt-link :to="'/institute'">
            <button>
                tres pages1
            </button>
        </nuxt-link>

        <nuxt-link :to="'/institute2'">
            <button>
                tres pages2
            </button>
        </nuxt-link>
        <nuxt-link :to="'/'">
            <button>
                no tres pages3
            </button>
        </nuxt-link>

    </div>
</template>
  
<script>
</script>
<style>
button {
    border: 2px solid #000000;
    margin: 50px;
}
</style>
  