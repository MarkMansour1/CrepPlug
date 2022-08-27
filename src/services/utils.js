export const timeSince = date => {
  date = new Date(date)

  var seconds = Math.floor((new Date() - date) / 1000)
  var interval = Math.floor(seconds / 31536000)

  if (interval > 0) {
    return interval + " years ago"
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 0) {
    return interval + " months ago"
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 0) {
    return interval + " days ago"
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 0) {
    return interval + " hours ago"
  }
  interval = Math.floor(seconds / 60)
  if (interval > 0) {
    return interval + " minutes ago"
  }
  return Math.floor(seconds) + " seconds ago"
}

export function shuffle(a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}