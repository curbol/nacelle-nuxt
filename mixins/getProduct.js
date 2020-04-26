import { mapMutations, mapActions } from 'vuex'

export default ({ productHandle, locale } = {}) => {
  return {
    data() {
      return {
        handle: null,
        product: null,
        noProductData: false
      }
    },
    async asyncData(context) {
      const { params, payload, app } = context
      const { $nacelle } = app
      const handle = productHandle || params.productHandle

      if (payload && payload.productData) {
        return {
          product: payload.productData
        }
      }

      if (typeof process.server === 'undefined' || process.server) {
        return {}
      }

      const productData =
        handle &&
        (await $nacelle.data
          .product({
            handle,
            locale: locale
          })
          .catch(error => {
            console.warn(
              `Unable to find product data for handle, "${handle}".\n
Some page templates attempt to locate product data automatically, so this may not reflect a true error.`
            )
            return undefined
          }))

      return {
        product: productData
      }
    },
    async created() {
      this.handle = productHandle || this.$route.params.productHandle

      if (process.browser) {
        if (!this.product && !this.noProductData) {
          const productData =
            this.handle &&
            (await this.$nacelle.data
              .product({
                handle: this.handle,
                locale: locale
              })
              .catch(error => {
                console.warn(
                  `Unable to find product data for handle, "${this.handle}".\n
    Some page templates attempt to locate product data automatically, so this may not reflect a true error.`
                )
                return undefined
              }))

          if (productData) {
            if (productData.noData) {
              this.noProductData = true
            } else {
              this.product = productData
              this.setProduct(productData)
              this.productView(productData)
            }
          } else {
            this.noProductData = true
          }
        } else if (this.product) {
          this.setProduct(this.product)
          this.productView(this.product)
        }
      }
    },
    methods: {
      ...mapMutations('product', ['setProduct']),
      ...mapActions('events', ['productView'])
    }
  }
}
