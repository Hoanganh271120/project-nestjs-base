
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

export interface DtoTransformation {
    transform(user: any, query: string): void;
}

@Injectable()
export class DtoTransformInterceptor implements NestInterceptor {
    constructor(private transformationClass: new () => DtoTransformation) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const transformationInstance = new this.transformationClass();
        transformationInstance.transform(request.user, request.query);
        request.body = { ...request.body, ...transformationInstance };
        return next.handle();
    }
}