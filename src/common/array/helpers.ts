export const getFrequency = <T>(list: T[], value: T) => {
  return list.reduce((count, other) => (value === other ? count + 1 : count), 0)
}
