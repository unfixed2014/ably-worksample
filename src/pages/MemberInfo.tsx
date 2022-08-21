import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { requestUserInfoResponse } from '../_lib/AuthServices';
import { useDeps } from '../_lib/DepContext';

const MemberInfo = () => {
  const { authService } = useDeps();
  const [memberInfo, setMemberInfo] = useState<requestUserInfoResponse | null>(null);
  const [userInfoError, setUserInfoError] = useState(null);

  useEffect(() => {
    async function reqeustUserInfo() {
      try {
        const res = await authService.reqeustUserInfo();
        setMemberInfo(res);
      } catch (err: any) {
        setUserInfoError(err);
        console.log(err);
      }
    }

    reqeustUserInfo();
  }, []);

  return (
    <>
      {userInfoError && <Navigate to="/login" replace={true}></Navigate>}
      <div data-testid="memberInfoWrapper">
        <h1>Member Info</h1>
        {memberInfo && (
          <div data-testid="memberInfoCard">
            <p data-testid="memberName">{memberInfo.name}</p>
            <p>memberInfo.email</p>
          </div>
        )}
        <button type="button" data-testid="logoutBtn">
          로그아웃
        </button>
      </div>
    </>
  );
};

export default MemberInfo;
