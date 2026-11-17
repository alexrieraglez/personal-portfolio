function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Root is handled by CloudFront default_root_object.
    if (uri === '/') {
        return request;
    }

    // Ignore paths that already contain a file extension.
    if (uri.split('/').pop().includes('.')) {
        return request;
    }

    // Astro uses directory-style URLs.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    } else {
        request.uri += '/index.html';
    }

    return request;
}
