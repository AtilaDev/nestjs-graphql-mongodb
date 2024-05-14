import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssingStudentsToLessonInput } from './assing-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(() => LessonType)
  getLessonById(@Args('id') id: string) {
    return this.lessonService.getLessonById(id);
  }

  @Query(() => [LessonType])
  getLessons() {
    return this.lessonService.getLessons();
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  assingStudentsToLesson(
    @Args('assingStudentsToLessonInput')
    assingStudentsToLessonInput: AssingStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assingStudentsToLessonInput;
    return this.lessonService.assingStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
