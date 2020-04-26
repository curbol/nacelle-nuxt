<template>
  <interface-modal
    class="quick-shop-modal"
    :modalOpen="!!product"
    @closeModal="closeModal()"
  >
    <h3 class="modal-title">Quick Shop</h3>
    <div class="product">
      <section class="section">
        <div class="container">
          <product-details v-if="product" :product="product" @addedToCart="closeModal(true)" />
          <nuxt-link :to="`/products/${product && product.handle}`">
            <a>View Full Details</a>
          </nuxt-link>
        </div>
      </section>
    </div>
  </interface-modal>
</template>

<script>
import { mapMutations } from 'vuex'
import InterfaceModal from '~/components/nacelle/InterfaceModal'
import ProductDetails from '~/components/nacelle/ProductDetails'
import getProduct from '~/mixins/getProduct'

export default {
  components: { InterfaceModal, ProductDetails },
  mixins: [getProduct()],
  methods: {
    ...mapMutations('cart', ['showCart']),
    closeModal(openCart = false) {
      this.$router.back()
      if (openCart) {
        setTimeout(() => this.showCart(), 100)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.quick-shop-modal {
  z-index: 1000;
  transition: 0.2s ease;
}
</style>
