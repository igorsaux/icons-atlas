import 'flag-icons/css/flag-icons.css'
import { Ref } from 'preact'
import { forwardRef } from 'preact/compat'

type FlagIconProps = {
  country: string
  square?: boolean
  class?: string
}

const FlagIcon = forwardRef(
  (props: FlagIconProps, ref: Ref<HTMLSpanElement>) => {
    return (
      <span
        ref={ref}
        class={`fi fi-${props.country} ${props.square ? 'fis' : ''} ${
          props.class
        }`}
      ></span>
    )
  }
)

export default FlagIcon
