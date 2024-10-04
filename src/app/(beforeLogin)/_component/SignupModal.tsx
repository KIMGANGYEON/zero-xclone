"use client";

import { redirect, useRouter } from "next/navigation";
import BackButton from "./BackButton";
import style from "./signup.module.css";
import { useState } from "react";

export default function SignupModal() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    const formData = new FormData(e.currentTarget); // 폼 데이터를 가져옴

    if (!formData.get("id")) {
      setErrorMessage("아이디가 없습니다.");
      return;
    }
    if (!formData.get("name")) {
      setErrorMessage("닉네임이 없습니다.");
      return;
    }
    if (!formData.get("password")) {
      setErrorMessage("비밀번호가 없습니다.");
      return;
    }
    if (!formData.get("image")) {
      setErrorMessage("이미지가 없습니다.");
      return;
    }

    let shouldRedirect = false;

    try {
      const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
        {
          method: "post",
          body: formData,
          credentials: "include",
        }
      );
      console.log(response.status);
      if (response.status === 403) {
        setErrorMessage("이미 존재하는 사용자입니다.");
        return;
      }
      console.log(await response.json());
      shouldRedirect = true;
    } catch (err) {
      console.error(err);
      setErrorMessage("서버 오류가 발생했습니다.");
    }

    if (shouldRedirect) {
      router.push("/home");
    }
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={style.modalBody}>
              {errorMessage && (
                <div className={style.error}>{errorMessage}</div>
              )}
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  name="name"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  className={style.input}
                  type="password"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  name="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button type="submit" className={style.actionButton}>
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
