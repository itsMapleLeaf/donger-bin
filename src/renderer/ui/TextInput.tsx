import { darken, transparentize } from "polished"
import styled, { css } from "react-emotion"
import { dangerColor } from "./colors"

export interface TextInputProps {
  hasError?: boolean
}

const errorStyle = css`
  background: ${transparentize(0.5, darken(0.4, dangerColor))};

  &:hover,
  &:focus {
    background: ${transparentize(0.5, darken(0.5, dangerColor))};
  }
`

export const TextInput = styled("input")`
  display: block;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.4rem 0.7rem;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.6);
    outline: none;
  }

  ${(props: TextInputProps) => props.hasError && errorStyle};
`
