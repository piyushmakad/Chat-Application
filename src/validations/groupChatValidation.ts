import { TypeOf, z } from "zod";

export const createChatSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Chat title must be 4 char long." })
    .max(191),
  passcode: z
    .string()
    .min(4, { message: "Chat passcode must be 4 char long." })
    .max(30),
}).required();

export type createSchemaType = z.infer<typeof createChatSchema>;