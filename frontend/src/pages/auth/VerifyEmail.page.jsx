import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useVerifyEmail } from "../../hooks/api/auth/useVerifyEmail";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/auth.slice"

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const { mutate, isPending, isError, isSuccess } = useVerifyEmail();
  const hasRunRef = useRef(false);
  const userId = params.get("userId");
  const token = params.get("token");
  useEffect(() => {
    if (!userId || !token) return;
    if (hasRunRef.current) return;
    hasRunRef.current = true;
    mutate(
      { userId, token },
      {
        onSuccess: () => {
          if (currentUser) {
            dispatch(
              login({
                ...currentUser,
                isEmailVerified: true,
              })
            );
          }
          const url = currentUser?.profile ? "/login" : "/profile/create"
          setTimeout(() => {
            navigate(url, { replace: true });
          }, 500);
        },
        onError: () => {
          hasRunRef.current = false;
        },
      }
    );
  }, []);

  if (isPending) return <div>Verifying email...</div>;
  if (isError) return <div>Email verification failed.</div>;
  if (isSuccess) return <div>Email verified successfully. Redirecting...</div>;

  return <div>Invalid verification link.</div>;
}