"use server";

import { connectToDB } from "../mongoose";
import { Thread } from "../models/thread.models";
import { User } from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export const createThread = async ({
  text,
  author,
  communityId,
  path,
}: Params) => {
  try {
    connectToDB();

    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    // Update user model

    await User.findOneAndUpdate(
      { id: author },
      {
        $push: {
          threads: createdThread._id,
        },
      }
    );
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
};
