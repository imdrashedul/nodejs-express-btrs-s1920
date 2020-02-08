module.exports = (request, response, next) => {
    return response.render('landing', { title: 'BTRS' });
};