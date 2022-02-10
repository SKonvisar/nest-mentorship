import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class MapTokensInterceptors implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((res) => {
        const { refreshToken, ...data } = res;

        if (refreshToken) {
          response.cookie('refresh-token', refreshToken, {
            httpOnly: true,
            signed: true,
          });
        } else {
          response.clearCookie('refresh-token');
        }

        return data;
      }),
    );
  }
}
