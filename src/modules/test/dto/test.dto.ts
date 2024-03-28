
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { getSegment } from "src/common/verify-segment";
import { BadRequestException } from "@nestjs/common";

export class TestDto {
  @IsString()
  @ApiProperty()
  segment: string;

  transform(user: any, query: any): void {
    if (user && 'segment' in query) this.segment = getSegment(query.segment, user);
    else throw new BadRequestException();
}

}