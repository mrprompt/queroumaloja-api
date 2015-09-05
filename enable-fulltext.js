db.adminCommand( { setParameter : 1, textSearchEnabled : true } );
db.produtos.createIndex({titulo: 'text', descricao: 'text'});
