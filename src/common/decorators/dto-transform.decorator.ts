import { UseInterceptors } from '@nestjs/common';
import { DtoTransformInterceptor } from '../interceptors/dto-transform.interceptor';

export function TransformDto(transformationClass: new () => any) { // use with any DTO
    return UseInterceptors(new DtoTransformInterceptor(transformationClass));
}