import { darken } from "polished"
import styled, { css } from "react-emotion"
import * as colors from "./colors"
import { Intent } from "./Intent"

export interface ButtonProps {
  intent?: Intent
}

const createButtonStyle = (color: string) => css`
  transition: 0.2s;

  background: ${color};

  &:hover,
  &:focus {
    background: ${darken(0.05, color)};
  }

  /* vertically center children, add some spacing between */
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 0.15rem;
  }
`

const resolveIntentStyle = ({ intent = Intent.primary }: ButtonProps) => {
  switch (intent) {
    case Intent.primary:
      return createButtonStyle(darken(0.05, colors.themeColor))
    case Intent.success:
      return createButtonStyle(colors.successColor)
    case Intent.warning:
      return createButtonStyle(colors.warningColor)
    case Intent.danger:
      return createButtonStyle(colors.dangerColor)
    case Intent.info:
      return createButtonStyle(colors.infoColor)
  }
}

export const Button = styled("button")`
  padding: 0.3rem 0.6rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${resolveIntentStyle};
`
