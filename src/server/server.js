let db = require('./db')
const express = require('express')
const PORT = 3001
const server = express()

server.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
    })
    next()
})

server.options('/', (request, response) => {
    response.send()
})

server.get('/', (request, response) => {
    response.json(db)
})

server.post('/', (request, response) => {
    let requestData = ''
    request.on('data', chunk => requestData += chunk)
    request.on('end', () => {
        const newItem = {id: db.at(-1)?.id + 1 || 0, value: JSON.parse(requestData), isFinished: false}
        db.push(newItem)
        response.json(db)
    })
})

server.patch('/', (request, response) => {
    let requestData = ''
    request.on('data', chunk => requestData += chunk)
    request.on('end', () => {
        const editItem = JSON.parse(requestData)
        const itemIndex = db.findIndex(el => el.id === editItem.id)
        db[itemIndex] = editItem
        response.json(db)
    })
})

server.delete('/', (request, response) => {
    let requestData = ''
    request.on('data', chunk => requestData += chunk)
    request.on('end', () => {
        const removingItem = JSON.parse(requestData)
        db = db.filter(el => el.id !== removingItem.id)
        response.json(db)
    })
})

server.put('/bulk-select', (request, response) => {
    let requestData = ''
    request.on('data', chunk => requestData += chunk)
    request.on('end', () => {
        const status = JSON.parse(requestData)
        db = db.map(el => ({...el, isFinished: status}))
        response.json(db)
    })
})

server.put('/bulk-remove', (request, response) => {
    db = db.filter(el => !el.isFinished)
    response.json(db)
})

server.listen(PORT, () => {
    console.log(`Server started, port: ${PORT}`)
})