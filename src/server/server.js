let db = require('./db')
const http = require('http')

const applyCORS = (response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    response.setHeader('Access-Control-Allow-Methods', '*')
}

const bulkActionHandler = (request, response) => {
    let requestData = ''
    const targetURL = request.url.slice(1)
    request.on('data', chunk => requestData += chunk)
    switch(targetURL) {
        case 'bulk-select':
            request.on('end', () => {
                const status = JSON.parse(requestData)
                db = db.map(el => ({...el, isFinished: status}))
                response.end(JSON.stringify(db))
            })
            break
        case 'bulk-remove':
            request.on('end', () => {
                db = db.filter(el => !el.isFinished)
                response.end(JSON.stringify(db))
            })
            break
    }
}

const serverHandler = (request, response) => {
    if(request.url === '/favicon.ico') return
    applyCORS(response)
    let requestData = ''
    switch(request.method) {
        case 'OPTIONS': 
            response.end();
            break

        case 'GET':
            response.end(JSON.stringify(db))
            break

        case 'POST':
            request.on('data', chunk => requestData += chunk)
            request.on('end', () => {
                const newItem = {id: db.at(-1)?.id + 1 || 0, value: JSON.parse(requestData), isFinished: false}
                db.push(newItem)
                response.end(JSON.stringify(db))
            })
            break
        
        case 'PATCH':
            request.on('data', chunk => requestData += chunk)
            request.on('end', () => {
                const editItem = JSON.parse(requestData)
                const itemIndex = db.findIndex(el => el.id === editItem.id)
                db[itemIndex] = editItem
                response.end(JSON.stringify(db))
            })
            break
        
        case 'DELETE':
            request.on('data', chunk => requestData += chunk)
            request.on('end', () => {
                const removingItem = JSON.parse(requestData)
                db = db.filter(el => el.id !== removingItem.id)
                response.end(JSON.stringify(db))
            })
            break

        case 'PUT': 
            bulkActionHandler(request, response)
            break
        
        default:
            response.statusCode = 404
            response.end()
    }
}

const server = http.createServer(serverHandler)
server.listen(3001)