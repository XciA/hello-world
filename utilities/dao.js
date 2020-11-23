function resolvePromise(query = Object) {
    return query.then((data) => {
        return {
            "data": data,
            "error": null
        }
    }).catch((error) => {
        return {
            "data": null,
            "error": error
        }
    });
}