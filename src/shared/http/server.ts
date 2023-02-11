import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import '@shared/typeorm';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    // Verifica se o erro é uma instância de AppError
    if (error instanceof AppError) {
      // Retorna uma resposta com o status code específico para esse erro e uma mensagem de erro personalizada
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    // Retorna uma resposta com o status code 500 (Internal Server Error) e uma mensagem genérica de erro
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
    // "next" é usado para passar o controle para o próximo middleware na pilha.
    //se eu não usa ro next minha aplicação fica presa aqui
  },
);

app.listen(3333, () => {
  // console.log('server starter on port 3333!');
});
