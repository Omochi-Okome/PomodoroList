const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'home',
  'archive'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };

module.exports = class Product {
    constructor(ToDoItem,itemToDelete,editedText,originalText,archiveToDelete,returnArchive,readingDataJSON,readingArchiveJSON) {
        this.ToDoItem = ToDoItem;
        this.itemToDelete = itemToDelete;
        this.editedText = editedText;
        this.originalText = originalText;
        this.archiveToDelete = archiveToDelete;
        this.returnArchive = returnArchive;
        this.readingDataJSON = readingDataJSON;
        this.readingArchiveJSON = readingArchiveJSON;

    }

    deleteItem() {
        // data から特定の要素を削除
        
        const itemToDelete = this.itemToDelete;
        const readingDataJSON = this.readingDataJSON;
        const readingArchiveJSON = this.readingArchiveJSON;
        const index = readingDataJSON.indexOf(itemToDelete);
        const addArchive = readingDataJSON[index];
        if (index !== -1) {
            readingDataJSON.splice(index, 1);
            readingArchiveJSON.push(addArchive);
            fs.writeFileSync("data.json",JSON.stringify(readingDataJSON));
            fs.writeFileSync("archive.json",JSON.stringify(readingArchiveJSON));
        }
    }

    save() {
      this.id = Math.random().toString();
        if (this.id) {
          const existingProductIndex = products.findIndex(prod => prod.id === this.id);
          const updateProducts = [...products];
          updateProducts[existingProductIndex] = this;
          fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
          });
        } else {
          getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log(err);
            });
          });
        }
    }
  
    static fetchAll(cb) {
      getProductsFromFile(cb);
    }
  
    static findById(id, cb) {
      getProductsFromFile(products => {
        const product = products.find(p => p.id === id);
        cb(product);
      });
    }
  };