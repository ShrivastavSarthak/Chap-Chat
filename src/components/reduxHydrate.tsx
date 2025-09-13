"use client";

import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../utils/services/store/hook";
import { setUserData } from "../utils/services/store/slice/user";
import { GetAnswersListQuery } from "../utils/services/api_services/tankstack/answers";
import { fetchQuestions } from "../utils/services/store/slice/questions";

export default function ReduxHydrate({
  user,
  children,
}: {
  user: any;
  children: ReactNode;
}) {
  const { data: answersList } = GetAnswersListQuery();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user?.data?.data) {
      dispatch(setUserData(user?.data?.data));
    }
    if (answersList?.data.data.questions) {
      dispatch(fetchQuestions(answersList?.data.data.questions));
    }
  }, [user, dispatch, answersList]);

  return (
    <>
      <div className="w-full flex-1 overflow-y-auto bg-[#F4F9FF]">
        {children}
      </div>
    </>
  );
}
