let token = process.env.GATSBY_TOKEN;

const fetcher = (url) => {
    return fetch(`${process.env.GATSBY_SITE_URL}/${url}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((r) => r.json());
};

export default fetcher;
