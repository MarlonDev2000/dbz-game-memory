export const formatTime = (time: number) => {
  let minutes = Math.floor(time / 60)
  time -= (minutes * 60)

  let secString = `${time < 10 ? '0'+time : time}`
  let minString = `${minutes < 10 ? '0'+minutes : minutes}`

  return `${minString}:${secString}`
}