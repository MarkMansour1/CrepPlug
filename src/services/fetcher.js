let token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc2hvcC5jcmVwcGx1Zy5jb20iLCJpYXQiOjE2NjE2MTQwMjgsIm5iZiI6MTY2MTYxNDAyOCwiZXhwIjoxNjYyMjE4ODI4LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.GX5DawTpNfGZdWX887Sz6drLkcFpC2Ib0zdJ_OfgV6k"

const fetcher = url => {
  return fetch(`${process.env.GATSBY_SITE_URL}/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(r => r.json())
}

export default fetcher
