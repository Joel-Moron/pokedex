import * as React from "react"
const IconCancel = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <defs>
      <style>
        {
          `.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:${props.stroke}}`
        }
      </style>
    </defs>
    <title />
    <g id="cross">
      <path d="m7 7 18 18M7 25 25 7" className="cls-1" />
    </g>
  </svg>
)
export default IconCancel
