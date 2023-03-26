const { nanoid } = require('nanoid');

const books = require('./books');

const addBukuHandler = (request, responses) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if (!name) {

        const response = responses
        .response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohoon isi nama buku',
        })
        .code(400);
        return response;
    }

    if (readPage > pageCount){
        const response = responses
        .response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
        return response;
    }


    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const newBook={
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        id,
        finished,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const Success = books.filter((note) => note.id ==id).length > 0;

    if(Success){
        const response = responses
        .response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data:{
                bookId : id,
            },
        })
        .code(201);
        return response;
    }

    const response = responses
    .response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    })
    .code(500);
    return response;
};

const getAllBukuHandler = (request, responses) =>{
    const {name, reading, finished} = request.query;

    if(!name && !reading && !finished){
        const response = responses
        .response({
            status: 'success',
            data: {
                books: books.map((book)=>({
                    id: book.id,
                    name: book.name,
                    publisher: book.publicher,
                })),
            },
        })
        .code(200);
        return response;
    }

    if (name){
        const filteredBooksName = books.filter((book) =>{
            const nameRegex = new RegExp(name, 'gi');
            return nameRegex.test(book.name);
        });

    const response = responses
        .response({
            status: 'success',
            data: {
                books: filteredBooksName.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        })
        .code(200);
        return response;
    }

    if (reading){
        const filteredBooksReading = books.filter((book) => Number(book.reading) == Number(reading),
        );

        const response = responses
        .response({
            status: 'success',
            data:{
                books: filteredBooksReading.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        })

        .code(200);

        return response;
    }

    const filteredBooksFinished = books.filter((book) => Number(book.finished) == Number(finished));
    
    const  response = responses
    .response({
        status: 'success',
        data: {
            books: filteredBooksFinished.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    })
    .code(200);

    return response;
};


const getBookByIdHandler = (request, responses) =>{
    const {bookId} = request.params;

    const book = books.filter((n) => n.id === bookId)[0];

    if (book){
        const reponse = responses
        .response({
            status: 'sucess',
            data:{
                book,
            },
        })
        .code(200);
        return response;
    }

    const response = responses
    .response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    })
    .code(404);
    return response;
};

const editBookByIdHandler = (request, responses) => {
    const { bookId } = request.params;

    const{
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if(!name){
        const response = responses
        .response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        .code(400);
        return response
    }

    if (readPage > pageCount){
        const response = responses
        .response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
        return response;
    }

    const finished = pageCount == readPage;
    const updatedAt = new Date().toISOString();

    const index= books.findIndex((note) => note.id === bookId);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            updatedAt
        };

    const response = responses
    .response({
        status: 'success',
        messsage: 'Buku berhasil diperbarui',
    })
    .code(200);
    return response;
    }

    const response = responses
    .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    .code(404);
    return response;
};

const deleteBookByIdHandler = (request, responses) =>{
    const { bookId} = request.params;

    const index = books.findIndex((note) => note.id === bookId);

    if (index !== -1){
        books.splice(index, 1);

        const response = responses
        .response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        })
        .code(200);
        return response;
    }

    const response = responses
    .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    })
    .code(404);
    return response;
};

module.exports = {
    addBukuHandler,
    getAllBukuHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler

}
