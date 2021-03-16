import { computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { createNameSpace } from '../utils'
const [createComponent] = createNameSpace('Link')
import './link.less'

export default createComponent({
  props: {
    href: {
      type: String,
      default: '',
    },
    to: [String, Boolean],
    color: Boolean,
    underline: Boolean,
    block: Boolean,
  },
  setup(props, { attrs, slots }) {
    const { href, color, underline, block, to } = toRefs(props)
    const route = useRouter()
    const safeSlots = !!slots?.default
    const calcClass = computed(() => {
      let str = ''
      color.value && (str += ' color')
      underline.value && (str += ' underline')
      block.value && (str += ' block')
      return str.trim()
    })

    const safeHref = computed(() => {
      if (to.value) return 'javascript: void 0;'
      return href.value
    })

    const goToHandler = () => route.push(to.value)

    return () => (
      <>
        <a
          {...attrs}
          className={`fay-link ${calcClass.value}`}
          href={safeHref.value}
          onClick={goToHandler}
        >
          {safeSlots && slots.default()}
        </a>
      </>
    )
  },
})
