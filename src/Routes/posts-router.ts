import {Request, Response, Router} from 'express'
import {postsRepository} from "../Repositories/posts-repository"
import {inputPostsValidation, inputValidationMiddleware} from "../MIddlewares/input-validation-middleware";
export const postsRouter = Router({})

type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

//return all posts
postsRouter.get('/', (req: Request, res: Response) => {
    const foundPosts = postsRepository.findPosts()
    res.status(200).send(foundPosts)
})
//return post by id
postsRouter.get('/:id', (req: Request, res: Response) => {
    let post = postsRepository.findPostById(+req.params.id)
    if (post) {
        res.status(200).send(post)
    } else {
        res.sendStatus(404)
    }
})
//create new post
postsRouter.post ('/',
    inputPostsValidation.title,
    inputPostsValidation.shortDescription,
    inputPostsValidation.content,
    inputPostsValidation.blogId,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const newPost = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId, req.body.blogName)
    res.status(201).send(newPost)
})
//update existing post by id with InputModel
postsRouter.put('/:id',
    inputPostsValidation.title,
    inputPostsValidation.shortDescription,
    inputPostsValidation.content,
    inputPostsValidation.blogId,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const isUpdated = postsRepository.updatePost(+req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    if (isUpdated) {
        const post = postsRepository.findPostById(+req.params.id)
        res.status(204).send(post)
    } else {
        res.sendStatus(404)
    }
})
//delete post specified by id
postsRouter.delete('/:id', (req: Request, res: Response) => {
    const isRemoved = postsRepository.removePost(+req.params.id)
    if (isRemoved) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})