import { Controller } from '@nestjs/common';
import { TransformDto } from 'src/common/decorators/dto-transform.decorator';
import { TestDto } from './dto/test.dto';

@Controller('test')
@TransformDto(TestDto)
export class TestController {}
