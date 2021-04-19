const express = require('express')
const connection = require('../config')
const fs = require('fs')
const router = express.Router()

router.get('/', (req, res) => {
  connection.query('SELECT * from media', (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

router.get('/:id', (req, res) => {
  const idPhoto = req.params.id
  connection.query(
    'SELECT * from media WHERE id = ?',
    [idPhoto],
    (err, results) => {
      if (err) {
        res.status(500).send(`Error retrieving data`)
      } else {
        res.status(200).json(results)
      }
    }
  )
})

router.post('/', (req, res) => {
  connection.query('INSERT INTO media SET ?', req.body, err => {
    if (err) {
      res.status(500).send('Error saving a media')
    } else {
      res.status(200).send('Successfully saved')
    }
  })
})

router.delete('/:id/:name', (req, res) => {
  const idMedia = req.params.id
  const nameMedia = req.params.name
  connection.query('DELETE FROM media WHERE id = ?', [idMedia], err => {
    if (err) {
      res.status(500).send('Error deleted a media')
    } else {
      res.status(200).send('Media deleted successfully 🎉')
      fs.unlink(`../mon-portfolio-front/public/images/${nameMedia}`, err => {
        if (err) {
          throw err
        }
        console.log('File is deleted.')
      })
    }
  })
})

module.exports = router
