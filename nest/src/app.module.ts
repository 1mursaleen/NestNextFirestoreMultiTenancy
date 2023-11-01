// import * as admin from 'firebase-admin';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { FirebaseConfigService } from './firebase/firebase-config.service';
import { DynamicCorsMiddleware } from './middleware/dynamicCors.middleware';
import { HomeController } from './site/home.controller';
import { SiteController } from './site/site.controller';
import { SiteService } from './site/site.service';

@Module({
  controllers: [HomeController, SiteController],
  providers: [
    // {
    //   provide: 'FirestoreInstance',
    //   useValue: admin.firestore(),
    // },
    FirebaseConfigService,
    SiteService,
  ],
  exports: [
    // 'FirestoreInstance',
    FirebaseConfigService,
  ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(DynamicCorsMiddleware).forRoutes('*'); // Apply the custom CORS middleware to all routes
//   }
// }
