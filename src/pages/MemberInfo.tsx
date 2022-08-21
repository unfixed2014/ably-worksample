import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestUserInfoResponse } from '../_lib/AuthServices';
import { useDeps } from '../_lib/DepContext';

const MemberInfo = () => {
  const { authService, httpClient } = useDeps();
  const [memberInfo, setMemberInfo] = useState<requestUserInfoResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function reqeustUserInfo() {
      try {
        const res = await authService.reqeustUserInfo();
        setMemberInfo(res);
      } catch (err: any) {
        navigate('/login', { replace: true });
        console.log(err);
      }
    }

    reqeustUserInfo();
  }, []);

  const handleClickLogout = async () => {
    try {
      await authService.requestLogout();
      httpClient.setHeader('Authorization', '');
      navigate('/login', { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message);
      console.log(err);
    }
  };

  return (
    <>
      <div data-testid="memberInfoWrapper">
        <h1>Member Info</h1>
        {memberInfo && (
          <div data-testid="memberInfoCard">
            <p data-testid="memberName">{memberInfo.name}</p>
            <p>{memberInfo.email}</p>
            <img src={memberInfo.profileImage} />
          </div>
        )}
        {errorMessage && <p data-testid="errorMessage">{errorMessage}</p>}
        <button type="button" data-testid="logoutBtn" onClick={handleClickLogout}>
          로그아웃
        </button>
      </div>
    </>
  );
};

export default MemberInfo;
