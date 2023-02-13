const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
  const dbCategoryData =  await Category.findAll({
    attributes: ['id', 'category_name'],
    include: [{
      models: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  res.status(200).json(dbCategoryData)
  }catch(err){
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const dbCategoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    if (!dbCategoryData) {
      res.status(404).json({ message : 'no category found'});   
    }
    res.status(200).json(dbCategoryData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const dbNewCategory = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name,
    })
    res.status(200).json(dbNewCategory); 
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const dbCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(dbCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }


});

module.exports = router;
