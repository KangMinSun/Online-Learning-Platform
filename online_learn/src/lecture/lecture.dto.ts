export class CreateLectureDto {
    title: string;
    description: string;
  }

export class EnrollLectureDto {  // 수강 신청을 위한 DTO
    lectureId: string;
  }
  