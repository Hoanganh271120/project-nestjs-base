import { BadRequestException } from "@nestjs/common";

export const getSegment = (segmentQueryParam: any, user: any) => {
    const userSegments = String(user?.segment).split(',').map(item => Number(item.trim())).filter(Boolean);
    const segment =  segmentQueryParam.split(',').map((item: string) => Number(item.trim())).filter(Boolean);

    if (!segment.some(Number.isFinite)) throw new BadRequestException('segment is required.');

    if (segment.every((seg: number) => userSegments.includes(seg))) return segment;
    else throw new BadRequestException();
}