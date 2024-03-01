"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Props {
  id: string;
  isComment: boolean;
  comments: any;
}

export const ButtonUI = ({ isComment, comments, id }: Props) => {
  const [expandComment, setExpandComment] = useState(false);

  return (
    <>
      {isComment && comments.length > 0 && (
        <Link href={`/thread/${id}`}>
          <p
            className="mt-1 text-subtle-medium text-gray-1"
            onClick={() => setExpandComment(!expandComment)}
          >
            {comments.length} repl{comments.length > 1 ? "ies" : "y"}
          </p>
        </Link>
      )}

      {expandComment &&
        comments?.length &&
        comments?.map((comment: any) => {
          return (
            <div className="flex w-full flex-col">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {comment.author.name}
              </h4>
              <p className="mt-2 text-small-regular text-light-2">
                {comment.text}
              </p>
            </div>
          );
        })}
    </>
  );
};
