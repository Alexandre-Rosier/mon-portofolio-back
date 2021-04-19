const express = require('express')
const connection = require('../config')

const router = express.Router()

router.get('/', (req, res) => {
  connection.query('SELECT * from projets', (err, results) => {
    if (err) {
      res.status(500).send(`Error retrieving data`)
    } else {
      res.status(200).json(results)
    }
  })
})

router.get('/:id', (req, res) => {
  const idUser = req.params.id
  connection.query(
    'SELECT * from projets WHERE id = ?',
    [idUser],
    (err, results) => {
      if (err) {
        res.status(500).send(`Error retrieving data`)
      } else {
        res.status(200).json(results)
      }
    }
  )
})
router.get('/detail', (req, res) => {
  connection.query(
    'SELECT * from projets left join media on projets.photo_id=photo.id where projets.id = ?',
    (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error retrieving data')
      } else {
        res.status(200).json(results)
      }
    }
  )
})

router.post('/', (req, res) => {
  connection.query('INSERT INTO projets SET ?', req.body, err => {
    if (err) {
      res.status(500).send('Error saving a projet')
    } else {
      res.status(200).send('Successfully saved')
    }
  })
})

router.put('/:id', (req, res) => {
  const idUser = req.params.id
  const newUser = req.body

  connection.query(
    'UPDATE projets SET ? WHERE id = ?',
    [newUser, idUser],
    err => {
      if (err) {
        res.status(500).send('Error updating a projet')
      } else {
        res.status(200).send('Projet updated successfully 🎉')
      }
    }
  )
})

router.delete('/:id', (req, res) => {
  const idUser = req.params.id

  connection.query('DELETE FROM profile WHERE id = ?', [idUser], err => {
    if (err) {
      res.status(500).send('Error deleted a profile')
    } else {
      res.status(200).send('Profile deleted successfully 🎉')
    }
  })
})

module.exports = router
