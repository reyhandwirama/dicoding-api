const {
    addBukuHandler,
    getAllBukuHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
} = require('./handler');

const routes = [{
    method : 'POST',
    path: '/books',
    handler: addBukuHandler,
},
{
    method: 'GET',
    path: '/books',
    handler: getAllBukuHandler,
},
{
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
},
{
    method : 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler,
},
{
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
},
{
    method: '*',
    path: '/{any*}',
    handler: () => 'Halaman tidak ditemukan',
}
];

module.exports = routes;