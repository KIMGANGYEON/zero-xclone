"use client";

import React, { ReactNode } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
  post: {
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    content: string;
    createdAt: Date;
    postId: Number;
    Images: any[];
  };
};

const PostArticle = ({ children, post }: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    <article onClick={onClick} className={style.post}>
      children
    </article>
  );
};

export default PostArticle;
