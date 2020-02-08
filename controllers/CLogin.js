module.exports = (request, response, next) => {
    return response.render('login', { title: 'BTRS' });
};