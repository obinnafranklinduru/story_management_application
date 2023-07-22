import express, { Express } from 'express';
import cors from "cors";
import compression from 'compression';
import helmet from "helmet";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
import passport from 'passport';

import { limiter } from './config/rateLimiter';
import { setupPassport } from './config/passport';
import { configureSession } from './config/session';
import errorHandler from './middlewares/error.middleware';
import { apiV1Routes } from './routes/apiv1';

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.setup();
  }

  private setup(): void {
    setupPassport();
    this.configureMiddleware();
    this.app.use(configureSession());

    this.app.use(passport.initialize());
    this.app.use(passport.session());
    
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    this.app.use(helmet()); // adds security headers
    this.app.use(cors()); // enables Cross-Origin Resource Sharing
    this.app.options('*', cors()); // cross-origin resource sharing for all routes
    this.app.use(mongoSanitize()); // prevent SQL injection
    this.app.use(hpp()); // HTTP Param Pollution
    this.app.use(limiter); // limit queries per 15mn
    this.app.use(compression()); // Compress the HTTP responses sent.
    this.app.use(express.json()); // Enable parsing JSON payload in the request body
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan('combined')); // Logs about incoming requests and outgoing responses
  }

  private configureRoutes(): void {
    this.app.use('/v1', apiV1Routes);
  }

  private configureErrorHandling(): void {
    this.app.use(errorHandler);
  }
}

export default App;