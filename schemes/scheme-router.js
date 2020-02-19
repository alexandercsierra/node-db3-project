const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Schemes.find()
  .then(schemes => {
    res.json(schemes);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});

function validateSchemeId(id){
  Schemes.findById(id)
    .then(scheme=> {return {success: true, message: scheme, errors: []}})
    .catch(error=>{
      console.log(error.message)
      return {success: false, message: error.message, errors: [error]}
    })
}

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given scheme' })
    }
  })
  .catch(err => {
    console.log(err.message);
    res.status(500).json({ message: 'Failed to get steps' });
  });
});

router.post('/', (req, res) => {
  const schemeData = req.body;

  Schemes.add(schemeData)
  .then(scheme => {
    return Schemes.find()
      .then(schemes=>res.status(201).json(schemes[schemes.length-1]))
      .catch(err=>{
        console.log(err);
        res.status(500).json({message: 'server error'})
      })
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new scheme' });
  });
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      Schemes.addStep(stepData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch (err => {
    console.log(err);
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      Schemes.update(changes, id)
      .then(updatedScheme => {
        return Schemes.find()
          .then(schemes=>res.status(201).json(schemes[schemes.length-1]))
          .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'server error'})
      })
      });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update scheme' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme' });
  });
});

module.exports = router;