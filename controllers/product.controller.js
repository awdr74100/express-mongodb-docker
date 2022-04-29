import Product from '../models/product.model';

export const addProduct = async (req, res) => {
  const { title, price } = req.body;

  try {
    await Product.create({ title, price });

    res.send({ success: true, message: 'added' });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}, null, { lean: true });

    res.send({ success: true, products });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, price } = req.body;

  try {
    await Product.findByIdAndUpdate(id, { title, price }, { lean: true });

    res.send({ success: true, message: 'updated' });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id, { lean: true });

    res.send({ success: true, message: 'deleted' });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
