exports.getCookie = () => {
    let token = document.cookie.split('token=')[1];
    console.log('parsed token - ', token);

    return token;
}