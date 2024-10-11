import { Router, Request, Response } from "express";
import multer from 'multer'

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailuserController } from "./controllers/user/DetailUserController"

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateAuthorController } from "./controllers/author/CreateAuthorController";
import { ListAuthorController } from "./controllers/author/ListAuthorController";

import { CreateBookController } from "./controllers/book/CreateBookController";
import { ListByCategoryController } from "./controllers/book/ListByCategoryController";

import { CreateLoanController } from "./controllers/loan/CreateLoanController";
import { ReturnLoanController } from "./controllers/loan/ReturnLoanController";

import { isAuthenticated } from "./services/middlewares/isAuthenticated";

import uploadConfig from './config/multer'
import { CreateSuggestionController } from "./controllers/suggestion/CreateSuggestionController";
import { ListBooksController } from "./controllers/book/ListBooksController";



const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

//--- ROTAS USER --- //
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/userinfo', isAuthenticated, new DetailuserController().handle)

// -- ROTAS CATEGORY -- //
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

//-- ROTAS AUTHOR -- //
router.post('/author', isAuthenticated, new CreateAuthorController().handle)

router.get('/author', isAuthenticated, new ListAuthorController().handle) 

//-- ROTAS BOOK -- //

router.post('/catalogacao', isAuthenticated,  upload.single('file'), new CreateBookController().handle)

router.get('/category/book', isAuthenticated, new ListByCategoryController().handle)

router.get('/livros', isAuthenticated, new ListBooksController().handle)

//-- ROTAS EMPRESTIMO -- //

router.post('/emprestimo', isAuthenticated, new CreateLoanController().handle)

router.post('/devolucao', isAuthenticated, new ReturnLoanController().handle)

//-- ROTAS SUGESTÃO -- 

router.post('/suggestion', isAuthenticated, new CreateSuggestionController().handle)



export { router };