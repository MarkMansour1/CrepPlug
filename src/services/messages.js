export async function sendMessage(user, receiver, message) {
  const response = fetch(`${process.env.SITE_URL}/wp-json/wp/v2/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      status: "publish",
      title: message,
      cmb2: {
        users: {
          sender: user.username,
          receiver: receiver,
        },
      },
    }),
  })
    .then(response => response.json())
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    })

  return response
}
