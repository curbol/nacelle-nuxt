<template>
  <interface-modal
    :modalOpen="!!product"
    v-on:closeModal="$router.back()"
  >
    <h3 class="modal-title">Quick Shop</h3>
    <div class="product">
      <section class="section">
        <div class="container">
          <product-details v-if="product" :product="product" />
          <nuxt-link :to="`/products/${product && product.handle}`">
            <a>View Full Details</a>
          </nuxt-link>
        </div>
      </section>
    </div>
  </interface-modal>
</template>

<script>
import InterfaceModal from '~/components/nacelle/InterfaceModal'
import ProductDetails from '~/components/nacelle/ProductDetails'
import getProduct from '~/mixins/getProduct'

export default {
  components: { InterfaceModal, ProductDetails },
  mixins: [getProduct()]
}
</script>

<style lang="scss" scoped>
</style>
