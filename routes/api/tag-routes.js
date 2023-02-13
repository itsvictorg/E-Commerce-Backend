const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const dbTagData =  await Tag.findAll({
      attributes: ['id', 'category_name'],
      include: [{
        models: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        models: ProductTag,
        attributes : ['id', 'product_id', 'tag_id']
      }]
    })
    res.status(200).json(dbTagData)
    }catch(err){
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const dbTagData = await Tag.findByPk(req.params.id, {
      include: [{models: Product, ProductTag}]
    });

    if (!dbTagData) {
      res.status(404).json({ message : 'no tag found'});   
    }
    res.status(200).json(dbTagData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const dbNewTag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name,
    })
    res.status(200).json(dbNewTag); 
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const dbTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(dbTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
