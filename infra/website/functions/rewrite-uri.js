
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Redirect www to the canonical domain.
    if (request.headers.host.value === 'www.alejandroriera.dev') {
        var query = Object.keys(request.querystring).map(function (key) {
            var param = request.querystring[key];
            return encodeURIComponent(key) + '=' + encodeURIComponent(param.value);
        }).join('&');

        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: {
                    value: 'https://alejandroriera.dev' + uri + (query ? '?' + query : '')
                }
            }
        };
    }

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
