import { css } from "react-emotion"

export const hoverReveal = css`
  transition: 0.2s;
  cursor: pointer;

  opacity: 0.75;

  &:hover {
    opacity: 1;
  }
`
