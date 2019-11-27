import { ObjectType, Field } from "type-graphql";

// #26
@ObjectType()
export class ErrorResponse{
  @Field()
  path: string;
  @Field()
  message: string;
}