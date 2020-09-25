const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));

let products = [
  {
    id: 1,
    name: 'Indomie',
    stock: 201,
  },
  {
    id: 2,
    name: 'Sedap',
    stock: 150,
  },
  {
    id: 3,
    name: 'Sarimi',
    stock: 120,
  },
];

// Get all product
app.get('/product', (req, res) => {
  res.status(200).json({
    data: products,
  });
});

// Get single product
app.get('/product/:id', (req, res) => {
  const found = products.some((val) => val.id === parseInt(req.params.id, 10));

  if (!found) {
    return res.status(404).json({
      msg: 'product not found',
    });
  }

  const product = products.find((element) => element.id === parseInt(req.params.id, 10));
  res.status(200).json({
    data: product,
  });
});

// Store product
app.post('/product', (req, res) => {
  const newData = {
    id: Date.now(),
    name: req.body.name,
    stock: req.body.stock,
  };
  products.push(newData);
  res.status(200).json({
    data: newData,
  });
});

// Update product
app.put('/product/:id', (req, res) => {
  const found = products.some((val) => val.id === parseInt(req.params.id, 10));
  if (!found) {
    return res.status(404).json({
      msg: 'product not found',
    });
  }

  products.map((value) => {
    if (value.id === parseInt(req.params.id, 10)) {
      value.name = req.body.name;
      value.stock = req.body.stock;

      res.status(200).json({
        msg: 'Product successfully updated',
        data: value,
      });
    }
  });
});

// Delete product
app.delete('/product/:id', (req, res) => {
  const found = products.some((val) => val.id === parseInt(req.params.id, 10));
  if (!found) {
    return res.status(404).json({
      msg: 'product not found',
    });
  }

  products = products.filter((value) => value.id !== parseInt(req.params.id, 10));
  res.status(200).json({
    msg: 'Product successfully deleted',
  });
});

app.listen(port, console.log('listening on port', port));

module.exports = app;
