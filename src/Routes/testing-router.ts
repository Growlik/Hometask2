import {Request, Response, Router} from 'express'
const videos =[
    {
        id: 1,
        title: "First video"
    },
    {
        id: 2,
        title: "Second video"
    },
    {
        id: 3,
        title: "Third video"
    },
    {
        id: 4,
        title: "Fourth video"
    }
]

export const testingRouter = Router({})

//deleting all the videos
testingRouter.delete('/', (req: Request, res: Response) => {
    videos.length = 0
    res.send(204)
})