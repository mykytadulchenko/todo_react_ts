import { NextFunction, Request, Response, Router } from "express";

const authRouter = Router()

authRouter.get('/', async (request: Request, response: Response, next: NextFunction) => {
    response.send()
})

export default authRouter