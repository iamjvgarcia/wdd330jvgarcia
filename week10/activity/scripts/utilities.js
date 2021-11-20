export function getJSON(url) {
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

export async const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};